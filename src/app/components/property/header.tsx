'use client';

import { Users, Bed, Bath, House } from 'lucide-react';

interface PropertyHeaderProps {
  title?: string;
  amenities?: any[];
  onAmenityClick?: (amenity: any, index: any) => void;
}

const PropertyHeader = ({ 
  title = "Spacious 4 Bed Flat near King's Road",
  amenities = [
    {
      icon: "users",
      count: 10,
      label: "guests",
      alt: "Guests"
    },
    {
      icon: "bed",
      count: 4,
      label: "bedrooms", 
      alt: "Bedrooms"
    },
    {
      icon: "bath",
      count: 1,
      label: "bathrooms",
      alt: "Bathrooms"
    },
    {
      icon: "house",
      count: 6,
      label: "beds",
      alt: "Beds"
    }
  ],
  onAmenityClick
}: PropertyHeaderProps) => {
  const getIcon = (iconName: any) => {
    const iconProps = { className: "h-5 w-5 text-[#284E4C]" };
    switch (iconName) {
      case 'users': return <Users {...iconProps} />;
      case 'bed': return <Bed {...iconProps} />;
      case 'bath': return <Bath {...iconProps} />;
      case 'house': return <House {...iconProps} />;
      default: return <Users {...iconProps} />;
    }
  };

  const getDesktopIcon = (iconName: any) => {
    const iconProps = { className: "h-5 w-5 text-[#5C5C5A]" };
    switch (iconName) {
      case 'users': return <Users {...iconProps} />;
      case 'bed': return <Bed {...iconProps} />;
      case 'bath': return <Bath {...iconProps} />;
      case 'house': return <House {...iconProps} />;
      default: return <Users {...iconProps} />;
    }
  };

  return (
    <div className="mb-8 md:mb-12">
      {/* Mobile Layout */}
      <div className="md:hidden space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold text-[#333333] leading-tight mb-2">
              <span>{title}</span>
            </h1>
          </div>
        </div>
        
        <div 
          className="grid grid-cols-2 gap-4 rounded-2xl p-4" 
          style={{ backgroundColor: 'rgb(255, 253, 246)' }}
        >
          {amenities.map((amenity, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="p-2 rounded-xl shadow-sm">
                {getIcon(amenity.icon)}
              </div>
              <div>
                <span className="font-semibold text-[#333333] block">{amenity.count}</span>
                <span className="text-sm text-[#5C5C5A]">
                  <span>{amenity.label}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block">
        <h1 className="text-3xl font-bold mb-6 text-[#333333]">
          <span>{title}</span>
        </h1>
        
        <div className="flex items-center gap-8 border-b border-gray-200 pb-8">
          {amenities.map((amenity, index) => (
            <button 
              key={index}
              data-state="closed"
              onClick={() => onAmenityClick?.(amenity, index)}
            >
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-full">
                  {getDesktopIcon(amenity.icon)}
                </div>
                <div className="text-sm">
                  <span className="font-medium text-[#333333]">{amenity.count}</span>
                  <span className="text-[#5C5C5A] block">
                    <span>{amenity.label}</span>
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyHeader;