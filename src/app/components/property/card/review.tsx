import { useState } from "react";

interface ReviewsListProps {
    reviews: ReviewCardProps[];
    layout: "grid" | "list";
    className: string;
}

const StarIcon = () => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 32 32" 
      className="w-2.5 h-2.5 fill-current"
      aria-hidden="true"
    >
      <path 
        fillRule="evenodd" 
        d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"
      />
    </svg>
  );

export interface ReviewCardProps {
    title: string;
    id: string;
    userName: string;
    userLocation: string;
    userImage: string | null;
    rating: number;
    date: string | null;
    stayDuration: string | null;
    content: string;
}
  
const ReviewCard = ({ title, id, userName, userLocation, userImage, rating, date, stayDuration, content }: ReviewCardProps) => {
const [isExpanded, setIsExpanded] = useState(false);

const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
};

const renderStars = (rating = 5) => {
    return Array.from({ length: rating }, (_, i) => (
    <StarIcon key={i} />
    ));
};
debugger;
return (
    <div className="flex flex-col gap-4 p-4 rounded-lg bg-white h-fit">
    {/* Header with user info */}
    <div className="flex items-start gap-4">
        <div className="flex-1">
        <div className="flex items-center justify-between mb-2">
            <div>
            <h3 className="text-base font-semibold text-gray-900" tabIndex={-1}>
                {userName}
            </h3>
            <div className="text-sm text-gray-600">
                {userLocation}
            </div>
            </div>
        </div>
        </div>
        
        {/* Profile Image */}
        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
        {userImage ? (
            <img 
            src={userImage} 
            alt={userName}
            className="w-full h-full object-cover"
            />
        ) : (
            <div className="w-full h-full bg-gray-300"></div>
        )}
        </div>
    </div>

    {/* Rating and metadata */}
    <div className="flex items-center gap-2 text-sm text-gray-600">
        <div className="flex items-center gap-1">
        <span className="sr-only">Rating, {rating} stars</span>
        <div className="flex gap-0.5 text-black" aria-hidden="true">
            {renderStars(rating)}
        </div>
        </div>
        
        <span aria-hidden="true">·</span>
        <span>{date}</span>
        
        {stayDuration && (
        <>
            <span aria-hidden="true">·</span>
            <span>{stayDuration}</span>
        </>
        )}
    </div>

    {/* Review content */}
    <div>
        <div 
        className={`text-gray-800 leading-relaxed ${
            !isExpanded ? 'line-clamp-3' : ''
        }`}
        style={!isExpanded ? {
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
        } : {}}
        >
        {content}
        </div>
        
        {content.length > 200 && (
        <button
            onClick={toggleExpanded}
            className="mt-2 text-sm font-medium text-gray-900 underline hover:no-underline focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 rounded"
            aria-describedby={`review_${id}_title`}
        >
            {isExpanded ? 'Show less' : 'Show more'}
        </button>
        )}
    </div>
    </div>
);
};

const ReviewsList = ({ 
    reviews = [],
    layout = "grid",
    className = ""
  }: ReviewsListProps) => {
    return (
      <div className={`bg-transparent ${className}`} role="list">
        <div className={layout === "grid" 
          ? "grid grid-cols-1 md:grid-cols-2 gap-6" 
          : "flex flex-col"
        }>
          {reviews.map((review) => (
            <div key={review.id} role="listitem">
              <ReviewCard 
                title={review.title} 
                id={review.id} 
                userName={review.userName} 
                userLocation={review.userLocation} 
                userImage={review.userImage || null} 
                rating={review.rating} 
                date={review.date || null} 
                stayDuration={review.stayDuration || null} 
                content={review.content} 
              />
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default ReviewsList;