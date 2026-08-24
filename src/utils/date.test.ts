import { describe, it, expect, vi, afterEach } from 'vitest';
import {
  getToday,
  calculateNextWateringDate,
  formatDate,
  compareDates,
} from './date';

describe('getToday', () => {
  it('returns today as YYYY-MM-DD', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 7, 24)); // August 24, 2026
    expect(getToday()).toBe('2026-08-24');
    vi.useRealTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });
});

describe('calculateNextWateringDate', () => {
  it('calculates next watering date with simple frequency', () => {
    expect(calculateNextWateringDate('2026-08-24', 7)).toBe('2026-08-31');
  });

  it('handles same-month addition', () => {
    expect(calculateNextWateringDate('2026-08-01', 5)).toBe('2026-08-06');
  });

  it('handles month boundary crossing', () => {
    expect(calculateNextWateringDate('2026-08-28', 7)).toBe('2026-09-04');
  });

  it('handles year boundary crossing', () => {
    expect(calculateNextWateringDate('2026-12-28', 7)).toBe('2027-01-04');
  });

  it('handles frequency of 1 day', () => {
    expect(calculateNextWateringDate('2026-08-24', 1)).toBe('2026-08-25');
  });

  it('handles large frequency', () => {
    expect(calculateNextWateringDate('2026-01-01', 365)).toBe('2027-01-01');
  });

  it('handles leap year', () => {
    expect(calculateNextWateringDate('2024-02-28', 1)).toBe('2024-02-29');
  });

  it('handles year after leap year', () => {
    expect(calculateNextWateringDate('2024-02-29', 1)).toBe('2024-03-01');
  });
});

describe('formatDate', () => {
  it('formats a date string to human-readable', () => {
    expect(formatDate('2026-08-24')).toBe('August 24, 2026');
  });

  it('formats January dates correctly', () => {
    expect(formatDate('2026-01-01')).toBe('January 1, 2026');
  });

  it('formats December dates correctly', () => {
    expect(formatDate('2026-12-31')).toBe('December 31, 2026');
  });
});

describe('compareDates', () => {
  it('returns negative when a < b', () => {
    expect(compareDates('2026-08-23', '2026-08-24')).toBeLessThan(0);
  });

  it('returns 0 when a === b', () => {
    expect(compareDates('2026-08-24', '2026-08-24')).toBe(0);
  });

  it('returns positive when a > b', () => {
    expect(compareDates('2026-08-25', '2026-08-24')).toBeGreaterThan(0);
  });
});
