export interface ReviewCategory {
    category: string;
    rating: number;
}

export interface HostawayReview {
    id: number;
    type: 'host-to-guest' | 'guest-to-host';
    status: 'published' | 'pending' | 'draft' | 'rejected';
    rating: number | null;
    publicReview: string;
    reviewCategory: ReviewCategory[];
    submittedAt: string;
    guestName: string;
    listingName: string;
    channel?: string;
    approvalStatus?: 'approved' | 'rejected' | 'pending';
    approvedAt?: string;
    approvedBy?: string;
    rejectionReason?: string;
}

export interface HostawayApiResponse {
    status: 'success' | 'error';
    result: HostawayReview[];
}

export interface NormalizedReview {
    id: string;
    listingId: string;
    listingName: string;
    guestName: string;
    reviewType: 'host-to-guest' | 'guest-to-host';
    channel: string;
    rating: number | null;
    reviewText: string;
    categories: {
        cleanliness?: number;
        communication?: number;
        respect_house_rules?: number;
        check_in?: number;
        accuracy?: number;
        location?: number;
        value?: number;
    };
    submittedAt: Date;
    status: 'published' | 'pending' | 'draft' | 'rejected';
    approvalStatus?: 'approved' | 'rejected' | 'pending';
    approvedAt?: Date;
    approvedBy?: string;
    rejectionReason?: string;
}

export interface ReviewApprovalRequest {
    reviewId: string;
    action: 'approve' | 'reject';
    reason?: string;
    approvedBy?: string;
}

export interface Property {
    id: string;
    name: string;
    listingId: string;
    averageRating: number;
    totalReviews: number;
    reviewCount: {
        approved: number;
        pending: number;
        rejected: number;
    };
    channels: string[];
    latestReview: Date;
    categories: Record<string, number>; 
}

export interface PropertyDetail {
    title: string;
    amenities: {
        count: number;
        label: string;
    }[];
    onAmenityClick: (amenity: any, index: any) => void;
    reviews: {
        title: string;
        id: string;
        userName: string;
        userLocation: string;
        userImage: string | null;
        rating: number;
        date: string | null;
        stayDuration: string;
        content: string;
    }[];
    overallRating: {
        title: string;
        ratings: { stars: number; percentage: number; count: string }[];
    };
    reviewCategories: { 
        name: string; 
        rating: number; 
        description: string; 
        iconType: 'cleanliness' | 'accuracy' | 'checkin' | 'communication' | 'location' | 'value';
    }[];
}