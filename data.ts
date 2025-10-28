import type { Destination } from './types';

export const destinations: Destination[] = [
  {
    id: 1,
    name: "Warszawa",
    description: "Stolica Polski",
    image: "https://picsum.photos/seed/warsaw-bar/400/300",
    attractions: [
      {
        id: 101,
        name: "Muzeum Narodowe w Warszawie",
        category: "Kultura",
        rating: 4.6,
        reviews: 1234,
        description: "Jedno z najstarszych i największych muzeów w Polsce z kolekcją dzieł od antyku do współczesności. Założone w 1862 roku jako Muzeum Sztuk Pięknych. Muzeum mieści wspaniałą kolekcję malarstwa, rzeźby i rzemiosła ze wszystkich epok, od antyku do współczesności.",
        address: "Al. Jerozolimskie 3, 00-495 Warszawa",
        hours: "10:00-18:00",
        phone: "+48 567 678 789",
        website: "www.muzeumnarodowe.pl",
        images: [
          "https://picsum.photos/seed/museum1/600/400",
          "https://picsum.photos/seed/museum2/600/400",
          "https://picsum.photos/seed/museum3/600/400",
          "https://picsum.photos/seed/museum4/600/400"
        ],
        avgTime: "3h",
        ticketProviders: [
          { name: "Muzeum Narodowe", type: "Oficjalna strona", price: 30.00, logo: "ticket" },
          { name: "Trip.com", type: "Bilet mobilny", price: 45.23, logo: "tripcom" },
        ]
      },
      {
        id: 102,
        name: "Teatr Narodowy",
        category: "Kultura",
        rating: 5.2,
        reviews: 987,
        description: "Najstarszy teatr publiczny w Polsce, założony w 1765 roku. Prezentuje klasykę polskiej i światowej dramaturgii.",
        address: "ul. Jana Kochanowskiego 4, Warszawa",
        hours: "10:00 - 22:00",
        phone: "+48 123 456 789",
        website: "www.teatrnarodowy.pl",
        images: ["https://picsum.photos/seed/theatre/600/400"],
        avgTime: "2.5h",
        ticketProviders: []
      }
    ]
  },
  {
    id: 2,
    name: "Gdańsk",
    description: "Lorem ipsum",
    image: "https://picsum.photos/seed/gdansk-beach/400/300",
    attractions: []
  },
  {
    id: 3,
    name: "Zakopane",
    description: "Lorem ipsum",
    image: "https://picsum.photos/seed/zakopane-bike/400/300",
    attractions: []
  },
  {
    id: 4,
    name: "Kraków",
    description: "Lorem ipsum",
    image: "https://picsum.photos/seed/krakow-animal/400/300",
    attractions: []
  }
];