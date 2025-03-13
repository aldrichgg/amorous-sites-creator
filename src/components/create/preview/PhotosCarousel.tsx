
import React from 'react';
import { Image as ImageIcon } from 'lucide-react';

interface PhotosCarouselProps {
  photos: string[];
}

const PhotosCarousel: React.FC<PhotosCarouselProps> = ({ photos }) => {
  if (photos.length === 0) {
    return (
      <div className="flex items-center justify-center text-gray-500 mb-4 p-8 bg-gray-800/50 rounded-lg">
        <ImageIcon className="w-10 h-10 opacity-40" />
      </div>
    );
  }
  
  return (
    <div className="mb-4">
      <div className="aspect-[4/3] rounded-md overflow-hidden bg-gray-800 flex items-center justify-center">
        {photos.length > 0 && (
          <img src={photos[0]} alt="Memory" className="w-full h-full object-contain" />
        )}
      </div>
      {photos.length > 1 && (
        <div className="flex justify-center mt-2 space-x-1">
          {photos.slice(0, 5).map((_, index) => (
            <div 
              key={index} 
              className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-memcyan' : 'bg-gray-500'}`}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PhotosCarousel;
