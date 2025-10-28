export interface Attraction {
  id: number;
  name: string;
  category: string;
  rating: number;
  reviews: number;
  description: string;
  address: string;
  hours: string;
  phone: string;
  website: string;
  images: string[];
  avgTime: string;
  ticketProviders: {
    name: string;
    type: string;
    price: number;
    logo: string;
  }[];
}

export interface Destination {
  id: number;
  name: string;
  description: string;
  image: string;
  attractions: Attraction[];
}

export type Screen = 'splash' | 'home' | 'destination' | 'details' | 'travelPlan' | 'travelMap';

export type NavItem = 'trip' | 'map' | 'reservations' | 'settings';
