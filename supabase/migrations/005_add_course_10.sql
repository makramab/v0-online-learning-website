-- ============================================
-- Add Course 10: Community Solutions Program
-- ============================================
-- This migration adds the 10th course for Dinar - Community Solutions Program Fellow
-- Run this in your Supabase SQL Editor.

INSERT INTO courses (
  slug,
  title,
  description,
  short_description,
  price,
  original_price,
  thumbnail_url,
  instructor_name,
  instructor_title,
  duration_minutes,
  level,
  category,
  what_you_will_learn,
  is_published
)
VALUES (
  'community-solutions-program',
  'Community Solutions Program: Fellowship di Amerika',
  'Panduan lengkap mendapatkan fellowship Community Solutions Program dari U.S. Department of State. Pengalaman 4 bulan bekerja di NGO Amerika dan membangun jaringan internasional.',
  'Panduan lengkap fellowship Community Solutions Program dari U.S. Department of State',
  99000,
  199000,
  '/courses/10-DINAR.JPEG',
  'Dinar Pratiwi, S.Sos',
  'Community Solutions Program Fellow',
  300,
  'Menengah',
  'Fellowship & Community Development',
  '["Memahami program Community Solutions dan eligibility", "Cara menulis aplikasi yang compelling", "Strategi memilih isu dan organisasi host", "Persiapan interview dan assessment", "Pengalaman fellowship di NGO Amerika", "Networking dengan fellows internasional", "Implementasi proyek pasca-fellowship", "Bergabung dengan alumni network global"]'::jsonb,
  true
);

-- ============================================
-- VERIFICATION
-- ============================================
-- Run this query to verify the course was added:
-- SELECT * FROM courses WHERE slug = 'community-solutions-program';
