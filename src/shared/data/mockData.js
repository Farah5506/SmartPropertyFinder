export const properties = [
  { id: 'p1', type: 'rent', title: '2-bedroom apartment', location: 'New Cairo', compound: 'Mivida', price: 18000, rooms: 2, area: 120, advertiserId: 'a1' },
  { id: 'p2', type: 'rent', title: 'Studio near AUC', location: 'New Cairo', compound: '', price: 9500, rooms: 1, area: 60, advertiserId: 'a2' },
  { id: 'p3', type: 'rent', title: 'Family apartment', location: 'Sheikh Zayed', compound: 'Allegria', price: 25000, rooms: 3, area: 180, advertiserId: 'a3' },
  { id: 'p4', type: 'rent', title: 'Furnished flat', location: 'Maadi', compound: '', price: 15000, rooms: 2, area: 110, advertiserId: 'a1' },
  { id: 'p5', type: 'buy', title: '3-bedroom apartment', location: 'New Cairo', compound: 'Hyde Park', price: 6500000, rooms: 3, area: 165, advertiserId: 'a1' },
  { id: 'p6', type: 'buy', title: 'Townhouse', location: '6th of October', compound: 'Palm Hills', price: 12000000, rooms: 4, area: 260, advertiserId: 'a3' },
  { id: 'p7', type: 'buy', title: 'Apartment with garden', location: 'El Shorouk', compound: '', price: 4200000, rooms: 3, area: 150, advertiserId: 'a2' },
  { id: 'p8', type: 'buy', title: 'Duplex', location: 'Madinaty', compound: 'Madinaty', price: 8900000, rooms: 4, area: 230, advertiserId: 'a1' },
];

export const advertisers = [
  { id: 'a1', name: 'Ahmed Hassan', company: 'Nile Homes', phone: '01012345678', email: 'ahmed@nilehomes.com', memberSince: '2024' },
  { id: 'a2', name: 'Mona Adel', company: 'Cairo Living', phone: '01198765432', email: 'mona@cairoliving.com', memberSince: '2025' },
  { id: 'a3', name: 'Karim Samir', company: 'West Estates', phone: '01234567890', email: 'karim@westestates.com', memberSince: '2023' },
];

export const users = [
  { id: 'u1', name: 'Sara Mahmoud', phone: '01011112222', email: 'sara@gmail.com', memberSince: '2025' },
  { id: 'u2', name: 'Omar Khaled', phone: '01133334444', email: 'omar@gmail.com', memberSince: '2024' },
  { id: 'u3', name: 'Nour Ibrahim', phone: '01555556666', email: 'nour@gmail.com', memberSince: '2026' },
];

export const reviews = [
  { id: 'r1', targetId: 'a1', reviewerName: 'Sara Mahmoud', stars: 5, comment: 'Very helpful and answered quickly.' },
  { id: 'r2', targetId: 'a1', reviewerName: 'Omar Khaled', stars: 4, comment: 'The apartment was exactly like the photos.' },
  { id: 'r3', targetId: 'a2', reviewerName: 'Nour Ibrahim', stars: 3, comment: 'Good place but slow replies.' },
  { id: 'r4', targetId: 'a3', reviewerName: 'Sara Mahmoud', stars: 5, comment: 'Professional and honest.' },
  { id: 'r5', targetId: 'u1', reviewerName: 'Ahmed Hassan', stars: 5, comment: 'Paid on time and kept the flat clean.' },
  { id: 'r6', targetId: 'u1', reviewerName: 'Mona Adel', stars: 4, comment: 'Easy to deal with.' },
  { id: 'r7', targetId: 'u2', reviewerName: 'Ahmed Hassan', stars: 4, comment: 'Serious buyer, good communication.' },
];

export const inquiries = [
  { id: 'i1', userId: 'u1', propertyId: 'p1' },
  { id: 'i2', userId: 'u2', propertyId: 'p5' },
  { id: 'i3', userId: 'u3', propertyId: 'p4' },
];

export const currentUser = users[0];
export const currentAdvertiser = advertisers[0];

export const favouriteIds = ['p1', 'p3', 'p6'];