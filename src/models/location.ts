export interface Location {
  coordinates: { _lat: number; _long: number };
  createdAt?: { seconds: number; nanoseconds: number };
  hasPet?: boolean;
  isPerson: boolean;
  lastDelivery?: { seconds: number; nanonumseconds: number };
  sexe?: string;
  needsHygiene?: boolean;
  name?: string;
  link?: string;
  id: string;
  phoneNumber?: string;
}
