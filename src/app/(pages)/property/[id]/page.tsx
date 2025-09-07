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
                const result = await PropertiesAPI.fetchPropertyById(params.id as string);
                
                if (result.error) {
                    setError(result.error);
                    return;
                }
                
                if (result.property) {
                    const propertyDetailData = PropertiesAPI.generatePropertyDetails(result.property);
                    setPropertyDetail(propertyDetailData);
                }
            } catch (err) {
                setError('Failed to load property');
            } finally {
                setLoading(false);
            }
        }
        
        loadProperty();
    }, [params.id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!propertyDetail) return <div>Property not found</div>;

    return (
        <div className="min-h-screen bg-gray-50">
            <PropertyComponent propertyDetail={propertyDetail} />
        </div>
    );
}