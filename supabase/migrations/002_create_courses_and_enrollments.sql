-- ============================================
-- Courses and Enrollments Tables Migration
-- ============================================
-- This migration creates the courses and enrollments tables for the paywall system.
-- Run this in your Supabase SQL Editor.
-- This script is idempotent - safe to run multiple times.

-- ============================================
-- CLEANUP EXISTING OBJECTS (if any)
-- ============================================

-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can read published courses" ON courses;
DROP POLICY IF EXISTS "Users can read own enrollments" ON enrollments;
DROP POLICY IF EXISTS "Users can insert own enrollments" ON enrollments;
DROP POLICY IF EXISTS "Users can update own enrollments" ON enrollments;

-- Drop existing triggers
DROP TRIGGER IF EXISTS update_courses_updated_at ON courses;
DROP TRIGGER IF EXISTS update_enrollments_updated_at ON enrollments;

-- Drop existing tables (CASCADE handles foreign key dependencies)
DROP TABLE IF EXISTS enrollments CASCADE;
DROP TABLE IF EXISTS courses CASCADE;

-- ============================================
-- COURSES TABLE
-- ============================================
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  short_description VARCHAR(500),
  price INTEGER NOT NULL DEFAULT 0, -- Price in IDR
  original_price INTEGER, -- Original price for discount display
  video_url VARCHAR(500),
  preview_video_url VARCHAR(500),
  thumbnail_url VARCHAR(500),
  instructor_name VARCHAR(255),
  instructor_title VARCHAR(255),
  duration_minutes INTEGER DEFAULT 0,
  level VARCHAR(50) DEFAULT 'Pemula', -- Pemula, Menengah, Mahir
  category VARCHAR(255),
  what_you_will_learn JSONB DEFAULT '[]'::jsonb, -- Array of learning points
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for courses
CREATE INDEX idx_courses_slug ON courses(slug);
CREATE INDEX idx_courses_is_published ON courses(is_published);
CREATE INDEX idx_courses_category ON courses(category);

-- Enable RLS for courses
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read published courses
CREATE POLICY "Anyone can read published courses"
  ON courses
  FOR SELECT
  USING (is_published = true);

-- ============================================
-- ENROLLMENTS TABLE
-- ============================================
CREATE TABLE enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
  payment_status VARCHAR(50) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded', 'expired')),
  payment_method VARCHAR(50), -- credit_card, bank_transfer, e_wallet, etc.
  payment_reference VARCHAR(255), -- Doku transaction ID / invoice number
  amount_paid INTEGER, -- Amount in IDR
  purchased_at TIMESTAMPTZ, -- When payment was completed
  expires_at TIMESTAMPTZ, -- For pending payments that expire
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Ensure one enrollment per user per course
  UNIQUE(user_id, course_id)
);

-- Create indexes for enrollments
CREATE INDEX idx_enrollments_user_id ON enrollments(user_id);
CREATE INDEX idx_enrollments_course_id ON enrollments(course_id);
CREATE INDEX idx_enrollments_payment_status ON enrollments(payment_status);
CREATE INDEX idx_enrollments_user_course ON enrollments(user_id, course_id);
CREATE INDEX idx_enrollments_payment_reference ON enrollments(payment_reference);

-- Enable RLS for enrollments
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own enrollments
CREATE POLICY "Users can read own enrollments"
  ON enrollments
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can insert their own enrollments
CREATE POLICY "Users can insert own enrollments"
  ON enrollments
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own enrollments
CREATE POLICY "Users can update own enrollments"
  ON enrollments
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ============================================
-- HELPER FUNCTIONS
-- ============================================

-- Function to update updated_at timestamp (create or replace)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for courses updated_at
CREATE TRIGGER update_courses_updated_at
  BEFORE UPDATE ON courses
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger for enrollments updated_at
CREATE TRIGGER update_enrollments_updated_at
  BEFORE UPDATE ON enrollments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- SEED DATA - All 9 Courses
-- ============================================
-- Insert all 9 courses matching the local courses-data.ts IDs

INSERT INTO courses (slug, title, description, short_description, price, original_price, thumbnail_url, instructor_name, instructor_title, duration_minutes, level, category, what_you_will_learn, is_published)
VALUES
  -- Course 1: DV Lottery Masterclass (Teddy Cahyadi)
  (
    'dv-lottery-masterclass',
    'DV Lottery Masterclass: Cara Menang & Persiapan Interview',
    'Panduan lengkap memenangkan DV Lottery dan persiapan interview dari pemenang langsung. Pelajari strategi, tips, dan pengalaman nyata bekerja sebagai Jr. Executive Sous Chef di Sofitel New York, USA.',
    'Panduan lengkap memenangkan DV Lottery dari pemenang langsung',
    149000,
    299000,
    '/courses/1-TEDDY.jpg',
    'Teddy Cahyadi',
    'DV Lottery Winner, Jr. Executive Sous Chef',
    360,
    'Pemula',
    'Imigrasi & Visa',
    '["Memahami syarat kelayakan DV Lottery secara detail", "Mengisi formulir DS-260 dengan benar dan lengkap", "Tips meningkatkan peluang menang DV Lottery", "Persiapan dokumen untuk interview konsulat", "Teknik menjawab pertanyaan interview dengan percaya diri"]'::jsonb,
    true
  ),
  -- Course 2: Tourist Visa (Riko Nugraha)
  (
    'tourist-visa-usa',
    'Tourist Visa to USA: Panduan Liburan & Aplikasi Visa',
    'Panduan lengkap mengurus Tourist Visa ke Amerika. Pelajari cara aplikasi, tips interview, dan explore destinasi wisata populer di USA dari pengalaman nyata.',
    'Panduan lengkap visa turis Amerika Serikat',
    99000,
    199000,
    '/courses/2-RIKO.jpg',
    'Riko Nugraha',
    'Travel Enthusiast & Visa Consultant',
    180,
    'Pemula',
    'Visa & Travel',
    '["Cara mengisi form DS-160 dengan benar", "Persiapan dokumen pendukung yang kuat", "Tips interview konsulat untuk tourist visa", "Menghindari visa rejection", "Destinasi wisata populer di USA"]'::jsonb,
    true
  ),
  -- Course 3: Beasiswa Fullbright (Mutiara)
  (
    'beasiswa-fullbright',
    'Beasiswa Fullbright: Raih Master di Amerika',
    'Strategi mendapatkan beasiswa Fullbright untuk program Master di universitas top Amerika. Pengalaman kuliah di Rutgers University dan tips aplikasi beasiswa.',
    'Strategi mendapatkan beasiswa Fullbright',
    99000,
    199000,
    '/courses/3-MUTT.jpg',
    'Mutiara Indah Puspita Sari, S.Ars',
    'Fullbright Scholar & Master Student at Rutgers',
    480,
    'Menengah',
    'Beasiswa & Pendidikan',
    '["Memahami program Fullbright dan eligibility", "Strategi memilih universitas dan program studi", "Cara menulis statement of purpose yang compelling", "Tips mendapatkan letter of recommendation yang kuat", "Persiapan TOEFL/IELTS dan GRE"]'::jsonb,
    true
  ),
  -- Course 4: Au Pair Program (Miftakhul)
  (
    'au-pair-program',
    'Au Pair Program: Kerja & Tinggal di Amerika',
    'Panduan lengkap program Au Pair untuk bekerja dan tinggal di Amerika. Pelajari proses aplikasi, kehidupan sebagai Au Pair, dan pengalaman nyata di USA.',
    'Panduan program Au Pair untuk bekerja di Amerika',
    99000,
    199000,
    '/courses/4-MITA.jpg',
    'Miftakhul Marifah, S.Pd',
    'Former Au Pair & Education Specialist',
    300,
    'Pemula',
    'Work & Cultural Exchange',
    '["Memahami program Au Pair dan requirements", "Cara memilih agency yang tepat", "Proses aplikasi dan matching dengan host family", "Interview tips dengan host family", "J1 visa process untuk Au Pair"]'::jsonb,
    true
  ),
  -- Course 5: Hotel & Culinary Career (Marcello)
  (
    'hotel-culinary-career',
    'Hotel & Culinary Career di New York',
    'Membangun karir di industri kuliner dan hospitality New York. Pengalaman bekerja sebagai Hotel Line Cook dan tips masuk industri restoran Amerika.',
    'Membangun karir kuliner di New York',
    99000,
    199000,
    '/courses/5-MARCELLO.jpg',
    'Marcello Josua S',
    'Hotel Line Cook at NYC',
    360,
    'Menengah',
    'Career & Hospitality',
    '["Memahami J1 Internship/Trainee program untuk culinary", "Cara mencari dan apply job di USA", "Resume dan cover letter untuk hospitality industry", "Interview tips untuk culinary positions", "Kitchen hierarchy di Amerika"]'::jsonb,
    true
  ),
  -- Course 6: Accounting Career (Grace)
  (
    'accounting-career',
    'Accounting Career di Amerika: J1 Visa Path',
    'Panduan membangun karir sebagai Accountant di Amerika melalui J1 Visa. Pengalaman kerja di New Jersey dan tips masuk industri akuntansi USA.',
    'Membangun karir akuntansi di Amerika',
    99000,
    199000,
    '/courses/6-GRACE.jpg',
    'Grace Gevani Aritonang, S.Ak',
    'Accountant in New Jersey',
    420,
    'Menengah',
    'Career & Finance',
    '["J1 Trainee program untuk accounting professionals", "US GAAP vs Indonesian accounting standards", "Cara apply job sebagai accountant di USA", "Resume dan LinkedIn optimization", "CPA certification pathway"]'::jsonb,
    true
  ),
  -- Course 7: LPDP Scholarship (Fauzan)
  (
    'lpdp-scholarship',
    'LPDP Scholarship: Master di New York University',
    'Strategi mendapatkan beasiswa LPDP untuk kuliah Master di NYU. Pengalaman kuliah Industrial Engineering dan tips aplikasi beasiswa pemerintah Indonesia.',
    'Strategi mendapatkan beasiswa LPDP untuk kuliah di Amerika',
    99000,
    199000,
    '/courses/7-FAUZAN.jpg',
    'Fauzan Rahman',
    'LPDP Scholar & Master Student at NYU',
    480,
    'Menengah',
    'Beasiswa & Pendidikan',
    '["Memahami skema beasiswa LPDP (Regular, Afirmasi, Targeted)", "Eligibility dan requirements LPDP terbaru", "Strategi mendapat LoA dari universitas top", "Cara menulis essay LPDP yang kuat", "Persiapan wawancara LPDP"]'::jsonb,
    true
  ),
  -- Course 8: F1 Visa Undergraduate (Eric)
  (
    'f1-visa-undergraduate',
    'F1 Visa: Kuliah S1 di CUNY Baruch College',
    'Panduan lengkap kuliah S1 di Amerika dengan F1 Visa. Pengalaman di CUNY Baruch College, public university terbaik, dan tips aplikasi universitas USA.',
    'Panduan kuliah S1 di Amerika dengan F1 Visa',
    99000,
    199000,
    '/courses/8-ERIC.jpg',
    'Eric Salim Marlie',
    'Undergraduate Student at CUNY Baruch College',
    360,
    'Pemula',
    'Pendidikan & Student Life',
    '["Memahami sistem pendidikan tinggi di USA", "Cara memilih universitas yang tepat", "Application process: Common App, essays, SAT/ACT", "Financial aid & scholarships untuk international students", "F1 student visa application"]'::jsonb,
    true
  ),
  -- Course 9: PhD & Postdoc (Endin)
  (
    'phd-postdoc-research',
    'PhD & Postdoc Research Fellow di Amerika',
    'Panduan lengkap menempuh PhD dan menjadi Postdoctoral Research Fellow di Amerika. Strategi riset, publikasi, dan membangun karir akademik di USA.',
    'Panduan PhD dan Postdoc Research di Amerika',
    99000,
    199000,
    '/courses/9-ENDIN.jpg',
    'Endin Nokik Stuyanna, MD, PhD',
    'Postdoctoral Research Fellow',
    600,
    'Lanjutan',
    'Riset & Akademik',
    '["PhD application strategy: finding advisors, writing research proposal", "Funding opportunities: fellowships, assistantships, grants", "F1 vs J1 visa untuk PhD students", "Research methodology dan publication strategy", "Postdoc application dan negotiation"]'::jsonb,
    true
  );

-- ============================================
-- VERIFICATION
-- ============================================
-- Run these queries to verify the migration was successful:
-- SELECT * FROM courses;
-- SELECT * FROM enrollments;
-- SELECT tablename FROM pg_tables WHERE schemaname = 'public';
