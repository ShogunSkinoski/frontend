import { NextRequest, NextResponse } from 'next/server';
import { hostawayService } from '@/services/hostaway';

export async function GET(request: NextRequest) {
  try {
    const apiResponse = await hostawayService.fetchReviews();
    
    const normalizedReviews = hostawayService.normalizeReviews(apiResponse);
    
    const url = new URL(request.url);
    const listingId = url.searchParams.get('listingId');
    const reviewType = url.searchParams.get('reviewType');
    const channel = url.searchParams.get('channel');
    const startDate = url.searchParams.get('startDate');
    const endDate = url.searchParams.get('endDate');
    const approvalStatus = url.searchParams.get('approvalStatus');
    
    let filteredReviews = normalizedReviews;
    
    if (listingId) {
      filteredReviews = filteredReviews.filter(review => review.listingId === listingId);
    }
    
    if (reviewType) {
      filteredReviews = filteredReviews.filter(review => review.reviewType === reviewType);
    }
    
    if (channel) {
      filteredReviews = filteredReviews.filter(review => review.channel === channel);
    }
    
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      filteredReviews = hostawayService.getReviewsInDateRange(filteredReviews, start, end);
    }
    
    if (approvalStatus) {
      filteredReviews = filteredReviews.filter(review => review.approvalStatus === approvalStatus);
    }
    
    const summary = {
      totalReviews: filteredReviews.length,
      averageRating: hostawayService.calculateAverageRating(filteredReviews),
      reviewsByType: hostawayService.groupReviewsByType(filteredReviews),
      reviewsByChannel: hostawayService.groupReviewsByChannel(filteredReviews),
      reviewsByListing: hostawayService.groupReviewsByListing(filteredReviews),
      pendingReviews: hostawayService.getPendingReviews(normalizedReviews).length,
      approvedReviews: hostawayService.getApprovedReviews(normalizedReviews).length,
      rejectedReviews: hostawayService.getRejectedReviews(normalizedReviews).length
    };
    
    return NextResponse.json({
      success: true,
      data: {
        reviews: filteredReviews,
        summary,
        totalCount: normalizedReviews.length,
        filteredCount: filteredReviews.length
      }
    });
    
  } catch (error) {
    console.error('Error fetching Hostaway reviews:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch reviews from Hostaway API' 
      },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { reviewId, action, reason, approvedBy } = body;
    
    if (!reviewId || !action) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required fields: reviewId and action' 
        },
        { status: 400 }
      );
    }
    
    if (!['approve', 'reject'].includes(action)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid action. Must be "approve" or "reject"' 
        },
        { status: 400 }
      );
    }
    
    const success = await hostawayService.updateReviewApproval({
      reviewId,
      action,
      reason,
      approvedBy
    });
    
    if (success) {
      return NextResponse.json({
        success: true,
        message: `Review ${action}d successfully`,
        data: { reviewId, action, approvedBy }
      });
    } else {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Review not found or update failed' 
        },
        { status: 404 }
      );
    }
    
  } catch (error) {
    console.error('Error updating review approval:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to update review approval' 
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    return NextResponse.json({
      success: true,
      message: 'Review creation not implemented in sandbox mode',
      data: body
    });
    
  } catch (error) {
    console.error('Error creating review:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to create review' 
      },
      { status: 500 }
    );
  }
}