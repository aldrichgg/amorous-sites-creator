
export interface Memory {
  id?: string;
  pageTitle: string;
  pageName: string;
  email: string;
  startDate: Date;
  message?: string;
  spotifyUrl?: string;
  spotifyTrackId?: string;
  selectedEmoji?: string;
  selectedPlan: 'annual' | 'forever';
  createdAt?: Date;
}

export interface MemoryPhoto {
  id?: string;
  memoryId: string;
  photoUrl: string;
  createdAt?: Date;
}
