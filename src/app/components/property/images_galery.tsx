'use client';

import Image from 'next/image';

interface PropertyImageGalleryProps {
  images?: string[];
  onImageClick?: (index: number) => void;
}

const PropertyImageGallery = ({ 
  images = [
    '/images/1.jpg',
    '/images/2.jpg', 
    '/images/3.jpg',
    '/images/4.jpg',
    '/images/5.jpg'
  ],
  onImageClick = () => {}
}: PropertyImageGalleryProps) => {
  return (
    <div className="relative mb-8 md:mb-12">
      <div className="hidden md:block">
        <div className="grid grid-cols-4 grid-rows-2 gap-4 h-[600px]">
          <div 
            className="col-span-2 row-span-2 relative cursor-pointer group"
            onClick={() => onImageClick?.(0)}
          >
            <Image 
              src={images[0]} 
              fill={true} 
              alt="Property Image 1" 
              className="w-full h-full object-cover rounded-l-xl"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
          
          {images.slice(1).map((image, index) => (
            <div 
              key={index + 1}
              className="relative cursor-pointer group"
              onClick={() => onImageClick?.(index + 1)}
            >
              <Image 
                src={image} 
                fill={true} 
                alt={`Property Image ${index + 2}`} 
                className="w-full h-full object-cover"
                sizes="(min-width: 768px) 25vw, 100vw"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyImageGallery;