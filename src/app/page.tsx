'use client';

import { useState } from 'react';
import { PropertiesListing } from './components/property/listing';
import PropertyPage from './(pages)/property/page';
import { Property, PropertyDetail } from '@/lib/types/hostaway';

export default function Home() {
    const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

    const handlePropertySelect = (property: Property) => {
        setSelectedProperty(property);
    };

    const handleBackToListing = () => {
        setSelectedProperty(null);
    };

    const generatePropertyDetails = (property: Property): PropertyDetail => {
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
                    { stars: 5, percentage: Math.round((property.reviewCount.approved / property.totalReviews) * 100), count: property.reviewCount.approved.toString() },
                    { stars: 4, percentage: Math.round((property.reviewCount.pending / property.totalReviews) * 100), count: property.reviewCount.pending.toString() },
                    { stars: 3, percentage: 5, count: "1" },
                    { stars: 2, percentage: 2, count: "1" },
                    { stars: 1, percentage: Math.round((property.reviewCount.rejected / property.totalReviews) * 100), count: property.reviewCount.rejected.toString() }
                ]
            },
            categories: Object.entries(property.categories).map(([name, rating]) => ({
                name: name.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                rating: rating || 0,
                description: `Rated ${(rating || 0).toFixed(1)} out of 5 stars for ${name.replace(/_/g, ' ')}`,
                iconType: name.toLowerCase()
            }))
        };
    };

    if (selectedProperty) {
        return (
            <PropertyPage 
                propertyDetail={generatePropertyDetails(selectedProperty)} 
                onBack={handleBackToListing}
            />
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <PropertiesListing onPropertySelect={handlePropertySelect} />
            </div>
        </div>
    );
}