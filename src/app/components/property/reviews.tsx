import React from 'react';
import { 
  CleanlinessIcon, 
  AccuracyIcon, 
  CheckInIcon, 
  CommunicationIcon, 
  LocationIcon, 
  ValueIcon 
} from './icons';

interface ReviewsSectionProps {
  overallRating: {
    title: string;
    ratings: { stars: number; percentage: number; count: string }[];
  };
  categories: { 
    name: string; 
    rating: number; 
    description: string; 
    iconType: 'cleanliness' | 'accuracy' | 'checkin' | 'communication' | 'location' | 'value';
  }[];
  className: string;
}

const ReviewsSection = ({ 
  overallRating = {
    title: "Overall rating",
    ratings: [
      { stars: 5, percentage: 98, count: "98% of reviews" },
      { stars: 4, percentage: 2, count: "2% of reviews" },
      { stars: 3, percentage: 0, count: "0% of reviews" },
      { stars: 2, percentage: 0, count: "0% of reviews" },
      { stars: 1, percentage: 0, count: "0% of reviews" }
    ]
  },
  categories = [
    {
      name: "Cleanliness",
      rating: 5.0,
      description: "Rated 5.0 out of 5 stars for cleanliness",
      iconType: "cleanliness" as const
    },
    {
      name: "Accuracy",
      rating: 5.0,
      description: "Rated 5.0 out of 5 stars for accuracy",
      iconType: "accuracy" as const
    },
    {
      name: "Check-in",
      rating: 5.0,
      description: "Rated 5.0 out of 5 stars for check-in",
      iconType: "checkin" as const
    },
    {
      name: "Communication",
      rating: 5.0,
      description: "Rated 5.0 out of 5 stars for communication",
      iconType: "communication" as const
    },
    {
      name: "Location",
      rating: 5.0,
      description: "Rated 5.0 out of 5 stars for location",
      iconType: "location" as const
    },
    {
      name: "Value",
      rating: 5.0,
      description: "Rated 5.0 out of 5 stars for value",
      iconType: "value" as const
    }
  ],
  className = ""
}: ReviewsSectionProps) => {
  
  const renderIcon = (iconType: string) => {
    const iconClassName = "w-6 h-6";
    
    switch (iconType) {
      case 'cleanliness':
        return <CleanlinessIcon className={iconClassName} />;
      case 'accuracy':
        return <AccuracyIcon className={iconClassName} />;
      case 'checkin':
        return <CheckInIcon className={iconClassName} />;
      case 'communication':
        return <CommunicationIcon className={iconClassName} />;
      case 'location':
        return <LocationIcon className={iconClassName} />;
      case 'value':
        return <ValueIcon className={iconClassName} />;
      default:
        return null;
    }
  };

  return (
    <div className={`grid grid-flow-col auto-cols-fr gap-4 overflow-x-auto scrollbar-none touch-pan-x pb-4 ${className}`}>
      {/* Overall Rating Section - Compact Height (~100px) */}
      <div className="min-w-0 h-[132px]">
        <div className="p-6 h-full flex flex-col">
          <h3 className="text-xs font-semibold text-gray-900 mb-1">
            {overallRating.title}
          </h3>
          
          <ol className="flex-1 space-y-0.5">
            {overallRating.ratings.map((rating) => (
              <li key={rating.stars} className="flex items-center gap-1.5">
                {/* Screen reader text */}
                <span className="sr-only">
                  {rating.stars} stars, {rating.count}
                </span>
                
                {/* Visual rating display */}
                <div className="flex items-center gap-1.5 w-full" aria-hidden="true">
                  <div className="text-xs font-medium text-gray-700 w-2 flex-shrink-0">
                    {rating.stars}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="w-full bg-gray-200 rounded-full h-0.5">
                      <div 
                        className="bg-gray-900 h-0.5 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${rating.percentage}%`, 
                          minWidth: rating.percentage > 0 ? '2px' : '0px' 
                        }}
                      />
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Category Ratings */}
      {categories.map((category, index) => (
        <div key={index} className="min-w-0 h-full border-r border-[#DDDDDD] last:border-r-0">
          <div className="p-4 flex flex-col h-full justify-center items-center">
            {/* Screen reader heading */}
            <h3 className="sr-only">
              {category.description}
            </h3>
            
            {/* Visual content */}
            <div className="flex items-center justify-between mb-2 flex-col justify-center items-center" aria-hidden="true">
              <div className="font-medium text-gray-900 text-sm">
                {category.name}
              </div>
              <div className="text-sm font-semibold text-gray-900">
                {category.rating.toFixed(1)}
              </div>
            </div>
            
            {/* Icon */}
            <div className="text-gray-600 mt-auto justify-center items-center">
              {renderIcon(category.iconType)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewsSection;