/**
 * Get today's date as a YYYY-MM-DD string.
 * Uses local date components to avoid timezone issues.
 */
export function getToday(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Calculate the next watering date from a last watered date and frequency.
 * @param lastWateredDate - YYYY-MM-DD string
 * @param frequency - number of days until next watering
 * @returns YYYY-MM-DD string of the next watering date
 */
export function calculateNextWateringDate(
  lastWateredDate: string,
  frequency: number,
): string {
  const [year, month, day] = lastWateredDate.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  date.setDate(date.getDate() + frequency);

  const nextYear = date.getFullYear();
  const nextMonth = String(date.getMonth() + 1).padStart(2, '0');
  const nextDay = String(date.getDate()).padStart(2, '0');
  return `${nextYear}-${nextMonth}-${nextDay}`;
}

/**
 * Format a YYYY-MM-DD date string to a human-readable format.
 * @param dateString - YYYY-MM-DD string
 * @returns Formatted date string (e.g., "August 31, 2026")
 */
export function formatDate(dateString: string): string {
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Compare two YYYY-MM-DD date strings.
 * @returns negative if a < b, 0 if equal, positive if a > b
 */
export function compareDates(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}
