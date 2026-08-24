import type { Plant } from '../types/plant';
import { getNextWateringDate, getWateringStatus } from '../utils/watering';
import { getToday } from '../utils/date';

interface DashboardSummaryProps {
  plants: Plant[];
}

export function DashboardSummary({ plants }: DashboardSummaryProps) {
  const today = getToday();
  let overdue = 0;
  let dueToday = 0;
  let upcoming = 0;

  for (const plant of plants) {
    const nextDate = getNextWateringDate(plant);
    const status = getWateringStatus(nextDate, today);
    switch (status) {
      case 'overdue':
        overdue++;
        break;
      case 'due-today':
        dueToday++;
        break;
      case 'upcoming':
        upcoming++;
        break;
    }
  }

  return (
    <div className="dashboard-summary" role="status" aria-label="Plant collection summary">
      <span className="summary-item">
        <strong>{plants.length}</strong> Plant{plants.length !== 1 ? 's' : ''}
      </span>
      {overdue > 0 && (
        <span className="summary-item summary-item--overdue">
          <strong>{overdue}</strong> Overdue
        </span>
      )}
      {dueToday > 0 && (
        <span className="summary-item summary-item--due-today">
          <strong>{dueToday}</strong> Due Today
        </span>
      )}
      <span className="summary-item summary-item--upcoming">
        <strong>{upcoming}</strong> Upcoming
      </span>
    </div>
  );
}
