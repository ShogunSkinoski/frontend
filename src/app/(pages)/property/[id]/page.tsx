'use client';

import PropertyComponent from "@/app/components/property/component";
import { PropertiesAPI } from "@/lib/api/properties";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PropertyDetail } from "@/lib/types/hostaway";

export default function PropertyPage() {
    const params = useParams();
    const [propertyDetail, setPropertyDetail] = useState<PropertyDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadProperty() {
            try {
                setLoading(true);
                const result = await PropertiesAPI.fetchPropertyById(params.id as string);
                
                if (result.error) {
                    setError(result.error);
                    return;
                }
                
                if (result.property) {
                    const propertyDetailData = await PropertiesAPI.generatePropertyDetails(result.property);
                    setPropertyDetail(propertyDetailData);
                }
            } catch (err) {
                setError('Failed to load property');
                console.error('Property loading error:', err);
            } finally {
                setLoading(false);
            }
        }
        
        loadProperty();
    }, [params.id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#284E4C] mx-auto mb-4"></div>
                    <p className="text-[#5C5C5A]">Loading property details...</p>
                </div>
            </div>
        );
    }
    
    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
                    <p className="text-[#5C5C5A] mb-4">{error}</p>
                    <button 
                        onClick={() => window.location.reload()} 
                        className="bg-[#284E4C] text-white px-4 py-2 rounded-md hover:bg-[#284E4C]/90"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }
    
    if (!propertyDetail) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-[#333333] mb-2">Property Not Found</h2>
                    <p className="text-[#5C5C5A]">The requested property could not be found.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <PropertyComponent propertyDetail={propertyDetail} />
        </div>
    );
}