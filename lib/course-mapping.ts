/**
 * Course ID Mapping
 *
 * Maps between local course IDs (used in URLs) and database slugs.
 * This is needed because the frontend uses numeric IDs in URLs (/courses/1)
 * while the database uses slugs (dv-lottery-masterclass).
 */

// Local ID → Database Slug
// MUST match the slugs in supabase/migrations/002_create_courses_and_enrollments.sql
export const courseIdToSlug: Record<number, string> = {
  1: "dv-lottery-masterclass",
  2: "tourist-visa-usa",
  3: "beasiswa-fullbright",
  4: "au-pair-program",
  5: "hotel-culinary-career",
  6: "accounting-career",
  7: "lpdp-scholarship",
  8: "f1-visa-undergraduate",
  9: "phd-postdoc-research",
}

// Database Slug → Local ID (reverse mapping)
export const slugToCourseId: Record<string, number> = Object.entries(courseIdToSlug).reduce(
  (acc, [id, slug]) => {
    acc[slug] = parseInt(id)
    return acc
  },
  {} as Record<string, number>
)

/**
 * Get local course ID from database slug
 */
export function getLocalCourseId(slug: string): number | null {
  return slugToCourseId[slug] ?? null
}

/**
 * Get database slug from local course ID
 */
export function getDatabaseSlug(localId: number): string | null {
  return courseIdToSlug[localId] ?? null
}
