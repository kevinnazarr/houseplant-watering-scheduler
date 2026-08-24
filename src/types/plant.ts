export interface Plant {
  id: string;
  name: string;
  nickname?: string;
  frequency: number;
  note?: string;
  lastWateredDate: string;
}

export type WateringStatus = 'overdue' | 'due-today' | 'upcoming';
