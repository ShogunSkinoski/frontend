import { useState } from 'react';

const PropertyAboutCard = ({ 
  title = "About this property",
  description = "I’m excited to welcome you to this charming apartment in Chelsea! It has four spacious bedrooms, each with a double bed, perfect for up to eight guests. The living room includes 2 extra single beds for two more guest. There’s one bathroom, a fully equipped kitchen, and a lovely balcony to relax on. Located in the heart of Chelsea, you'll be close to shops, restaurants, and transport links, making it the perfect base for exploring London. I’m always happy to assist during your stay! This spacious and stylish apartment is the perfect home away from home. It has four comfortable bedrooms, each with a double bed for two guests. The large living room also includes an extra single beds, perfect for two more guests. You’ll find a modern bathroom and a fully equipped kitchen with top-notch appliances, ideal for preparing meals. The balcony is a great spot to relax and enjoy the view. For added comfort, all duvets and pillows are hypoallergenic, and the bed linens are 100% cotton. The apartment also offers high-speed WiFi to keep you connected. Decorated to the highest standards, this apartment combines style, comfort, and convenience. Whether you're here for business or leisure, you’ll enjoy a relaxing and enjoyable stay. Let me know if you need anything—I'm always happy to help! I'm here to ensure your experience is exceptional, so feel free to contact me for anything you might need! To complete your check-in, I’ll need to see a valid ID and have you agree to our terms and conditions. This helps maintain a safe and friendly atmosphere for everyone, and I greatly appreciate your collaboration. Chelsea is one of my favorite areas in London, and I’m sure you’ll fall in love with it too! It’s a neighborhood that effortlessly combines elegance with a lively atmosphere, making it a wonderful place to explore. Whether you’re wandering the charming streets or relaxing in one of its beautiful parks, Chelsea has something for everyone. Here are a few things I love about it: Stunning Streets & Architecture: Chelsea is known for its picturesque streets lined with beautiful townhouses, flower-filled balconies, and tree-lined avenues. It’s a photographer’s dream! World-Class Shopping: King's Road is packed with high-end boutiques, designer shops, and unique stores. Whether you're window-shopping or looking to splurge, there’s no shortage of options. Galleries & Culture: The area is home to a number of fantastic art galleries, including the Saatchi Gallery, which is perfect for art lovers. Chelsea also has a rich cultural scene, with plenty of theatre, music, and events. Charming Cafés & Restaurants: From chic cafés to Michelin-starred restaurants, Chelsea has an amazing food scene. I love grabbing a coffee at one of the local cafés or enjoying a meal at a cozy restaurant. Parks & Green Spaces: The neighborhood is also close to some of London's most beautiful parks, including the stunning Chelsea Physic Garden, perfect for a relaxing afternoon. Fantastic Transport Links: Chelsea is well-connected by public transport, with easy access to the Underground and bus routes, making it simple to explore the rest of London. Chelsea has this perfect blend of sophistication and laid-back charm. It's an ideal neighborhood for those who want to experience London at its best, while still enjoying a peaceful and stylish environment. Johnnie's Fish Bar & Kebab House - 4 mins walk Mona Lisa - 4 mins walk Edith Grove (Stop HB) - 9 mins walk",
  previewLength = 300,
  className = ""
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const shouldShowReadMore = description.length > previewLength;
  const displayText = isExpanded ? description : description.slice(0, previewLength);
  const needsEllipsis = !isExpanded && shouldShowReadMore;

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`rounded-lg text-card-foreground mb-8 p-6 bg-white border-0 shadow-lg ${className}`}>
      <h2 className="text-2xl font-semibold mb-4 text-[#333333]">
        <span>{title}</span>
      </h2>
      
      <div className="space-y-4">
        <p className="text-[#5C5C5A] whitespace-pre-line leading-relaxed">
          <span>{displayText}{needsEllipsis && '...'}</span>
          {shouldShowReadMore && (
            <button 
              onClick={toggleExpanded}
              className="items-center justify-center whitespace-nowrap rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 underline-offset-4 text-[#284E4C] hover:text-[#284E4C]/90 p-0 h-auto inline ml-2"
            >
              <span>{isExpanded ? 'Read less' : 'Read more'}</span>
            </button>
          )}
        </p>
      </div>
    </div>
  );
};

export default PropertyAboutCard;