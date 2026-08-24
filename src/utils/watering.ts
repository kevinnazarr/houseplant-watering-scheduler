import type { Plant, WateringStatus } from '../types/plant';
import { calculateNextWateringDate, compareDates } from './date';

/**
 * Determine the watering status for a plant given its next watering date and today's date.
 * @param nextWateringDate - YYYY-MM-DD string
 * @param today - YYYY-MM-DD string
 * @returns WateringStatus
 */
export function getWateringStatus(
  nextWateringDate: string,
  today: string,
): WateringStatus {
  if (nextWateringDate < today) return 'overdue';
  if (nextWateringDate === today) return 'due-today';
  return 'upcoming';
}

/**
 * Calculate the next watering date for a plant.
 */
export function getNextWateringDate(plant: Plant): string {
  return calculateNextWateringDate(plant.lastWateredDate, plant.frequency);
}

/**
 * Sort plants by urgency: overdue first, then due-today, then upcoming.
 * Within the same status, sort by next watering date ascending.
 * Returns a new array without mutating the original.
 */
export function sortPlantsByUrgency(
  plants: Plant[],
  today: string,
): Plant[] {
  const statusOrder: Record<WateringStatus, number> = {
    overdue: 0,
    'due-today': 1,
    upcoming: 2,
  };

  return [...plants].sort((a, b) => {
    const nextA = getNextWateringDate(a);
    const nextB = getNextWateringDate(b);
    const statusA = getWateringStatus(nextA, today);
    const statusB = getWateringStatus(nextB, today);

    const statusDiff = statusOrder[statusA] - statusOrder[statusB];
    if (statusDiff !== 0) return statusDiff;

    return compareDates(nextA, nextB);
  });
}
