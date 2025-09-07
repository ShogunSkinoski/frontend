import { Property } from '@/lib/types/hostaway';

interface RawReview {
    id: number;
    type: 'host-to-guest' | 'guest-to-host';
    status: 'published' | 'pending' | 'draft' | 'rejected';
    rating: number | null;
    publicReview: string;
    reviewCategory: { category: string; rating: number }[];
    submittedAt: string;
    guestName: string;
    listingName: string;
    listingId: string;
    channel?: string;
    approvalStatus?: 'approved' | 'rejected' | 'pending';
    approvedAt?: string;
    approvedBy?: string;
    rejectionReason?: string;
}

export class PropertiesAPI {
    static async fetchProperties(): Promise<{ properties: Property[]; error?: string }> {
        try {
            const response = await fetch('/api/reviews/hostaway');
            const data = await response.json();
            
            if (data.success) {
                const properties = this.extractPropertiesFromReviews(data.data.reviews);
                return { properties };
            } else {
                return { properties: [], error: data.error || 'Failed to fetch properties' };
            }
        } catch (err) {
            console.error('Error fetching properties:', err);
            return { properties: [], error: 'Failed to connect to API' };
        }
    }

    static async fetchPropertyById(propertyId: string): Promise<{ property?: Property; error?: string }> {
        try {
            const { properties, error } = await this.fetchProperties();
            
            if (error) {
                return { error };
            }

            const property = properties.find(p => p.id === propertyId);
            
            if (property) {
                return { property };
            } else {
                return { error: 'Property not found' };
            }
        } catch (err) {
            console.error('Error fetching property:', err);
            return { error: 'Failed to load property data' };
        }
    }

    private static extractPropertiesFromReviews(reviews: RawReview[]): Property[] {
        const propertyMap = new Map<string, Property>();

        reviews.forEach(review => {
            const listingId = review.listingId;
            const listingName = review.listingName;

            if (!propertyMap.has(listingId)) {
                propertyMap.set(listingId, {
                    id: listingId,
                    name: listingName,
                    listingId,
                    averageRating: 0,
                    totalReviews: 0,
                    reviewCount: { approved: 0, pending: 0, rejected: 0 },
                    channels: [],
                    latestReview: new Date(review.submittedAt),
                    categories: {}
                });
            }

            const property = propertyMap.get(listingId)!;

            // Calculate ratings
            if (review.rating !== null && review.rating !== undefined) {
                const currentTotal = property.averageRating * property.totalReviews;
                property.totalReviews++;
                property.averageRating = (currentTotal + review.rating) / property.totalReviews;
            } else {
                property.totalReviews++;
            }

            // Count review statuses
            if (review.approvalStatus === 'approved') property.reviewCount.approved++;
            else if (review.approvalStatus === 'pending') property.reviewCount.pending++;
            else if (review.approvalStatus === 'rejected') property.reviewCount.rejected++;

            // Track channels
            const channel = review.channel || 'unknown';
            if (!property.channels.includes(channel)) {
                property.channels.push(channel);
            }

            // Track latest review date
            const reviewDate = new Date(review.submittedAt);
            if (reviewDate > property.latestReview) {
                property.latestReview = reviewDate;
            }

            // Process categories
            if (review.reviewCategory && Array.isArray(review.reviewCategory)) {
                review.reviewCategory.forEach(({ category, rating }) => {
                    if (rating !== undefined && rating !== null && typeof rating === 'number') {
                        const currentRating = property.categories[category];
                        
                        if (currentRating === undefined) {
                            property.categories[category] = rating;
                        } else {
                            const reviewsWithThisCategory = Object.keys(property.categories).length;
                            const currentTotal = currentRating * (reviewsWithThisCategory - 1);
                            property.categories[category] = (currentTotal + rating) / reviewsWithThisCategory;
                        }
                    }
                });
            }
        });

        return Array.from(propertyMap.values()).sort((a, b) => 
            b.latestReview.getTime() - a.latestReview.getTime()
        );
    }

    static generatePropertyDetails(property: Property) {
        return {
            title: property.name,
            amenities: [
                { count: Math.floor(Math.random() * 10) + 1, label: "guests" },
                { count: Math.floor(Math.random() * 5) + 1, label: "bedrooms" },
                { count: Math.floor(Math.random() * 3) + 1, label: "bathrooms" },
                { count: Math.floor(Math.random() * 8) + 2, label: "beds" }
            ],
            onAmenityClick: (amenity: any, index: any) => console.log('Clicked:', amenity),
            reviews: [
                {
                    title: property.name,
                    id: "1",
                    userName: "Guest User",
                    userLocation: "Various Locations",
                    userImage: "https://via.placeholder.com/150",
                    rating: property.averageRating,
                    date: property.latestReview.toISOString().split('T')[0],
                    stayDuration: "Various stays",
                    content: `Based on ${property.totalReviews} reviews, guests consistently praise this property for its excellent service and quality.`
                }
            ],
            overallRating: {
                title: "Overall Rating",
                ratings: [
                    { 
                        stars: 5, 
                        percentage: Math.round((property.reviewCount.approved / property.totalReviews) * 100), 
                        count: property.reviewCount.approved.toString() 
                    },
                    { 
                        stars: 4, 
                        percentage: Math.round((property.reviewCount.pending / property.totalReviews) * 100), 
                        count: property.reviewCount.pending.toString() 
                    },
                    { stars: 3, percentage: 5, count: "1" },
                    { stars: 2, percentage: 2, count: "1" },
                    { 
                        stars: 1, 
                        percentage: Math.round((property.reviewCount.rejected / property.totalReviews) * 100), 
                        count: property.reviewCount.rejected.toString() 
                    }
                ]
            },
            categories: Object.entries(property.categories).map(([name, rating]) => ({
                name: name.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                rating: rating || 0,
                description: `Rated ${(rating || 0).toFixed(1)} out of 5 stars for ${name.replace(/_/g, ' ')}`,
                iconType: name.toLowerCase()
            }))
        };
    }
}