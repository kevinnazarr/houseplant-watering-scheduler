import type { Plant } from '../types/plant';

const STORAGE_KEY = 'houseplant-watering-scheduler';

/**
 * Load plants from localStorage.
 * Returns an empty array if data is missing or malformed.
 */
export function loadPlants(): Plant[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    // Validate each plant has required fields
    return parsed.filter(
      (p): p is Plant =>
        typeof p === 'object' &&
        p !== null &&
        typeof p.id === 'string' &&
        typeof p.name === 'string' &&
        typeof p.frequency === 'number' &&
        p.frequency > 0 &&
        typeof p.lastWateredDate === 'string',
    );
  } catch {
    console.warn('Failed to parse plants from localStorage, starting fresh.');
    return [];
  }
}

/**
 * Save plants to localStorage.
 */
export function savePlants(plants: Plant[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(plants));
  } catch {
    console.warn('Failed to save plants to localStorage.');
  }
}
