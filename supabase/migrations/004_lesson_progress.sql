-- =============================================
-- Migration: 004_lesson_progress.sql
-- Description: Create lesson progress tracking table
-- =============================================

-- Lesson progress tracking table
-- Tracks user progress for each lesson within a course
CREATE TABLE lesson_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,

  -- Lesson identification (matches local courseContent structure in lib/courses-data.ts)
  -- section_id: e.g., "01", "02" (matches courseContent[].id)
  -- lesson_index: 0-based index within section (matches courseContent[].lessons[index])
  section_id VARCHAR(10) NOT NULL,
  lesson_index INTEGER NOT NULL,

  -- Progress tracking
  percent_watched DECIMAL(5,4) DEFAULT 0,      -- 0.0000 to 1.0000 (e.g., 0.9000 = 90%)
  seconds_watched INTEGER DEFAULT 0,           -- Unique seconds watched (not counting rewatches)
  last_position DECIMAL(10,2) DEFAULT 0,       -- Resume position in seconds
  video_duration DECIMAL(10,2) DEFAULT 0,      -- Total video duration in seconds

  -- Completion
  is_completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMPTZ,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Ensure one progress record per user/course/lesson
  UNIQUE(user_id, course_id, section_id, lesson_index)
);

-- Index for fast lookups by user and course
CREATE INDEX idx_lesson_progress_user_course
  ON lesson_progress(user_id, course_id);

-- Index for fetching last activity (most recently updated)
CREATE INDEX idx_lesson_progress_updated
  ON lesson_progress(user_id, updated_at DESC);

-- Index for fetching completed lessons
CREATE INDEX idx_lesson_progress_completed
  ON lesson_progress(user_id, course_id, is_completed)
  WHERE is_completed = true;

-- =============================================
-- Row Level Security (RLS) Policies
-- =============================================

ALTER TABLE lesson_progress ENABLE ROW LEVEL SECURITY;

-- Users can view their own progress
CREATE POLICY "Users can view own progress"
  ON lesson_progress FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own progress
CREATE POLICY "Users can insert own progress"
  ON lesson_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own progress
CREATE POLICY "Users can update own progress"
  ON lesson_progress FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own progress (for reset functionality if needed)
CREATE POLICY "Users can delete own progress"
  ON lesson_progress FOR DELETE
  USING (auth.uid() = user_id);

-- =============================================
-- Helper function for updating timestamps
-- =============================================

-- Automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_lesson_progress_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_lesson_progress_updated_at
  BEFORE UPDATE ON lesson_progress
  FOR EACH ROW
  EXECUTE FUNCTION update_lesson_progress_updated_at();

-- =============================================
-- Comments for documentation
-- =============================================

COMMENT ON TABLE lesson_progress IS 'Tracks user progress for each lesson within a course';
COMMENT ON COLUMN lesson_progress.section_id IS 'Section ID from courseContent (e.g., "01", "02")';
COMMENT ON COLUMN lesson_progress.lesson_index IS '0-based index of lesson within section';
COMMENT ON COLUMN lesson_progress.percent_watched IS 'Percentage of video watched (0.0000 to 1.0000)';
COMMENT ON COLUMN lesson_progress.seconds_watched IS 'Unique seconds watched, excluding rewatches';
COMMENT ON COLUMN lesson_progress.last_position IS 'Last playback position for resume functionality';
COMMENT ON COLUMN lesson_progress.is_completed IS 'True when percent_watched >= 0.90';
