"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Star, MapPin, Calendar, Users, Wifi, Car, Coffee } from "lucide-react"

interface Property {
  id: string
  name: string
  category: "entire-home" | "private-room" | "shared-room"
  location: string
  rating: number
  reviews: number
  price: number
  occupancy: number
  revenue: number
  image: string
  amenities: string[]
  nextBooking: string
}

const mockProperties: Property[] = [
  {
    id: "1",
    name: "Sunset Villa",
    category: "entire-home",
    location: "Malibu, CA",
    rating: 4.9,
    reviews: 127,
    price: 320,
    occupancy: 95,
    revenue: 3240,
    image: "/luxury-villa-sunset-view.jpg",
    amenities: ["wifi", "parking", "pool"],
    nextBooking: "Dec 15, 2024",
  },
  {
    id: "2",
    name: "Ocean View Apartment",
    category: "entire-home",
    location: "Santa Monica, CA",
    rating: 4.8,
    reviews: 89,
    price: 250,
    occupancy: 92,
    revenue: 2890,
    image: "/modern-apartment-ocean-view.jpg",
    amenities: ["wifi", "gym", "balcony"],
    nextBooking: "Dec 12, 2024",
  },
  {
    id: "3",
    name: "Mountain Cabin Retreat",
    category: "entire-home",
    location: "Big Sur, CA",
    rating: 4.7,
    reviews: 156,
    price: 180,
    occupancy: 88,
    revenue: 2650,
    image: "/cozy-mountain-cabin-forest.jpg",
    amenities: ["wifi", "fireplace", "hiking"],
    nextBooking: "Dec 18, 2024",
  },
  {
    id: "4",
    name: "Downtown City Loft",
    category: "private-room",
    location: "Los Angeles, CA",
    rating: 4.6,
    reviews: 203,
    price: 120,
    occupancy: 85,
    revenue: 2420,
    image: "/modern-city-loft-downtown.jpg",
    amenities: ["wifi", "gym", "rooftop"],
    nextBooking: "Dec 10, 2024",
  },
]

export function PropertyPortfolio() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [ratingFilter, setRatingFilter] = useState("all")

  const filteredProperties = mockProperties.filter((property) => {
    const matchesSearch =
      property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || property.category === categoryFilter

    const matchesRating =
      ratingFilter === "all" ||
      (ratingFilter === "4.5+" && property.rating >= 4.5) ||
      (ratingFilter === "4.0+" && property.rating >= 4.0)

    return matchesSearch && matchesCategory && matchesRating
  })


  const getCategoryLabel = (category: string) => {
    const labels = {
      "entire-home": "Entire Home",
      "private-room": "Private Room",
      "shared-room": "Shared Room",
    }
    return labels[category as keyof typeof labels] || category
  }

  return (
    <div className="space-y-6">
      {/* Filters and Search */}
      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="text-card-foreground">Property Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search properties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="entire-home">Entire Home</SelectItem>
                <SelectItem value="private-room">Private Room</SelectItem>
                <SelectItem value="shared-room">Shared Room</SelectItem>
              </SelectContent>
            </Select>


            <Select value={ratingFilter} onValueChange={setRatingFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ratings</SelectItem>
                <SelectItem value="4.5+">4.5+ Stars</SelectItem>
                <SelectItem value="4.0+">4.0+ Stars</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProperties.map((property) => (
          <Card key={property.id} className="bg-card overflow-hidden">
            <div className="relative">
              <img
                src={property.image || "/placeholder.svg"}
                alt={property.name}
                className="w-full h-48 object-cover"
              />
            </div>

            <CardContent className="p-4">
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-card-foreground">{property.name}</h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {property.location}
                  </p>
                  <p className="text-xs text-muted-foreground">{getCategoryLabel(property.category)}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{property.rating}</span>
                    <span className="text-xs text-muted-foreground">({property.reviews})</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-card-foreground">${property.price}/night</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Occupancy</p>
                    <p className="font-medium text-card-foreground">{property.occupancy}%</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Revenue</p>
                    <p className="font-medium text-primary">${property.revenue}</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground mb-1">Next Booking</p>
                  <p className="text-sm font-medium text-card-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {property.nextBooking}
                  </p>
                </div>

                <div className="flex gap-1 flex-wrap">
                  {property.amenities.slice(0, 3).map((amenity) => {
                    const icons = {
                      wifi: Wifi,
                      parking: Car,
                      pool: Users,
                      gym: Users,
                      fireplace: Coffee,
                      balcony: Users,
                      hiking: Users,
                      rooftop: Users,
                    }
                    const Icon = icons[amenity as keyof typeof icons] || Coffee
                    return (
                      <Badge key={amenity} variant="outline" className="text-xs flex items-center gap-1">
                        <Icon className="h-3 w-3" />
                        {amenity}
                      </Badge>
                    )
                  })}
                </div>

                <div className="flex gap-2 pt-2">
                  <Button size="sm" className="flex-1">
                    View Details
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                    Edit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProperties.length === 0 && (
        <Card className="bg-card">
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">No properties match your current filters.</p>
            <Button
              variant="outline"
              className="mt-4 bg-transparent"
              onClick={() => {
                setSearchTerm("")
                setCategoryFilter("all")
                setRatingFilter("all")
              }}
            >
              Clear All Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
