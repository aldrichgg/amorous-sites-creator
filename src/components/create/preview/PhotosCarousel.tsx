
import React, { useState, useEffect, useCallback } from 'react';
import { Image as ImageIcon, X } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import useEmblaCarousel from 'embla-carousel-react';
import { EmblaCarouselType } from 'embla-carousel';
import {
  Dialog,
  DialogContent,
  DialogClose
} from "@/components/ui/dialog";

interface PhotosCarouselProps {
  photos: string[];
}

const PhotosCarousel: React.FC<PhotosCarouselProps> = ({ photos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);
  
  // Reset index when photos change
  useEffect(() => {
    setCurrentIndex(0);
  }, [photos]);

  // Setup autoplay functionality
  const autoplay = useCallback(() => {
    if (!emblaApi || !autoplayEnabled) return;
    
    const autoplayInterval = setInterval(() => {
      if (!emblaApi.canScrollNext()) {
        emblaApi.scrollTo(0);
      } else {
        emblaApi.scrollNext();
      }
    }, 3000); // Change slide every 3 seconds
    
    return () => {
      clearInterval(autoplayInterval);
    };
  }, [emblaApi, autoplayEnabled]);

  // Start autoplay when component mounts or when emblaApi changes
  useEffect(() => {
    const cleanup = autoplay();
    return () => {
      if (cleanup) cleanup();
    };
  }, [emblaApi, autoplay]);

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

  // Pause autoplay when user interacts with carousel
  const onMouseEnter = () => setAutoplayEnabled(false);
  const onMouseLeave = () => setAutoplayEnabled(true);
  const onTouchStart = () => setAutoplayEnabled(false);
  const onTouchEnd = () => {
    // Add a small delay before resuming autoplay
    setTimeout(() => setAutoplayEnabled(true), 1000);
  };

  const openImageModal = (index: number) => {
    setSelectedImageIndex(index);
    setAutoplayEnabled(false);
  };

  const closeImageModal = () => {
    setSelectedImageIndex(null);
    setAutoplayEnabled(true);
  };

  if (photos.length === 0) {
    return (
      <div className="flex items-center justify-center text-gray-500 mb-4 p-8 bg-gray-800/50 rounded-lg">
        <ImageIcon className="w-10 h-10 opacity-40" />
      </div>
    );
  }
  
  return (
    <div className="mb-4">
      <Carousel 
        ref={emblaRef} 
        className="w-full"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <CarouselContent>
          {photos.map((photo, index) => (
            <CarouselItem key={index} className="transition-opacity duration-500">
              <div className="rounded-lg overflow-hidden bg-transparent flex items-center justify-center max-h-[400px]">
                <img 
                  src={photo} 
                  alt={`Memory photo ${index + 1}`} 
                  className="w-auto h-auto max-w-full max-h-[400px] object-contain rounded-lg mx-auto cursor-pointer transition-all duration-300 hover:scale-[1.02]"
                  style={{ border: '1px solid rgba(156, 163, 175, 0.4)' }}
                  onClick={() => openImageModal(index)}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {photos.length > 1 && (
          <>
            <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white border-none hover:bg-black/70" />
            <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white border-none hover:bg-black/70" />
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
              {photos.map((_, index) => (
                <span
                  key={index}
                  className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                    currentIndex === index ? 'bg-white w-3' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </Carousel>

      {/* Full-size image dialog */}
      <Dialog open={selectedImageIndex !== null} onOpenChange={closeImageModal}>
        <DialogContent className="max-w-[95vw] sm:max-w-[90vw] md:max-w-[85vw] lg:max-w-[80vw] p-0 bg-black/90 border-none">
          <DialogClose className="absolute right-4 top-4 z-10 rounded-full p-2.5 bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:scale-105 transition-all duration-200 shadow-lg">
            <X className="h-5 w-5" />
          </DialogClose>
          <div className="w-full h-full flex items-center justify-center p-4">
            {selectedImageIndex !== null && (
              <img
                src={photos[selectedImageIndex]}
                alt={`Full-size photo ${selectedImageIndex + 1}`}
                className="max-w-full max-h-[90vh] object-contain"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PhotosCarousel;
