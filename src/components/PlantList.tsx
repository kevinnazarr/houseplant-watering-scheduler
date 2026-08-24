import type { Plant } from '../types/plant';
import { sortPlantsByUrgency } from '../utils/watering';
import { getToday } from '../utils/date';
import { PlantCard } from './PlantCard';

interface PlantListProps {
  plants: Plant[];
  onWater: (id: string) => void;
  onDelete: (id: string) => void;
}

export function PlantList({ plants, onWater, onDelete }: PlantListProps) {
  const sorted = sortPlantsByUrgency(plants, getToday());

  return (
    <div className="plant-list">
      {sorted.map((plant) => (
        <PlantCard
          key={plant.id}
          plant={plant}
          onWater={onWater}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
