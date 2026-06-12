import { Destination, Challenge, Testimonial } from './types';

export const INITIAL_DESTINATIONS: Destination[] = [
  {
    id: '1',
    name: 'Santorini',
    country: 'Greece',
    category: 'Beaches',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwat4IvcI8bDUPQbdJhoSaLd6CaAPvv9j12aKq6mdORXx0lFAk_nbsd13-XY7SzdHHCdUCo8kckjvdg3b9YJBHAXhhKMH1pMQrXDDLxITitvb4KFnuPFI3DikSamrD9mIb8EgII2ToIPmJ8tqH1pLUMEvuY8grsREor4YP6xswpIVFTb7cq1GCf76KOFIfB1br3rZbyOFRYWwPkMiZfjm3WusaIrXoE8S7O4n_wDvUlHOy51KKfGXQyP4BJG8xLo1yLoJalBvxjA',
    description: 'Iconic blue-domed churches and whitewashed buildings perched on volcanic cliffs overlooking the crystalline Aegean Sea.',
    visited: true,
    wishlisted: true,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 30
  },
  {
    id: '2',
    name: 'Swiss Alps',
    country: 'Switzerland',
    category: 'Mountains',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDX8hLTjsx-s-2CIDm2dkTROBNYlH7blkK2g7HKNi39pIaHXrM8ZW1fyf49DTXS6vm8INzohbbr_3qPi6gWLD1pfExVt6kZtyovEdOxOhKVr9pb7rUCBkLKttm0n3XFr7_5-i2HNApmIvlnRDUeq5FIqPMZuYTyE-GqxwTa_SqA7Iyfix0L_LXTUmOZhPFF5gmxU6PCuiUj2EQCZEdZ86ieaeIKZRVi_uf9x_ATO9bICOFya3M6fGKUchZBA4Atb7pS5ogrR-XWZg',
    description: 'Breathtaking jagged snow-capped peaks reflecting in emerald-colored mirror-still alpine lakes surrounded by evergreens.',
    visited: true,
    wishlisted: false,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 28
  },
  {
    id: '3',
    name: 'Bali',
    country: 'Indonesia',
    category: 'Beaches',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9yqsIgAFl0VNa_jw_G8LlD9jP81KrvgqnmgIWB-wR_Tp34DX0TAmbYvNuqMb_zDjO632yKaeULRbjYst47oh5BywE4qbzNoHsosBROiMgkXW8k3iI1TRYpJxCZ1sjUZtDG9q5OthdKx8G59Dc9qlM5NU9mSXnGJ4SEIQpUJkIz8__-EQC1Qv6I9npgYvaw2pcHfzofzz8ux6wEny4CLLQ1sYQtYQ9zVAh7eVLX5YEywJ_bmGrju3ChMF2mbsaJpQU39NlLHCXlw',
    description: 'Mystical water temples and tropical palm trees outlined against a dramatic, glowing orange-purple sunset over black sand beaches.',
    visited: true,
    wishlisted: true,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 25
  },
  {
    id: '4',
    name: 'Paris',
    country: 'France',
    category: 'Cities',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmZKpEo7uCQ23DxQ0GIAXBV4WMQLXh7Nzzqs82c7KjUUneSO8Goyf6F8ej3f56ZA_e1W1PQS3WXZHavnyuahQDA5HFo4EgfdOCOGWlmY2cBe3JmnV9EUxSUgvz70EY6vik50LyGvC5nyxzHGlKQF3XcqySlVujpJqj9v7pxOLX56stj3YyhdDsaTwFUWChx1ZZRs5uDfjBhJgQnf-3V_BFlPz0nS2ZbKzfZFQPyRxbQlIndU3Zud1SHhYWnslZhLTRKm2B7c-gIw',
    description: 'Timeless romance, cobblestone streets, and the iconic architectural structure of the Eiffel Tower framed by elegant limestone buildings.',
    visited: true,
    wishlisted: false,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 20
  },
  {
    id: '5',
    name: 'Machu Picchu',
    country: 'Peru',
    category: 'Historical',
    imageUrl: 'https://images.unsplash.com/photo-1587590227264-0ac64ce63ce8?q=80&w=800',
    description: 'Ancient Incan citadel high in the Andes mountains, enveloped in clouds with incredible terrace structures.',
    visited: false,
    wishlisted: true,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 18
  },
  {
    id: '6',
    name: 'Kyoto',
    country: 'Japan',
    category: 'Historical',
    imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800',
    description: 'Traditional wooden machiya houses, peaceful zen temples, and cherry blossom pathways lining serene canals.',
    visited: true,
    wishlisted: true,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 15
  },
  {
    id: '7',
    name: 'Amalfi Coast',
    country: 'Italy',
    category: 'Beaches',
    imageUrl: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=800',
    description: 'Charming multi-colored cliffside towns cascading straight down into beautiful, warm Mediterranean waters.',
    visited: true,
    wishlisted: true,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 12
  },
  {
    id: '8',
    name: 'Mount Fuji',
    country: 'Japan',
    category: 'Mountains',
    imageUrl: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=800',
    description: 'Majestic snow-capped symmetrical volcano standing tall above a pink lake and lovely pagoda viewpoints.',
    visited: false,
    wishlisted: true,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 10
  },
  {
    id: '9',
    name: 'Rome',
    country: 'Italy',
    category: 'Historical',
    imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=800',
    description: 'Walking through history with the majestic Colosseum, Pantheon, Forum, and cobblestone fountains.',
    visited: true,
    wishlisted: true,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 9
  },
  {
    id: '10',
    name: 'Tokyo',
    country: 'Japan',
    category: 'Cities',
    imageUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=800',
    description: 'A dazzling mixture of bright futuristic neon, towering skyscrapers, and secret traditional neighborhood alleys.',
    visited: true,
    wishlisted: false,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 8
  },
  {
    id: '11',
    name: 'Banff National Park',
    country: 'Canada',
    category: 'Mountains',
    imageUrl: 'https://images.unsplash.com/photo-1487621167305-5d248087c724?q=80&w=800',
    description: 'Stunning bright turquoise alpine lakes fed by towering peaks and ancient slow-moving ice glaciers.',
    visited: false,
    wishlisted: true,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 7
  },
  {
    id: '12',
    name: 'Cairo',
    country: 'Egypt',
    category: 'Historical',
    imageUrl: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?q=80&w=800',
    description: 'The ancient Great Pyramids of Giza standing proudly against the endless orange dunes of the Saharan desert.',
    visited: false,
    wishlisted: true,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 6
  },
  {
    id: '13',
    name: 'New York City',
    country: 'USA',
    category: 'Cities',
    imageUrl: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=800',
    description: 'The bustling global center of culture, theater, and yellow cabs beneath the sky-high Manhattan skyscrapers.',
    visited: true,
    wishlisted: false,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 5
  },
  {
    id: '14',
    name: 'Maldives',
    country: 'Maldives',
    category: 'Beaches',
    imageUrl: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=800',
    description: 'Pristine overwater bungalows extending over transparent neon turquoise lagoons teeming with ocean life.',
    visited: false,
    wishlisted: true,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 4
  },
  {
    id: '15',
    name: 'Rio de Janeiro',
    country: 'Brazil',
    category: 'Cities',
    imageUrl: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=800',
    description: 'The green jungle meeting Copacabana beaches under the towering arms of Christ the Redeemer statue.',
    visited: true,
    wishlisted: true,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 3
  },
  {
    id: '16',
    name: 'Patagonia',
    country: 'Argentina',
    category: 'Mountains',
    imageUrl: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?q=80&w=800',
    description: 'The magnificent tooth-like towers of Fitz Roy standing tall above cold windswept grasslands.',
    visited: false,
    wishlisted: true,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 3
  },
  {
    id: '17',
    name: 'Sydney',
    country: 'Australia',
    category: 'Cities',
    imageUrl: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=800',
    description: 'The majestic sails of the Opera House and the massive structure of the Harbour Bridge shining at night.',
    visited: true,
    wishlisted: false,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2
  },
  {
    id: '18',
    name: 'Venice',
    country: 'Italy',
    category: 'Cities',
    imageUrl: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?q=80&w=800',
    description: 'A winding city of high-arched bridges, narrow water canals, and silent, striped-shirt gondoliers.',
    visited: true,
    wishlisted: true,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2
  },
  {
    id: '19',
    name: 'Taj Mahal',
    country: 'India',
    category: 'Historical',
    imageUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=800',
    description: 'The world-famous marble monument of tragic love, glowingly illuminated in the morning golden haze.',
    visited: false,
    wishlisted: true,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 1
  },
  {
    id: '20',
    name: 'Maui',
    country: 'USA',
    category: 'Beaches',
    imageUrl: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?q=80&w=800',
    description: 'Golden crescent beaches, crashing emerald waves, and tropical wind-bent palm trees at sunset.',
    visited: true,
    wishlisted: true,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 1
  },
  {
    id: '21',
    name: 'Yosemite Valley',
    country: 'USA',
    category: 'Mountains',
    imageUrl: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?q=80&w=800',
    description: 'Massive vertical granite cliffs like El Capitan and Half Dome looming over majestic pine forests.',
    visited: false,
    wishlisted: true,
    createdAt: Date.now()
  },
  {
    id: '22',
    name: 'Great Wall',
    country: 'China',
    category: 'Historical',
    imageUrl: 'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?q=80&w=800',
    description: 'An ancient protective wall snaking beautifully across thousands of miles of green mountain ridges.',
    visited: false,
    wishlisted: true,
    createdAt: Date.now()
  },
  {
    id: '23',
    name: 'Petra',
    country: 'Jordan',
    category: 'Historical',
    imageUrl: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?q=80&w=800',
    description: 'The ancient red-rose city carved directly into vertical desert mountain canyon walls.',
    visited: false,
    wishlisted: true,
    createdAt: Date.now()
  },
  {
    id: '24',
    name: 'Cape Town',
    country: 'South Africa',
    category: 'Cities',
    imageUrl: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=800',
    description: 'Stunning flat-topped Table Mountain overlooking busy vibrant city harbors and blue oceans.',
    visited: false,
    wishlisted: true,
    createdAt: Date.now()
  }
];

export const INITIAL_CHALLENGES: Challenge[] = [
  {
    id: 'c1',
    title: 'Coast Master',
    description: 'Visit 5 Beaches',
    category: 'Beaches',
    targetCount: 5,
    currentCount: 0,
    completed: false
  },
  {
    id: 'c2',
    title: 'Peak Seeker',
    description: 'Visit 3 Mountains',
    category: 'Mountains',
    targetCount: 3,
    currentCount: 0,
    completed: false
  },
  {
    id: 'c3',
    title: 'Historian',
    description: '4 Historical Sites',
    category: 'Historical',
    targetCount: 4,
    currentCount: 0,
    completed: false
  },
  {
    id: 'c4',
    title: 'Grand Nomad',
    description: 'All Continents (Visit 10 Cities)',
    category: 'Cities',
    targetCount: 10,
    currentCount: 0,
    completed: false
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Sarah Jenkins',
    role: 'Digital Nomad',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmIDRUoI67bo0MKe3zIAgW-qHYSwOoiXk94mMhJzW5afxIiQsFHabYVfFMVQOfBq7UPjaP2Qo8xYe4IXGLcvq08JtZoGGVurIBZVYgZvgJCfIlXpFkKzXQ3S0l7JYZPFbI4l44FdIg8PurU5XIDfw4_H-ZjXhDq77gMSqEK8TiP17ljInXzxfwESwh0tRJtnJ1Z0zEyBwtt-cuz72sp9-uf8pv4ONB6P5dHqN7m9wlfFkvyaTt9V6MQ4KgTIf_yYsEYkzSFGPF3w',
    rating: 5,
    quote: '"WanderList transformed how I view travel. It\'s not just a tracker, it\'s a visual manifestation of my life goals. The UI is stunning."'
  },
  {
    id: 't2',
    name: 'Marcus Thorne',
    role: 'Adventure Photographer',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAa087l2Xoe8b4UQZgyzObMASJTpJCntc6bVtLrW5p79eEDPfqs9t4KEoZ-HwDYq4LGxAX9u4enbKEib8a-e3uaV4Vwh-tU-It9kIm-LXass005m_Lm4KzAIe6GNpwgY3r4aGyOKsQdpR4aC_kNw6loE9XMCeNmxe9GremFE7eMcSQe1OWdWYBAWRvyKWmwdGvZWnkEolIQIDLAqLmo0hRqVlJxy7CXf9krhqUEJgDfA8Y1AbGZrdVZXEUVBhKrACZJRXMGnuyCyA',
    rating: 5,
    quote: '"The glassmorphic design makes me feel like I\'m using a futuristic dashboard. Planning my mountain treks has never been this satisfying."'
  },
  {
    id: 't3',
    name: 'Elena Rodriguez',
    role: 'Cultural Explorer',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDaTCHLLj64go2ys4q9ATgujbwnfyZo0EYQU9vnv0DwPPbC1L8CrAWFj9VsdPaZQltXw8lucwsnlPJW3x1nvMUNXxbod4Q-c1DhR4CDk6NTWqGEe_fu4PG9HF1XV0JNrCW4QFZ_vt65W7RiX15KOISFamN1FWrRbMdcryZzZFM25_qxnZZZt6B8LYwqcHnP3JGrlZkF5kuQt030Dw1iHXPKTElmj9ji-dwqcSLMudLhMAGoKPob4guIK7dSPvrEPZ2lHSywnexByQ',
    rating: 5,
    quote: '"Finally an app that respects the aesthetics of travel. Every interaction feels premium and intentional. Highly recommended for any explorer."'
  }
];
