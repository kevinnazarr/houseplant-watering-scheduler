import type { Plant, WateringStatus } from '../types/plant';
import { getNextWateringDate } from '../utils/watering';
import { formatDate, getToday } from '../utils/date';
import { getWateringStatus } from '../utils/watering';

interface PlantCardProps {
  plant: Plant;
  onWater: (id: string) => void;
  onDelete: (id: string) => void;
}

function statusLabel(status: WateringStatus): string {
  switch (status) {
    case 'overdue':
      return 'Overdue';
    case 'due-today':
      return 'Due today';
    case 'upcoming':
      return 'Upcoming';
  }
}

export function PlantCard({ plant, onWater, onDelete }: PlantCardProps) {
  const nextDate = getNextWateringDate(plant);
  const today = getToday();
  const status = getWateringStatus(nextDate, today);

  function handleDelete() {
    if (window.confirm(`Delete "${plant.name}"?`)) {
      onDelete(plant.id);
    }
  }

  return (
    <article
      className={`plant-card plant-card--${status}`}
      aria-label={`${plant.name}, ${statusLabel(status)}`}
    >
      <div className="plant-card__header">
        <h3 className="plant-card__name">{plant.name}</h3>
        {plant.nickname && (
          <span className="plant-card__nickname">&ldquo;{plant.nickname}&rdquo;</span>
        )}
      </div>

      <div className="plant-card__details">
        <p className="plant-card__frequency">
          Every {plant.frequency} day{plant.frequency !== 1 ? 's' : ''}
        </p>
        <p className="plant-card__next-date">
          <span className="label">Next watering</span>
          <span className="value">{formatDate(nextDate)}</span>
        </p>
        <span className={`plant-card__status plant-card__status--${status}`}>
          {statusLabel(status)}
        </span>
      </div>

      {plant.note && (
        <p className="plant-card__note">
          <span className="label">Note:</span> {plant.note}
        </p>
      )}

      <div className="plant-card__actions">
        <button
          className="btn btn-water"
          onClick={() => onWater(plant.id)}
          aria-label={`Water ${plant.name} now`}
        >
          Water Now
        </button>
        <button
          className="btn btn-delete"
          onClick={handleDelete}
          aria-label={`Delete ${plant.name}`}
        >
          Delete
        </button>
      </div>
    </article>
  );
}
