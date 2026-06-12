export type CategoryType = 'Beaches' | 'Mountains' | 'Cities' | 'Historical';

export interface Destination {
  id: string;
  name: string;
  country: string;
  category: CategoryType;
  imageUrl: string;
  description: string;
  visited: boolean;
  wishlisted: boolean;
  createdAt: number;
  itinerary?: string;
  packingList?: string[];
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  category: CategoryType | 'All';
  targetCount: number;
  currentCount: number;
  completed: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
  rating: number;
  quote: string;
}
