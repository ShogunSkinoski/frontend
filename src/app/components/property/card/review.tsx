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
    reviews = [
      {
        id: '1478965481505668097',
        title: 'Marybeth',
        userName: 'Marybeth',
        userLocation: 'Wyckoff, New Jersey',
        userImage: null,
        rating: 5,
        date: 'August 2025',
        stayDuration: 'Stayed a few nights',
        content: 'I have nothing but positive things to say about the place and Estelle. It was in a beautiful location she was warm and welcoming and you felt like you had made a friend by the time you left. I would highly recommend this place and Estelle. If I am so lucky when I come back to Paris to stay there I would be delighted.'
      },
      {
        id: '1476783982468482008',
        title: 'Lenore',
        userName: 'Lenore',
        userLocation: 'California, United States',
        userImage: 'https://a0.muscache.com/im/pictures/user/0bec7bb7-919f-409e-b5a0-db89a702cd02.jpg?im_w=240',
        rating: 5,
        date: 'July 2025',
        stayDuration: 'Stayed a few nights',
        content: 'Estelle\'s place offers an incredible opportunity to explore Paris for the solo traveler. It is central & walkable, with several Michelin recommended restaurants within a few blocks-- great for foodies! By far the most outstanding resource is Estelle, herself, with an international perspective, great local tips and a warm, welcoming demeanor, she is a true gem!'
      },
      {
        id: '1466559528224926914',
        title: 'Vivien',
        userName: 'Vivien',
        userLocation: '14 years on Airbnb',
        userImage: 'https://a0.muscache.com/im/users/1616547/profile_pic/1326793893/original.jpg?im_w=240',
        rating: 5,
        date: 'July 2025',
        stayDuration: 'Stayed a few nights',
        content: 'I had an absolutely wonderful time at Estelle\'s place. She is incredibly friendly and helpful with recommendations. She would go and buy me Pain au chocolat and apple pies in the morning. Would cut up fruit and serve homemade coffee as well. Her and her place are a delight and the area she lives in is incredible as well.'
      },
      {
        id: '1464466917038567683',
        title: 'Courtney',
        userName: 'Courtney',
        userLocation: 'San Diego, California',
        userImage: 'https://a0.muscache.com/im/pictures/user/User/original/0c016758-3eb1-4008-95f2-945e9e167678.jpeg?im_w=240',
        rating: 5,
        date: 'July 2025',
        stayDuration: 'Stayed a few nights',
        content: 'This is the most perfect place to stay for anyone traveling to Paris. Estelle is the most amazing host. She made me feel right at home. She took the time to tell me about the neighborhood and provided amazing recommendations. It\'s the perfect location, walkable to some of the best Paris has to offer. I will definitely be coming back to stay with Estelle!'
      },
      {
        id: '1501415683854775119',
        title: 'Belinda',
        userName: 'Belinda',
        userLocation: '9 years on Airbnb',
        userImage: 'https://a0.muscache.com/im/pictures/user/dde8e54b-2f77-47ce-b223-14e4721861af.jpg?im_w=240',
        rating: 5,
        date: '5 days ago',
        stayDuration: 'Stayed a few nights',
        content: 'I loved staying at Estelle\'s place. She is such a warm and interesting person. I loved our chats. Her apartment has loads of character. It\'s very conveniently located but also very quiet. Enjoyed my stay immensely and found Estelle to be a very generous and thoughtful host.'
      },
      {
        id: '1486853202618856980',
        title: 'Alexandra',
        userName: 'Alexandra',
        userLocation: 'New York, New York',
        userImage: 'https://a0.muscache.com/im/pictures/user/ca7d3475-ec01-43f6-b2d2-bfb32ef21eae.jpg?im_w=240',
        rating: 5,
        date: '3 weeks ago',
        stayDuration: 'Stayed a few nights',
        content: 'Estelle was a lovely and welcoming host! The room was lovely, bed was comfortable and I woke up to the best little breakfasts! Overall a very cute spot, centrally located and with a wonderful host. If you\'re traveling solo, Estelle\'s place is a delight :)'
      }
    ],
    layout = "grid", // "list" or "grid"
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