"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
    Star, MapPin, Home, 
    Eye,  CheckCircle, XCircle, 
    Calendar 
} from "lucide-react"
import { Property } from "@/lib/types/hostaway"
import Image from "next/image"
import Header from "@/app/components/common/header"
import { useRouter } from "next/navigation"

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

export function PropertiesListing() {
    const [properties, setProperties] = useState<Property[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()
    useEffect(() => {
        fetchProperties()
    }, [])

    const fetchProperties = async () => {
        try {
            setLoading(true)
            const response = await fetch('/api/reviews/hostaway')
            const data = await response.json()
            
            if (data.success) {
                const extractedProperties = extractPropertiesFromReviews(data.data.reviews)
                setProperties(extractedProperties)
            } else {
                setError(data.error || 'Failed to fetch properties')
            }
        } catch (err) {
            setError('Failed to connect to API')
        } finally {
            setLoading(false)
        }
    }

    const extractPropertiesFromReviews = (reviews: RawReview[]): Property[] => {
        const propertyMap = new Map<string, Property>()

        reviews.forEach(review => {
            const listingId = review.listingId
            const listingName = review.listingName

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
                })
            }

            const property = propertyMap.get(listingId)!

            if (review.rating !== null && review.rating !== undefined) {
                const currentTotal = property.averageRating * property.totalReviews
                property.totalReviews++
                property.averageRating = (currentTotal + review.rating) / property.totalReviews
            } else {
                property.totalReviews++
            }

            if (review.approvalStatus === 'approved') property.reviewCount.approved++
            else if (review.approvalStatus === 'pending') property.reviewCount.pending++
            else if (review.approvalStatus === 'rejected') property.reviewCount.rejected++

            const channel = review.channel || 'unknown'
            if (!property.channels.includes(channel)) {
                property.channels.push(channel)
            }

            const reviewDate = new Date(review.submittedAt)
            if (reviewDate > property.latestReview) {
                property.latestReview = reviewDate
            }

            if (review.reviewCategory && Array.isArray(review.reviewCategory)) {
                review.reviewCategory.forEach(({ category, rating }) => {
                    if (rating !== undefined && rating !== null && typeof rating === 'number') {
                        const currentRating = property.categories[category]
                        
                        if (currentRating === undefined) {
                            property.categories[category] = rating
                        } else {
                            const reviewsWithThisCategory = Object.keys(property.categories).length
                            const currentTotal = currentRating * (reviewsWithThisCategory - 1)
                            property.categories[category] = (currentTotal + rating) / reviewsWithThisCategory
                        }
                    }
                })
            }
        })

        return Array.from(propertyMap.values())
    }

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star 
                key={i} 
                className={`h-4 w-4 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} 
            />
        ))
    }

    const getPropertyImage = (propertyName: string) => {
        const imageMap: Record<string, string> = {
            "Sunset Villa": "/luxury-villa-sunset-view.jpg",
            "Ocean View Apartment": "/modern-apartment-ocean-view.jpg",
            "Mountain Cabin Retreat": "/cozy-mountain-cabin-forest.jpg",
            "Downtown City Loft": "/modern-city-loft-downtown.jpg"
        }
        return imageMap[propertyName] || "/modern-city-loft-downtown.jpg"
    }

    const getPropertyLocation = (propertyName: string) => {
        const locationMap: Record<string, string> = {
            "Sunset Villa": "Malibu, CA",
            "Ocean View Apartment": "Santa Monica, CA", 
            "Mountain Cabin Retreat": "Big Sur, CA",
            "Downtown City Loft": "Los Angeles, CA"
        }
        return locationMap[propertyName] || "Premium Location"
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center p-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                <span className="ml-3 text-lg">Loading properties...</span>
            </div>
        )
    }

    if (error) {
        return (
            <Card className="bg-card">
                <CardContent className="p-8">
                    <div className="text-center">
                        <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-card-foreground mb-2">Error Loading Properties</h3>
                        <p className="text-muted-foreground mb-4">{error}</p>
                        <Button onClick={fetchProperties} variant="outline">
                            Try Again
                        </Button>
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <div className={`space-y-8 mt-24  bg-[rgb(255, 253, 246)]`}>
            <Header />

            <div className="container mx-auto px-4">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-[#333333] mb-2">Properties</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {properties.map((property) => (
                        <Card key={property.id} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                            <div className="relative h-48 overflow-hidden">
                                <Image
                                    src={getPropertyImage(property.name)}
                                    alt={property.name}
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute top-4 right-4">
                                    <Badge className="bg-white/90 text-gray-800">
                                        {property.channels.length} {property.channels.length === 1 ? 'Channel' : 'Channels'}
                                    </Badge>
                                </div>
                            </div>

                            <CardHeader className="pb-3">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <CardTitle className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
                                            {property.name}
                                        </CardTitle>
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <MapPin className="h-4 w-4" />
                                            <span>{getPropertyLocation(property.name)}</span>
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="flex">
                                            {renderStars(Math.round(property.averageRating))}
                                        </div>
                                        <span className="text-sm font-medium text-gray-900">
                                            {property.averageRating.toFixed(1)}
                                        </span>
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        {property.totalReviews} {property.totalReviews === 1 ? 'review' : 'reviews'}
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-2 text-center">
                                    <div className="bg-green-50 rounded-lg p-2">
                                        <CheckCircle className="h-4 w-4 text-green-600 mx-auto mb-1" />
                                        <div className="text-xs font-medium text-green-700">
                                            {property.reviewCount.approved}
                                        </div>
                                        <div className="text-xs text-green-600">Approved</div>
                                    </div>
                                    <div className="bg-yellow-50 rounded-lg p-2">
                                        <Eye className="h-4 w-4 text-yellow-600 mx-auto mb-1" />
                                        <div className="text-xs font-medium text-yellow-700">
                                            {property.reviewCount.pending}
                                        </div>
                                        <div className="text-xs text-yellow-600">Pending</div>
                                    </div>
                                    <div className="bg-red-50 rounded-lg p-2">
                                        <XCircle className="h-4 w-4 text-red-600 mx-auto mb-1" />
                                        <div className="text-xs font-medium text-red-700">
                                            {property.reviewCount.rejected}
                                        </div>
                                        <div className="text-xs text-red-600">Rejected</div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-1">
                                    {property.channels.map((channel) => (
                                        <Badge key={channel} variant="outline" className="text-xs">
                                            {channel}
                                        </Badge>
                                    ))}
                                </div>

                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Calendar className="h-4 w-4" />
                                    <span>Last reviewed {property.latestReview.toLocaleDateString()}</span>
                                </div>

                                {Object.keys(property.categories).length > 0 && (
                                    <div className="border-t pt-3">
                                        <div className="text-sm font-medium text-gray-900 mb-2">Top Categories</div>
                                        <div className="flex flex-wrap gap-1">
                                            {Object.entries(property.categories)
                                                .filter(([, rating]) => rating !== undefined && rating !== null)
                                                .sort(([, a], [, b]) => (b || 0) - (a || 0))
                                                .slice(0, 3)
                                                .map(([category, rating]) => (
                                                    <Badge key={category} variant="secondary" className="text-xs">
                                                        {category.replace(/_/g, ' ')}: {rating?.toFixed(1) || '0'}/10
                                                    </Badge>
                                                ))}
                                        </div>
                                    </div>
                                )}

                                <Button 
                                    onClick={() => router.push(`/property/${property.id}`)}
                                    className="w-full bg-[#284E4C] hover:bg-[#284E4C]/80"
                                >
                                    <Eye className="h-4 w-4 mr-2" />
                                    View Property Details
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {properties.length === 0 && (
                    <Card className="bg-card">
                        <CardContent className="p-12 text-center">
                            <Home className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-card-foreground mb-2">No Properties Found</h3>
                            <p className="text-muted-foreground">No properties are currently available.</p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
}