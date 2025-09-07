"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Search, Star, Eye, EyeOff, MessageSquare, AlertTriangle, 
  CheckCircle, XCircle, Filter, RefreshCw, ExternalLink 
} from "lucide-react"
import { NormalizedReview } from "@/lib/types/hostaway"
import { Loader2 } from "lucide-react";

interface ReviewManagementProps {
  className?: string
}

export function ReviewManagement({ className }: ReviewManagementProps) {
  const [reviews, setReviews] = useState<NormalizedReview[]>([])
  const [filteredReviews, setFilteredReviews] = useState<NormalizedReview[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [listingFilter, setListingFilter] = useState("all")
  const [channelFilter, setChannelFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")
  const [approvalStatus, setApprovalStatus] = useState("all")
  const [approvingReviews, setApprovingReviews] = useState<Set<string>>(new Set());
  const [showApprovalFilter, setShowApprovalFilter] = useState(false);

  useEffect(() => {
    fetchHostawayReviews()
  }, [])

  useEffect(() => {
    filterReviews()
  }, [reviews, searchTerm, listingFilter, channelFilter, typeFilter, dateFilter, approvalStatus])

  const fetchHostawayReviews = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/reviews/hostaway')
      const data = await response.json()
      
      if (data.success) {
        setReviews(data.data.reviews)
      } else {
        setError(data.error || 'Failed to fetch reviews')
      }
    } catch (err) {
      setError('Failed to connect to Hostaway API')
    } finally {
      setLoading(false)
    }
  }

  const filterReviews = () => {
    let filtered = reviews

    if (searchTerm) {
      filtered = filtered.filter(review =>
        review.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.listingName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.reviewText.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (listingFilter !== "all") {
      filtered = filtered.filter(review => review.listingId === listingFilter)
    }

    if (channelFilter !== "all") {
      filtered = filtered.filter(review => review.channel === channelFilter)
    }

    if (typeFilter !== "all") {
      filtered = filtered.filter(review => review.reviewType === typeFilter)
    }

    if (dateFilter !== "all") {
      const now = new Date()
      let startDate: Date
      
      switch (dateFilter) {
        case "7days":
          startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
          break
        case "30days":
          startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
          break
        case "90days":
          startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000)
          break
        case "1year":
          startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000)
          break
        default:
          startDate = new Date(0)
      }
      
      filtered = filtered.filter(review => review.submittedAt >= startDate)
    }

    setFilteredReviews(filtered)
  }

  const handleApproveReview = async (reviewId: string) => {
    setApprovingReviews(prev => new Set(prev).add(reviewId));
    
    try {
      const response = await fetch('/api/reviews/hostaway', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reviewId,
          action: 'approve',
          approvedBy: 'Property Manager'
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        await fetchHostawayReviews();
      } else {
        console.error('Failed to approve review:', data.error);
      }
    } catch (error) {
      console.error('Error approving review:', error);
    } finally {
      setApprovingReviews(prev => {
        const newSet = new Set(prev);
        newSet.delete(reviewId);
        return newSet;
      });
    }
  };
  const handleRejectReview = async (reviewId: string, reason?: string) => {
    setApprovingReviews(prev => new Set(prev).add(reviewId));
    
    try {
      const response = await fetch('/api/reviews/hostaway', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reviewId,
          action: 'reject',
          reason: reason || 'Review rejected by property manager',
          approvedBy: 'Property Manager'
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        await fetchHostawayReviews();
      } else {
        console.error('Failed to reject review:', data.error);
      }
    } catch (error) {
      console.error('Error rejecting review:', error);
    } finally {
      setApprovingReviews(prev => {
        const newSet = new Set(prev);
        newSet.delete(reviewId);
        return newSet;
      });
    }
  };
  const getUniqueListings = () => {
    const listings = reviews.map(review => ({
      id: review.listingId,
      name: review.listingName
    }))
    return Array.from(new Set(listings.map(l => l.id)))
      .map(id => listings.find(l => l.id === id)!)
  }

  const getUniqueChannels = () => {
    return Array.from(new Set(reviews.map(review => review.channel)))
  }

  const renderStars = (rating: number | null) => {
    if (rating === null) return null
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} 
      />
    ))
  }

  const getChannelColor = (channel: string) => {
    const colors: Record<string, string> = {
      'Airbnb': 'bg-pink-100 text-pink-800',
      'Booking.com': 'bg-blue-100 text-blue-800',
      'Vrbo': 'bg-green-100 text-green-800',
      'Unknown': 'bg-gray-100 text-gray-800'
    }
    return colors[channel] || colors['Unknown']
  }

  const getTypeColor = (type: string) => {
    return type === 'host-to-guest' 
      ? 'bg-purple-100 text-purple-800' 
      : 'bg-orange-100 text-orange-800'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <RefreshCw className="h-6 w-6 animate-spin mr-2" />
        <span>Loading Hostaway reviews...</span>
      </div>
    )
  }

  if (error) {
    return (
      <Card className="bg-card">
        <CardContent className="p-8">
          <div className="text-center">
            <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-card-foreground mb-2">Error Loading Reviews</h3>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={fetchHostawayReviews} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className={`space-y-6 ${className}`}>
      
      <Tabs defaultValue="reviews" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="reviews">Hostaway Reviews</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="channels">By Channel</TabsTrigger>
        </TabsList>

        <TabsContent value="reviews" className="space-y-6">
          {/* Filters */}
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Review Filters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search reviews..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select value={listingFilter} onValueChange={setListingFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Listings" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Listings</SelectItem>
                    {getUniqueListings().map((listing) => (
                      <SelectItem key={listing.id} value={listing.id}>
                        {listing.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={approvalStatus} onValueChange={setApprovalStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="All Approval Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>    
                <Select value={channelFilter} onValueChange={setChannelFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Channels" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Channels</SelectItem>
                    {getUniqueChannels().map((channel) => (
                      <SelectItem key={channel} value={channel}>
                        {channel}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="host-to-guest">Host to Guest</SelectItem>
                    <SelectItem value="guest-to-host">Guest to Host</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="7days">Last 7 Days</SelectItem>
                    <SelectItem value="30days">Last 30 Days</SelectItem>
                    <SelectItem value="90days">Last 90 Days</SelectItem>
                    <SelectItem value="1year">Last Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Reviews List */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredReviews.map((review) => (
              <Card key={review.id} className="bg-card">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>
                          {review.guestName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium text-card-foreground">{review.guestName}</h4>
                        <p className="text-sm text-muted-foreground">{review.listingName}</p>
                        <div className="flex items-center gap-2 mt-1">
                          {renderStars(review.rating)}
                          <span className="text-xs text-muted-foreground">
                            {review.submittedAt.toString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Badge className={getChannelColor(review.channel)}>
                        {review.channel}
                      </Badge>
                      <Badge className={getTypeColor(review.reviewType)}>
                        {review.reviewType === 'host-to-guest' ? 'Host→Guest' : 'Guest→Host'}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-card-foreground leading-relaxed">
                      {review.reviewText}
                    </p>

                    {/* Review Categories */}
                    {Object.entries(review.categories).length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(review.categories).map(([category, rating]) => (
                          rating && (
                            <Badge key={category} variant="outline" className="text-xs">
                              {category.replace(/_/g, ' ')}: {rating}/10
                            </Badge>
                          )
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-2 border-t border-border">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          ID: {review.id}
                        </Badge>
                        <Badge 
                          variant={review.status === 'published' ? 'default' : 'secondary'} 
                          className="text-xs"
                        >
                          {review.status}
                        </Badge>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <MessageSquare className="h-3 w-3 mr-1" />
                          Respond
                        </Button>
                        <Button size="sm" variant="outline">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          View in Hostaway
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {review.approvalStatus === 'pending' ? (
                      <>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleApproveReview(review.id)}
                          disabled={approvingReviews.has(review.id)}
                          className="text-green-600 hover:bg-green-50 bg-transparent"
                        >
                          {approvingReviews.has(review.id) ? (
                            <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                          ) : (
                            <CheckCircle className="h-3 w-3 mr-1" />
                          )}
                          Approve
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleRejectReview(review.id)}
                          disabled={approvingReviews.has(review.id)}
                          className="text-red-600 hover:bg-red-50 bg-transparent"
                        >
                          {approvingReviews.has(review.id) ? (
                            <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                          ) : (
                            <XCircle className="h-3 w-3 mr-1" />
                          )}
                          Reject
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button size="sm" variant="outline">
                          <MessageSquare className="h-3 w-3 mr-1" />
                          Respond
                        </Button>
                        <Button size="sm" variant="outline">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          View in Hostaway
                        </Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
              
            ))}
          </div>

          {filteredReviews.length === 0 && (
            <Card className="bg-card">
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">No reviews found matching your filters.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {/* Analytics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-card-foreground">Total Reviews</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-card-foreground">{reviews.length}</div>
              </CardContent>
            </Card>

            <Card className="bg-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-card-foreground">Avg Rating</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-card-foreground">
                  {reviews.length > 0 
                    ? (reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.filter(r => r.rating !== null).length).toFixed(1)
                    : '0.0'
                  }
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-card-foreground">Host→Guest</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-card-foreground">
                  {reviews.filter(r => r.reviewType === 'host-to-guest').length}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-card-foreground">Guest→Host</CardTitle>
                <EyeOff className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-card-foreground">
                  {reviews.filter(r => r.reviewType === 'guest-to-host').length}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Channel Distribution */}
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground">Reviews by Channel</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {getUniqueChannels().map(channel => {
                  const channelReviews = reviews.filter(r => r.channel === channel)
                  const percentage = (channelReviews.length / reviews.length) * 100
                  
                  return (
                    <div key={channel} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Badge className={getChannelColor(channel)}>
                          {channel}
                        </Badge>
                        <span className="text-sm text-card-foreground">
                          {channelReviews.length} reviews
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground w-12">
                          {percentage.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="channels" className="space-y-6">
          {getUniqueChannels().map(channel => {
            const channelReviews = reviews.filter(r => r.channel === channel)
            
            return (
              <Card key={channel} className="bg-card">
                <CardHeader>
                  <CardTitle className="text-card-foreground flex items-center gap-2">
                    <Badge className={getChannelColor(channel)}>
                      {channel}
                    </Badge>
                    <span>({channelReviews.length} reviews)</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {channelReviews.slice(0, 3).map(review => (
                      <div key={review.id} className="border border-border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="text-xs">
                                {review.guestName.split(" ").map(n => n[0]).join("").toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-sm text-card-foreground">{review.guestName}</p>
                              <p className="text-xs text-muted-foreground">{review.listingName}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            {renderStars(review.rating)}
                          </div>
                        </div>
                        <p className="text-sm text-card-foreground leading-relaxed">
                          {review.reviewText.length > 150 
                            ? `${review.reviewText.substring(0, 150)}...` 
                            : review.reviewText
                          }
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {review.submittedAt.toString()}
                        </p>
                      </div>
                    ))}
                    
                    {channelReviews.length > 3 && (
                      <Button variant="outline" className="w-full">
                        View All {channel} Reviews ({channelReviews.length})
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </TabsContent>
      </Tabs>
    </div>
  )
}