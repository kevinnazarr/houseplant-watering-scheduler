import { useState, useCallback, useEffect } from 'react';
import type { Plant } from '../types/plant';
import { loadPlants, savePlants } from '../storage/plantsStorage';
import { getToday } from '../utils/date';

export function usePlants() {
  const [plants, setPlants] = useState<Plant[]>(() => loadPlants());

  // Persist whenever plants change
  useEffect(() => {
    savePlants(plants);
  }, [plants]);

  const addPlant = useCallback(
    (data: { name: string; nickname?: string; frequency: number; note?: string }) => {
      const newPlant: Plant = {
        id: crypto.randomUUID(),
        name: data.name,
        nickname: data.nickname || undefined,
        frequency: data.frequency,
        note: data.note || undefined,
        lastWateredDate: getToday(),
      };
      setPlants((prev) => [...prev, newPlant]);
    },
    [],
  );

  const waterPlant = useCallback((id: string) => {
    setPlants((prev) =>
      prev.map((plant) =>
        plant.id === id
          ? { ...plant, lastWateredDate: getToday() }
          : plant,
      ),
    );
  }, []);

  const deletePlant = useCallback((id: string) => {
    setPlants((prev) => prev.filter((plant) => plant.id !== id));
  }, []);

  return { plants, addPlant, waterPlant, deletePlant };
}
