import { HostawayApiResponse } from "@/lib/types/hostaway";

export const mockHostawayReviews: HostawayApiResponse = {
  status: 'success',
  result: [
    {
      id: 7453,
      type: 'host-to-guest',
      status: 'published',
      rating: null,
      publicReview: 'Shane and family are wonderful! Would definitely host again :)',
      reviewCategory: [
        { category: 'cleanliness', rating: 10 },
        { category: 'communication', rating: 10 },
        { category: 'respect_house_rules', rating: 10 }
      ],
      submittedAt: '2020-08-21 22:45:14',
      guestName: 'Shane Finkelstein',
      listingName: '2B N1 A - 29 Shoreditch Heights',
      channel: 'Airbnb',
      approvalStatus: 'approved',
      approvedAt: '2020-08-22 10:30:00',
      approvedBy: 'Property Manager'
    },
    {
      id: 7454,
      type: 'guest-to-host',
      status: 'published',
      rating: 5,
      publicReview: 'Amazing location and beautiful apartment. The host was very responsive and helpful.',
      reviewCategory: [
        { category: 'cleanliness', rating: 9 },
        { category: 'communication', rating: 10 },
        { category: 'check_in', rating: 9 },
        { category: 'accuracy', rating: 10 },
        { category: 'location', rating: 10 },
        { category: 'value', rating: 9 }
      ],
      submittedAt: '2023-11-15 14:30:22',
      guestName: 'Maria Rodriguez',
      listingName: 'Modern City Loft Downtown',
      channel: 'Booking.com',
      approvalStatus: 'approved',
      approvedAt: '2023-11-16 09:15:00',
      approvedBy: 'Property Manager'
    },
    {
      id: 7455,
      type: 'host-to-guest',
      status: 'pending',
      rating: null,
      publicReview: 'Great stay! The property was exactly as described. Clean and well-maintained.',
      reviewCategory: [
        { category: 'cleanliness', rating: 9 },
        { category: 'communication', rating: 8 },
        { category: 'respect_house_rules', rating: 10 }
      ],
      submittedAt: '2023-10-28 09:15:33',
      guestName: 'John Smith',
      listingName: 'Luxury Villa Sunset View',
      channel: 'Airbnb',
      approvalStatus: 'pending'
    },
    {
      id: 7456,
      type: 'guest-to-host',
      status: 'pending',
      rating: 4,
      publicReview: 'Nice apartment with good amenities. Minor issues with the WiFi but overall good experience.',
      reviewCategory: [
        { category: 'cleanliness', rating: 8 },
        { category: 'communication', rating: 9 },
        { category: 'check_in', rating: 7 },
        { category: 'accuracy', rating: 8 },
        { category: 'location', rating: 9 },
        { category: 'value', rating: 8 }
      ],
      submittedAt: '2023-09-12 16:45:18',
      guestName: 'Emma Johnson',
      listingName: 'Cozy Mountain Cabin Forest',
      channel: 'Vrbo',
      approvalStatus: 'pending'
    },
    {
      id: 7457,
      type: 'host-to-guest',
      status: 'rejected',
      rating: null,
      publicReview: 'This review contains inappropriate content and cannot be published.',
      reviewCategory: [
        { category: 'cleanliness', rating: 10 },
        { category: 'communication', rating: 10 },
        { category: 'respect_house_rules', rating: 9 }
      ],
      submittedAt: '2023-08-05 11:22:45',
      guestName: 'David Chen',
      listingName: 'Modern Apartment Ocean View',
      channel: 'Airbnb',
      approvalStatus: 'rejected',
      approvedAt: '2023-08-06 14:30:00',
      approvedBy: 'Property Manager',
      rejectionReason: 'Contains inappropriate language'
    },
    {
      id: 7458,
      type: 'guest-to-host',
      status: 'pending',
      rating: 3,
      publicReview: 'The property had some maintenance issues that weren\'t addressed promptly.',
      reviewCategory: [
        { category: 'cleanliness', rating: 6 },
        { category: 'communication', rating: 7 },
        { category: 'check_in', rating: 5 },
        { category: 'accuracy', rating: 8 },
        { category: 'location', rating: 9 },
        { category: 'value', rating: 6 }
      ],
      submittedAt: '2023-12-01 18:20:15',
      guestName: 'Sarah Wilson',
      listingName: 'Urban Studio Apartment',
      channel: 'Airbnb',
      approvalStatus: 'pending'
    }
  ]
};