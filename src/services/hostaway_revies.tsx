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
      submittedAt: '2024-08-21 22:45:14',
      guestName: 'Shane Finkelstein',
      listingName: 'Sunset Villa',
      channel: 'Airbnb',
      approvalStatus: 'approved',
      approvedAt: '2024-08-22 10:30:00',
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
      submittedAt: '2024-11-15 14:30:22',
      guestName: 'Maria Rodriguez',
      listingName: 'Ocean View Apartment',
      channel: 'Booking.com',
      approvalStatus: 'approved',
      approvedAt: '2024-11-16 09:15:00',
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
      submittedAt: '2024-10-28 09:15:33',
      guestName: 'John Smith',
      listingName: 'Sunset Villa',
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
      submittedAt: '2024-09-12 16:45:18',
      guestName: 'Emma Johnson',
      listingName: 'Mountain Cabin Retreat',
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
      submittedAt: '2024-08-05 11:22:45',
      guestName: 'David Chen',
      listingName: 'Ocean View Apartment',
      channel: 'Airbnb',
      approvalStatus: 'rejected',
      approvedAt: '2024-08-06 14:30:00',
      approvedBy: 'Property Manager',
      rejectionReason: 'Contains inappropriate language'
    },
    {
      id: 7458,
      type: 'guest-to-host',
      status: 'published',
      rating: 5,
      publicReview: 'Absolutely stunning villa with breathtaking sunset views. Everything was perfect from check-in to check-out.',
      reviewCategory: [
        { category: 'cleanliness', rating: 10 },
        { category: 'communication', rating: 9 },
        { category: 'check_in', rating: 10 },
        { category: 'accuracy', rating: 10 },
        { category: 'location', rating: 10 },
        { category: 'value', rating: 9 }
      ],
      submittedAt: '2024-12-01 18:20:15',
      guestName: 'Sarah Wilson',
      listingName: 'Sunset Villa',
      channel: 'Airbnb',
      approvalStatus: 'approved',
      approvedAt: '2024-12-02 09:00:00',
      approvedBy: 'Property Manager'
    },
    {
      id: 7459,
      type: 'guest-to-host',
      status: 'published',
      rating: 5,
      publicReview: 'Perfect downtown location! The loft was modern, clean, and had everything we needed. Great communication from the host.',
      reviewCategory: [
        { category: 'cleanliness', rating: 9 },
        { category: 'communication', rating: 10 },
        { category: 'check_in', rating: 9 },
        { category: 'accuracy', rating: 9 },
        { category: 'location', rating: 10 },
        { category: 'value', rating: 8 }
      ],
      submittedAt: '2024-11-28 16:45:30',
      guestName: 'Michael Brown',
      listingName: 'Downtown City Loft',
      channel: 'Booking.com',
      approvalStatus: 'approved',
      approvedAt: '2024-11-29 10:15:00',
      approvedBy: 'Property Manager'
    },
    {
      id: 7460,
      type: 'host-to-guest',
      status: 'published',
      rating: null,
      publicReview: 'Jessica was an excellent guest! Left the cabin in perfect condition and followed all house rules. Welcome back anytime!',
      reviewCategory: [
        { category: 'cleanliness', rating: 10 },
        { category: 'communication', rating: 9 },
        { category: 'respect_house_rules', rating: 10 }
      ],
      submittedAt: '2024-11-20 14:20:45',
      guestName: 'Jessica Taylor',
      listingName: 'Mountain Cabin Retreat',
      channel: 'Airbnb',
      approvalStatus: 'approved',
      approvedAt: '2024-11-21 08:30:00',
      approvedBy: 'Property Manager'
    },
    {
      id: 7461,
      type: 'guest-to-host',
      status: 'pending',
      rating: 4,
      publicReview: 'Great ocean views and comfortable apartment. The location is fantastic for beach activities.',
      reviewCategory: [
        { category: 'cleanliness', rating: 8 },
        { category: 'communication', rating: 9 },
        { category: 'check_in', rating: 8 },
        { category: 'accuracy', rating: 9 },
        { category: 'location', rating: 10 },
        { category: 'value', rating: 8 }
      ],
      submittedAt: '2024-12-03 12:15:20',
      guestName: 'Robert Davis',
      listingName: 'Ocean View Apartment',
      channel: 'Vrbo',
      approvalStatus: 'pending'
    },
    {
      id: 7462,
      type: 'guest-to-host',
      status: 'published',
      rating: 5,
      publicReview: 'The downtown loft exceeded our expectations! Modern amenities, great location, and responsive host.',
      reviewCategory: [
        { category: 'cleanliness', rating: 10 },
        { category: 'communication', rating: 10 },
        { category: 'check_in', rating: 9 },
        { category: 'accuracy', rating: 10 },
        { category: 'location', rating: 10 },
        { category: 'value', rating: 9 }
      ],
      submittedAt: '2024-11-10 19:30:15',
      guestName: 'Lisa Anderson',
      listingName: 'Downtown City Loft',
      channel: 'Airbnb',
      approvalStatus: 'approved',
      approvedAt: '2024-11-11 11:00:00',
      approvedBy: 'Property Manager'
    },
    {
      id: 7463,
      type: 'guest-to-host',
      status: 'pending',
      rating: 3,
      publicReview: 'The cabin is cozy but had some minor maintenance issues during our stay.',
      reviewCategory: [
        { category: 'cleanliness', rating: 7 },
        { category: 'communication', rating: 8 },
        { category: 'check_in', rating: 6 },
        { category: 'accuracy', rating: 8 },
        { category: 'location', rating: 9 },
        { category: 'value', rating: 7 }
      ],
      submittedAt: '2024-12-05 10:45:30',
      guestName: 'Amanda White',
      listingName: 'Mountain Cabin Retreat',
      channel: 'Booking.com',
      approvalStatus: 'pending'
    },
    {
      id: 7467,
      type: 'guest-to-host',
      status: 'published',
      rating: 5,
      publicReview: 'Incredible ocean views and perfect beachside location! We spent hours on the balcony watching the waves and enjoying the sea breeze. The apartment is beautifully designed with modern amenities and everything you need for a relaxing beach vacation. The bed was extremely comfortable and the bathroom was spa-like. Walking distance to amazing seafood restaurants and beach activities. The host was wonderful and provided beach chairs and umbrellas. Can\'t wait to return!',
      reviewCategory: [
        { category: 'cleanliness', rating: 9 },
        { category: 'communication', rating: 10 },
        { category: 'check_in', rating: 9 },
        { category: 'accuracy', rating: 10 },
        { category: 'location', rating: 10 },
        { category: 'value', rating: 9 }
      ],
      submittedAt: '2024-11-22 16:30:45',
      guestName: 'David Wilson',
      listingName: 'Ocean View Apartment',
      channel: 'Airbnb',
      approvalStatus: 'approved',
      approvedAt: '2024-11-23 10:15:00',
      approvedBy: 'Property Manager'
    },
    {
      id: 7468,
      type: 'guest-to-host',
      status: 'published',
      rating: 5,
      publicReview: 'This villa is pure luxury! From the moment we arrived, we were blown away by the elegance and attention to detail. The sunset views are absolutely magical - we spent every evening on the terrace with a glass of wine watching the sky transform. The pool area is like something from a magazine, and the outdoor kitchen was perfect for entertaining. The villa is spacious, immaculate, and has every luxury amenity you could want. Truly a once-in-a-lifetime experience!',
      reviewCategory: [
        { category: 'cleanliness', rating: 10 },
        { category: 'communication', rating: 10 },
        { category: 'check_in', rating: 10 },
        { category: 'accuracy', rating: 10 },
        { category: 'location', rating: 10 },
        { category: 'value', rating: 9 }
      ],
      submittedAt: '2024-10-15 20:15:30',
      guestName: 'Rachel Martinez',
      listingName: 'Sunset Villa',
      channel: 'Vrbo',
      approvalStatus: 'approved',
      approvedAt: '2024-10-16 09:45:00',
      approvedBy: 'Property Manager'
    }
  ]
};