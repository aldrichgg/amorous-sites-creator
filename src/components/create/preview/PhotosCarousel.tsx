
import React, { useState, useEffect } from 'react';
import { Image as ImageIcon, X } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import useEmblaCarousel from 'embla-carousel-react';
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
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  
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

  const openImageModal = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeImageModal = () => {
    setSelectedImageIndex(null);
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
      <Carousel ref={emblaRef} className="w-full">
        <CarouselContent>
          {photos.map((photo, index) => (
            <CarouselItem key={index}>
              <div className="rounded-lg overflow-hidden bg-transparent flex items-center justify-center max-h-[400px]">
                <img 
                  src={photo} 
                  alt={`Memory photo ${index + 1}`} 
                  className="w-auto h-auto max-w-full max-h-[400px] object-contain rounded-lg mx-auto cursor-pointer transition-transform hover:scale-[1.02]"
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
          </>
        )}
      </Carousel>

      {/* Full-size image dialog */}
      <Dialog open={selectedImageIndex !== null} onOpenChange={closeImageModal}>
        <DialogContent className="max-w-[95vw] sm:max-w-[90vw] md:max-w-[85vw] lg:max-w-[80vw] p-0 bg-black/90 border-none">
          <DialogClose className="absolute right-3 top-3 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-black/70">
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
