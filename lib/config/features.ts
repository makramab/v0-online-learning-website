/**
 * Feature Flags Configuration
 *
 * This file contains all feature flags for the application.
 * Feature flags allow toggling functionality without code changes.
 *
 * IMPORTANT: When changing these flags, ensure the corresponding
 * Supabase settings are also updated to match.
 */

export const featureFlags = {
  /**
   * Email Verification Requirement
   *
   * When TRUE (default):
   * - Users must verify email before logging in
   * - Registration shows verification modal
   * - Supabase setting: Authentication → Settings → "Confirm email" = ON
   *
   * When FALSE:
   * - Users can login immediately after registration
   * - Registration auto-logs in and redirects to /courses
   * - Supabase setting: Authentication → Settings → "Confirm email" = OFF
   *
   * Environment variable: NEXT_PUBLIC_REQUIRE_EMAIL_VERIFICATION
   * Default: true (safer for production)
   */
  requireEmailVerification:
    process.env.NEXT_PUBLIC_REQUIRE_EMAIL_VERIFICATION !== 'false',
} as const

// Type export for use in other files
export type FeatureFlags = typeof featureFlags
