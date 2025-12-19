-- ============================================
-- Add Payment Notification Type Migration
-- ============================================
-- This migration adds 'payment' as an allowed notification type.
-- Run this in your Supabase SQL Editor after the previous migrations.

-- Drop the existing check constraint and add a new one with 'payment' included
ALTER TABLE notifications
DROP CONSTRAINT IF EXISTS notifications_type_check;

ALTER TABLE notifications
ADD CONSTRAINT notifications_type_check
CHECK (type IN ('course', 'achievement', 'community', 'system', 'payment'));

-- Verify the constraint was added
-- SELECT conname, pg_get_constraintdef(oid)
-- FROM pg_constraint
-- WHERE conrelid = 'notifications'::regclass;
