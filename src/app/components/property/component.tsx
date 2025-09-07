'use client';
import Header from "@/app/components/common/header";
import PropertyImageGallery from "@/app/components/property/images_galery";
import PropertyHeader from "@/app/components/property/header";
import PropertyAboutCard from "@/app/components/property/card/about";
import AmenitiesCard from "@/app/components/property/card/amenties";
import StayPoliciesCard from "@/app/components/property/card/stay_policies";
import BookingWidget from "@/app/components/property/booking";
import Image from "next/image";
import ReviewsSection from "@/app/components/property/reviews";
import ReviewsList from "@/app/components/property/card/review";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { PropertyDetail } from "@/lib/types/hostaway";

interface PropertyComponentProps {
    propertyDetail: PropertyDetail;
    onBack?: () => void;
}

export default function PropertyComponent({ propertyDetail, onBack }: PropertyComponentProps) {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
                {onBack && (
                    <div className="bg-white border-b border-gray-200">
                        <div className="container mx-auto max-w-7xl px-3 md:px-4 py-4">
                            <Button 
                                onClick={onBack}
                                variant="outline" 
                                className="flex items-center gap-2"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Back to Properties
                            </Button>
                        </div>
                    </div>
                )}
                
                <div className="min-h-screen flex flex-col bg-[rgb(255, 253, 246)]">
                 <div className="pt-24"></div>
                 <main className="flex-grow">
                    <div className="container mx-auto max-w-7xl px-3 md:px-4 border-b border-gray-300 pb-8">
                      <div className="py-2 md:py-4"></div>
                      <PropertyImageGallery/>
                      <PropertyHeader 
                        title={propertyDetail.title}
                        amenities={[
                          { icon: "users", count: propertyDetail.amenities[0].count, label: "guests", alt: "Guests" },
                          { icon: "bed", count: propertyDetail.amenities[1].count, label: "bedrooms", alt: "Bedrooms" },
                          { icon: "bath", count: propertyDetail.amenities[2].count, label: "bathrooms", alt: "Bathrooms" },
                          { icon: "house", count: propertyDetail.amenities[3].count, label: "beds", alt: "Beds" }
                        ]}
                        onAmenityClick={propertyDetail.onAmenityClick}
                      />
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 ">
                        <div className="lg:col-span-2">
                          <PropertyAboutCard/>
                          <AmenitiesCard/>
                          <StayPoliciesCard/>
                        </div>
                        <div className="lg:col-span-1">
                          <BookingWidget/>
                        </div>
                      </div>
                    </div>
                  <div className="relative container mt-12 mx-auto max-w-7xl px-3 md:px-4 border-b border-gray-300 pb-8 text-card-foreground bg-white dark:bg-gray-800 border-0 shadow-lg rounded-2xl ">
                    <div className="pt-12 pb-12 ">
                      <div className="max-w ">
                        <section>
                          <div className="mb-16 items-center flex flex-col ">
                            <div className="flex flex-row align-items: flex-start;  gap-2 pb-4">
                              <div className="flex flex-row items-center justify-center gap-2 h-[87px] bg-white">
                                <Image
                                  src="/review.png" 
                                  height={87}
                                  width={87}
                                  className="object-contain"
                                  alt="Review"
                                />
                                  <div className="mt-[-64px]  leading-[6.25rem] text-[6.25rem] text-[#284E4C] font-bold">
                                    4.9
                                  </div>
                                  <Image
                                    src="/review.png" 
                                    height={87}
                                    width={87}
                                    className="object-contain  rotate-y-180"
                                    alt="Review"
                                  />
                              </div>
                            
                            </div>
                            <div className="text-2xl font-bold text-[#284E4C] pb-4">
                                Guest Favorites
                            </div>
                            <div className="text-sm text-[#5C5C5A]">
                                Guests love staying at this property for its spaciousness, modern amenities, and proximity to the city center.
                            </div>
                          </div>
                          <div className="w-[90%] border-b border-[#DDDDDD] mx-auto pb-[40px] mb-[40px] ">
                            <div className="relative">
                                <ReviewsSection overallRating={propertyDetail.overallRating} categories={propertyDetail.categories} className="grid-cols-1 md:grid-cols-2 gap-6" />
                            </div>
                          </div>

                          <div className="w-[90%] border-b border-[#DDDDDD] mx-auto pb-[40px] mb-[40px] flex flex-row gap-4">
                            <ReviewsList reviews={propertyDetail.reviews} layout="grid" className="grid-cols-1 md:grid-cols-2 gap-6" />

                          </div>

                        </section>
                      </div>
                    </div>
                  </div>
                 </main>
                </div>
            </main>
        </div>
    );
}
