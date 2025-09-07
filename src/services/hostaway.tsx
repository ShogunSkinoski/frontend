import { HostawayApiResponse, NormalizedReview, ReviewApprovalRequest } from '@/lib/types/hostaway';
import { mockHostawayReviews } from './hostaway_revies';

export class HostawayService {
  private baseUrl: string;
  private apiKey: string;

  constructor(baseUrl: string = process.env.NEXT_PUBLIC_HOSTAWAY_API_URL || '', 
              apiKey: string = process.env.NEXT_PUBLIC_HOSTAWAY_API_KEY || '') {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  async fetchReviews(): Promise<HostawayApiResponse> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return mockHostawayReviews;
  }

  normalizeReviews(apiResponse: HostawayApiResponse): NormalizedReview[] {
    return apiResponse.result.map(review => ({
      id: review.id.toString(),
      listingId: this.extractListingId(review.listingName),
      listingName: review.listingName,
      guestName: review.guestName,
      reviewType: review.type,
      channel: review.channel || 'Unknown',
      rating: review.rating,
      reviewText: review.publicReview,
      categories: this.normalizeCategories(review.reviewCategory),
      submittedAt: new Date(review.submittedAt),
      status: review.status,
      approvalStatus: review.approvalStatus,
      approvedAt: review.approvedAt ? new Date(review.approvedAt) : undefined,
      approvedBy: review.approvedBy,
      rejectionReason: review.rejectionReason
    })).sort((a, b) => b.submittedAt.getTime() - a.submittedAt.getTime());
  }

  private extractListingId(listingName: string): string {
    const propertyIdMap: { [key: string]: string } = {
      'Sunset Villa': 'sunset-villa',
      'Ocean View Apartment': 'ocean-view-apartment', 
      'Mountain Cabin Retreat': 'mountain-cabin-retreat',
      'Downtown City Loft': 'downtown-city-loft'
    };
    
    return propertyIdMap[listingName] || listingName.toLowerCase().replace(/[^a-z0-9]/g, '').substring(0, 10);
  }

  private normalizeCategories(categories: Array<{category: string, rating: number}>) {
    const normalized: NormalizedReview['categories'] = {};
    
    categories.forEach(cat => {
      const categoryKey = cat.category.toLowerCase().replace(/\s+/g, '_');
      normalized[categoryKey as keyof NormalizedReview['categories']] = cat.rating;
    });
    
    return normalized;
  }

  groupReviewsByListing(reviews: NormalizedReview[]) {
    return reviews.reduce((acc, review) => {
      if (!acc[review.listingId]) {
        acc[review.listingId] = [];
      }
      acc[review.listingId].push(review);
      return acc;
    }, {} as Record<string, NormalizedReview[]>);
  }

  groupReviewsByType(reviews: NormalizedReview[]) {
    return reviews.reduce((acc, review) => {
      if (!acc[review.reviewType]) {
        acc[review.reviewType] = [];
      }
      acc[review.reviewType].push(review);
      return acc;
    }, {} as Record<string, NormalizedReview[]>);
  }

  groupReviewsByChannel(reviews: NormalizedReview[]) {
    return reviews.reduce((acc, review) => {
      if (!acc[review.channel]) {
        acc[review.channel] = [];
      }
      acc[review.channel].push(review);
      return acc;
    }, {} as Record<string, NormalizedReview[]>);
  }

  calculateAverageRating(reviews: NormalizedReview[]): number {
    const ratings = reviews
      .map(r => r.rating)
      .filter(rating => rating !== null) as number[];
    
    if (ratings.length === 0) return 0;
    
    return ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;
  }

  getReviewsInDateRange(reviews: NormalizedReview[], startDate: Date, endDate: Date): NormalizedReview[] {
    return reviews.filter(review => 
      review.submittedAt >= startDate && review.submittedAt <= endDate
    );
  }

  async approveReview(reviewId: string, approvedBy?: string): Promise<boolean> {
    try {

      const reviewIndex = mockHostawayReviews.result.findIndex(r => r.id.toString() === reviewId);
      
      if (reviewIndex !== -1) {
        mockHostawayReviews.result[reviewIndex].status = 'published';
        mockHostawayReviews.result[reviewIndex].approvalStatus = 'approved';
        mockHostawayReviews.result[reviewIndex].approvedAt = new Date().toISOString();
        mockHostawayReviews.result[reviewIndex].approvedBy = approvedBy || 'Property Manager';
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error approving review:', error);
      return false;
    }
  }

  async rejectReview(reviewId: string, reason?: string, approvedBy?: string): Promise<boolean> {
    try {
      
      const reviewIndex = mockHostawayReviews.result.findIndex(r => r.id.toString() === reviewId);
      
      if (reviewIndex !== -1) {
        mockHostawayReviews.result[reviewIndex].status = 'rejected';
        mockHostawayReviews.result[reviewIndex].approvalStatus = 'rejected';
        mockHostawayReviews.result[reviewIndex].approvedAt = new Date().toISOString();
        mockHostawayReviews.result[reviewIndex].approvedBy = approvedBy || 'Property Manager';
        mockHostawayReviews.result[reviewIndex].rejectionReason = reason;
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error rejecting review:', error);
      return false;
    }
  }

  async updateReviewApproval(request: ReviewApprovalRequest): Promise<boolean> {
    const { reviewId, action, reason, approvedBy } = request;
    
    if (action === 'approve') {
      return this.approveReview(reviewId, approvedBy);
    } else if (action === 'reject') {
      return this.rejectReview(reviewId, reason, approvedBy);
    }
    
    return false;
  }

  getPendingReviews(reviews: NormalizedReview[]): NormalizedReview[] {
    return reviews.filter(review => review.approvalStatus === 'pending');
  }

  getApprovedReviews(reviews: NormalizedReview[]): NormalizedReview[] {
    return reviews.filter(review => review.approvalStatus === 'approved');
  }

  getRejectedReviews(reviews: NormalizedReview[]): NormalizedReview[] {
    return reviews.filter(review => review.approvalStatus === 'rejected');
  }
}

export const hostawayService = new HostawayService();