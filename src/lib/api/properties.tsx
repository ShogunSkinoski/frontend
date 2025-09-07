import { Property, PropertyDetail } from '@/lib/types/hostaway';

interface RawReview {
    id: number;
    type: 'host-to-guest' | 'guest-to-host';
    status: 'published' | 'pending' | 'draft' | 'rejected';
    rating: number | null;
    reviewText: string;
    reviewCategories: { category: string; rating: number }[];
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

    static async fetchReviewsForProperty(propertyId: string): Promise<{ reviews: RawReview[]; error?: string }> {
        try {
            const response = await fetch(`/api/reviews/hostaway?listingId=${propertyId}`);
            const data = await response.json();
            
            if (data.success) {
                return { reviews: data.data.reviews };
            } else {
                return { reviews: [], error: data.error || 'Failed to fetch reviews' };
            }
        } catch (err) {
            console.error('Error fetching reviews for property:', err);
            return { reviews: [], error: 'Failed to connect to API' };
        }
    }

    private static transformReviewForPropertyDetail(review: RawReview): PropertyDetail['reviews'][0] {
        debugger;
        return {
            title: review.listingName,
            id: review.id.toString(),
            userName: review.guestName,
            userLocation: "Guest Location",
            userImage: null,
            rating: review.rating || 0,
            date: new Date(review.submittedAt).toLocaleDateString(),
            stayDuration: review.type === 'guest-to-host' ? 'Recent stay' : 'Host review',
            content: review.reviewText 
        };
    }
    

    private static calculateRatingDistribution(reviews: RawReview[]): PropertyDetail['overallRating']['ratings'] {
        const reviewsWithRating = reviews.filter(r => r.rating !== null && r.type === 'guest-to-host');
        const totalReviews = reviewsWithRating.length;
        
        if (totalReviews === 0) {
            return [
                { stars: 5, percentage: 0, count: "0" },
                { stars: 4, percentage: 0, count: "0" },
                { stars: 3, percentage: 0, count: "0" },
                { stars: 2, percentage: 0, count: "0" },
                { stars: 1, percentage: 0, count: "0" }
            ];
        }

        const ratingCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
        
        reviewsWithRating.forEach(review => {
            if (review.rating) {
                const roundedRating = Math.round(review.rating) as keyof typeof ratingCounts;
                if (roundedRating >= 1 && roundedRating <= 5) {
                    ratingCounts[roundedRating]++;
                }
            }
        });

        return [
            { stars: 5, percentage: Math.round((ratingCounts[5] / totalReviews) * 100), count: ratingCounts[5].toString() },
            { stars: 4, percentage: Math.round((ratingCounts[4] / totalReviews) * 100), count: ratingCounts[4].toString() },
            { stars: 3, percentage: Math.round((ratingCounts[3] / totalReviews) * 100), count: ratingCounts[3].toString() },
            { stars: 2, percentage: Math.round((ratingCounts[2] / totalReviews) * 100), count: ratingCounts[2].toString() },
            { stars: 1, percentage: Math.round((ratingCounts[1] / totalReviews) * 100), count: ratingCounts[1].toString() }
        ];
    }

    private static calculateCategoryAverages(reviews: RawReview[]): PropertyDetail['reviewCategories'] {
        const categoryTotals: Record<string, { sum: number; count: number }> = {};
        
        reviews.forEach(review => {
            if (review.reviewCategories && Array.isArray(review.reviewCategories)) {
                review.reviewCategories.forEach(({ category, rating }) => {
                    if (rating !== undefined && rating !== null) {
                        if (!categoryTotals[category]) {
                            categoryTotals[category] = { sum: 0, count: 0 };
                        }
                        categoryTotals[category].sum += rating;
                        categoryTotals[category].count++;
                    }
                });
            }
        });

        const categoryMap: Record<string, 'cleanliness' | 'accuracy' | 'checkin' | 'communication' | 'location' | 'value'> = {
            'cleanliness': 'cleanliness',
            'accuracy': 'accuracy',
            'check_in': 'checkin',
            'communication': 'communication',
            'location': 'location',
            'value': 'value'
        };

        return Object.entries(categoryTotals).map(([category, { sum, count }]) => {
            const average = sum / count;
            const normalizedRating = (average / 10) * 5;
            
            return {
                name: category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                rating: Number(normalizedRating.toFixed(1)),
                description: `Rated ${normalizedRating.toFixed(1)} out of 5 stars for ${category.replace(/_/g, ' ')}`,
                iconType: categoryMap[category] || 'value'
            };
        });
    }

    static async generatePropertyDetails(property: Property): Promise<PropertyDetail> {
        const { reviews, error } = await this.fetchReviewsForProperty(property.id);
        
        if (error) {
            console.warn('Failed to fetch reviews for property:', error);
            return this.generateFallbackPropertyDetails(property);
        }

        const transformedReviews = reviews
            .filter(review => review.status === 'published') 
            .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()) 
            .slice(0, 10) 
            .map(review => this.transformReviewForPropertyDetail(review));

        return {
            title: property.name,
            amenities: [
                { count: Math.floor(Math.random() * 10) + 1, label: "guests" },
                { count: Math.floor(Math.random() * 5) + 1, label: "bedrooms" },
                { count: Math.floor(Math.random() * 3) + 1, label: "bathrooms" },
                { count: Math.floor(Math.random() * 8) + 2, label: "beds" }
            ],
            onAmenityClick: (amenity: any, index: any) => console.log('Clicked:', amenity),
            reviews: transformedReviews,
            overallRating: {
                title: "Overall Rating",
                ratings: this.calculateRatingDistribution(reviews)
            },
            reviewCategories: this.calculateCategoryAverages(reviews)
        };
    }

    private static generateFallbackPropertyDetails(property: Property): PropertyDetail {
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
                    userImage: null,
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
            reviewCategories: Object.entries(property.categories).map(([name, rating]) => ({
                name: name.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                rating: rating || 0,
                description: `Rated ${(rating || 0).toFixed(1)} out of 5 stars for ${name.replace(/_/g, ' ')}`,
                iconType: name.toLowerCase() as 'cleanliness' | 'accuracy' | 'checkin' | 'communication' | 'location' | 'value'
            }))
        };
    }

    private static extractPropertiesFromReviews(reviews: RawReview[]): Property[] {
        const propertyMap = new Map<string, Property>();

        reviews.forEach(review => {
            const listingId = this.extractListingId(review.listingName);
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

            if (review.rating !== null && review.rating !== undefined) {
                const currentTotal = property.averageRating * property.totalReviews;
                property.totalReviews++;
                property.averageRating = (currentTotal + review.rating) / property.totalReviews;
            } else {
                property.totalReviews++;
            }

            if (review.approvalStatus === 'approved') property.reviewCount.approved++;
            else if (review.approvalStatus === 'pending') property.reviewCount.pending++;
            else if (review.approvalStatus === 'rejected') property.reviewCount.rejected++;

            const channel = review.channel || 'unknown';
            if (!property.channels.includes(channel)) {
                property.channels.push(channel);
            }

            const reviewDate = new Date(review.submittedAt);
            if (reviewDate > property.latestReview) {
                property.latestReview = reviewDate;
            }

            if (review.reviewCategories && Array.isArray(review.reviewCategories)) {
                review.reviewCategories.forEach(({ category, rating }) => {
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

    private static extractListingId(listingName: string): string {
        const propertyIdMap: { [key: string]: string } = {
            'Sunset Villa': 'sunset-villa',
            'Ocean View Apartment': 'ocean-view-apartment', 
            'Mountain Cabin Retreat': 'mountain-cabin-retreat',
            'Downtown City Loft': 'downtown-city-loft'
        };
        
        return propertyIdMap[listingName] || listingName.toLowerCase().replace(/[^a-z0-9]/g, '').substring(0, 10);
    }
}