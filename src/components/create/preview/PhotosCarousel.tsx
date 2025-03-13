
import React, { useState, useEffect } from 'react';
import { Image as ImageIcon } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
// Properly import from embla-carousel-react
import useEmblaCarousel from 'embla-carousel-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface PhotosCarouselProps {
  photos: string[];
}

const PhotosCarousel: React.FC<PhotosCarouselProps> = ({ photos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel();
  
  // Reset index when photos change
  useEffect(() => {
    setCurrentIndex(0);
  }, [photos]);

  // Update the current index when the carousel slides
  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setCurrentIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on('select', onSelect);
    
    // Initial index
    onSelect();

    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  if (photos.length === 0) {
    return (
      <div className="flex items-center justify-center text-gray-500 mb-4 p-8 bg-gray-800/50 rounded-lg">
        <ImageIcon className="w-10 h-10 opacity-40" />
      </div>
    );
  }
  
  return (
    <div className="mb-4">
      <Carousel ref={emblaRef} className="w-full">
        <CarouselContent>
          {photos.map((photo, index) => (
            <CarouselItem key={index}>
              <div className="rounded-lg overflow-hidden bg-transparent flex items-center justify-center max-h-[400px]">
                <img 
                  src={photo} 
                  alt={`Memory photo ${index + 1}`} 
                  className="w-auto h-auto max-w-full max-h-[400px] object-contain rounded-lg mx-auto"
                  style={{ border: '1px solid rgba(156, 163, 175, 0.4)' }}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {photos.length > 1 && (
          <>
            <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white border-none hover:bg-black/70" />
            <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white border-none hover:bg-black/70" />
          </>
        )}
      </Carousel>
    </div>
  );
};

export default PhotosCarousel;
