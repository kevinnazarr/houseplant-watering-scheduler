import { describe, it, expect } from 'vitest';
import type { Plant } from '../types/plant';
import {
  getWateringStatus,
  getNextWateringDate,
  sortPlantsByUrgency,
} from './watering';

function makePlant(overrides: Partial<Plant> = {}): Plant {
  return {
    id: 'test-id',
    name: 'Test Plant',
    frequency: 7,
    lastWateredDate: '2026-08-17',
    ...overrides,
  };
}

describe('getWateringStatus', () => {
  it('returns overdue when next watering date is in the past', () => {
    expect(getWateringStatus('2026-08-23', '2026-08-24')).toBe('overdue');
  });

  it('returns overdue when next watering date is well in the past', () => {
    expect(getWateringStatus('2026-08-01', '2026-08-24')).toBe('overdue');
  });

  it('returns due-today when next watering date is today', () => {
    expect(getWateringStatus('2026-08-24', '2026-08-24')).toBe('due-today');
  });

  it('returns upcoming when next watering date is in the future', () => {
    expect(getWateringStatus('2026-08-25', '2026-08-24')).toBe('upcoming');
  });

  it('returns upcoming when next watering date is well in the future', () => {
    expect(getWateringStatus('2026-12-31', '2026-08-24')).toBe('upcoming');
  });
});

describe('getNextWateringDate', () => {
  it('calculates next watering date from plant data', () => {
    const plant = makePlant({
      lastWateredDate: '2026-08-17',
      frequency: 7,
    });
    expect(getNextWateringDate(plant)).toBe('2026-08-24');
  });

  it('handles different frequencies', () => {
    const plant = makePlant({
      lastWateredDate: '2026-08-20',
      frequency: 3,
    });
    expect(getNextWateringDate(plant)).toBe('2026-08-23');
  });
});

describe('sortPlantsByUrgency', () => {
  it('sorts overdue plants before due-today and upcoming', () => {
    const plants = [
      makePlant({ id: '1', name: 'Upcoming', lastWateredDate: '2026-08-20', frequency: 7 }),
      makePlant({ id: '2', name: 'Overdue', lastWateredDate: '2026-08-10', frequency: 7 }),
      makePlant({ id: '3', name: 'Due Today', lastWateredDate: '2026-08-17', frequency: 7 }),
    ];

    const sorted = sortPlantsByUrgency(plants, '2026-08-24');
    expect(sorted.map((p) => p.name)).toEqual(['Overdue', 'Due Today', 'Upcoming']);
  });

  it('does not mutate the original array', () => {
    const plants = [
      makePlant({ id: '1', name: 'B', lastWateredDate: '2026-08-20', frequency: 7 }),
      makePlant({ id: '2', name: 'A', lastWateredDate: '2026-08-10', frequency: 7 }),
    ];
    const originalOrder = plants.map((p) => p.name);

    sortPlantsByUrgency(plants, '2026-08-24');
    expect(plants.map((p) => p.name)).toEqual(originalOrder);
  });

  it('sorts within same status by next watering date ascending', () => {
    const plants = [
      makePlant({ id: '1', name: 'Later', lastWateredDate: '2026-08-22', frequency: 7 }),
      makePlant({ id: '2', name: 'Sooner', lastWateredDate: '2026-08-20', frequency: 3 }),
    ];

    const sorted = sortPlantsByUrgency(plants, '2026-08-24');
    expect(sorted.map((p) => p.name)).toEqual(['Sooner', 'Later']);
  });
});
