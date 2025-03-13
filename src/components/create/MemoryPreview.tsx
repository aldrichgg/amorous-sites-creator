import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useIsMobile } from '../../hooks/use-mobile';

import MobileDeviceFrame from './preview/MobileDeviceFrame';
import BrowserHeader from './preview/BrowserHeader';
import SpotifyPlayer from './preview/SpotifyPlayer';
import PhotosCarousel from './preview/PhotosCarousel';
import DateCounter from './preview/DateCounter';
import MessageDisplay from './preview/MessageDisplay';
import EmojiRain from './preview/EmojiRain';
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogClose
} from "@/components/ui/dialog";

interface MemoryPreviewProps {
  pageTitle: string;
  pageName: string;
  startDate: Date | null;
  message: string;
  spotifyUrl: string;
  selectedEmoji: string;
  photos: string[];
  selectedPlan?: string;
}

const MemoryPreview: React.FC<MemoryPreviewProps> = ({
  pageTitle,
  pageName,
  startDate,
  message,
  spotifyUrl,
  selectedEmoji,
  photos,
  selectedPlan = 'forever'
}) => {
  const [spotifyTrackId, setSpotifyTrackId] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const isMobile = useIsMobile();

  const showSpotify = selectedPlan === 'forever';
  const showEmojiRain = selectedPlan === 'forever';
  const maxPhotos = selectedPlan === 'forever' ? 7 : 3;
  const limitedPhotos = photos.slice(0, maxPhotos);

  useEffect(() => {
    if (spotifyUrl) {
      try {
        const match = spotifyUrl.match(/\/track\/([a-zA-Z0-9]+)/);
        if (match && match[1]) {
          console.log("Extracted Spotify track ID:", match[1], "from URL:", spotifyUrl);
          setSpotifyTrackId(match[1]);
          return;
        }
        
        const uriMatch = spotifyUrl.match(/spotify:track:([a-zA-Z0-9]+)/);
        if (uriMatch && uriMatch[1]) {
          console.log("Extracted Spotify track ID from URI:", uriMatch[1]);
          setSpotifyTrackId(uriMatch[1]);
          return;
        }
        
        try {
          const url = new URL(spotifyUrl);
          const pathMatch = url.pathname.match(/\/track\/([a-zA-Z0-9]+)/);
          if (pathMatch && pathMatch[1]) {
            console.log("Extracted Spotify track ID from path:", pathMatch[1]);
            setSpotifyTrackId(pathMatch[1]);
            return;
          }
          
          const trackParam = url.searchParams.get('track');
          if (trackParam) {
            console.log("Extracted Spotify track ID from params:", trackParam);
            setSpotifyTrackId(trackParam);
            return;
          }
        } catch (urlError) {
          console.log("Could not parse as URL:", urlError);
        }
        
        console.log("No valid Spotify track ID found in URL:", spotifyUrl);
        setSpotifyTrackId(null);
      } catch (e) {
        console.log("Error parsing Spotify URL:", e);
        setSpotifyTrackId(null);
      }
    } else {
      setSpotifyTrackId(null);
    }
  }, [spotifyUrl]);

  const previewWidth = isMobile ? "280px" : "320px";
  const previewHeight = isMobile ? "580px" : "650px";

  const openImageModal = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeImageModal = () => {
    setSelectedImageIndex(null);
  };

  return (
    <div className="w-full mx-auto mt-8 flex justify-center">
      <div className="flex flex-col items-center">
        <motion.h3 
          className="text-lg sm:text-xl font-semibold mb-4 text-center text-white"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Prévia da sua página
        </motion.h3>
        
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ maxWidth: "100%" }}
        >
          <MobileDeviceFrame previewWidth={previewWidth} previewHeight={previewHeight}>
            <div className="w-full h-full overflow-y-auto bg-gradient-to-b from-black via-purple-950/20 to-black flex flex-col">
              <div className="w-full sticky top-0 z-20 pt-2">
                <BrowserHeader pageName={pageName} />
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 relative">
                {showEmojiRain && selectedEmoji && <EmojiRain emoji={selectedEmoji} />}
                
                {showSpotify && spotifyTrackId && (
                  <div className="mb-3">
                    <SpotifyPlayer spotifyTrackId={spotifyTrackId} spotifyUrl={spotifyUrl} />
                  </div>
                )}
                
                <PhotosCarousel photos={limitedPhotos} />
                
                <div className="text-center mt-4 mb-2">
                  <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-200 to-pink-100 bg-clip-text text-transparent">{pageTitle || 'Título da Memória'}</h1>
                </div>
                
                <DateCounter startDate={startDate} />
                
                <div className="my-4">
                  <Separator className="bg-purple-400/30" />
                </div>
                
                <MessageDisplay message={message} />
                
                {selectedPlan === 'annual' && (
                  <div className="mt-4 text-xs text-yellow-400 bg-yellow-900/20 p-2 rounded-md text-center">
                    {!showSpotify && spotifyUrl ? "Música não disponível no plano Anual" : ""}
                    {!showEmojiRain && selectedEmoji ? (showSpotify ? " • " : "") + "Chuva de emoji não disponível no plano Anual" : ""}
                  </div>
                )}
              </div>
            </div>
          </MobileDeviceFrame>
        </motion.div>
        
        <motion.p 
          className="text-xs text-gray-400 mt-2 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Esta é apenas uma prévia. A página final pode ter pequenas diferenças.
        </motion.p>
      </div>

      <Dialog open={selectedImageIndex !== null} onOpenChange={closeImageModal}>
        <DialogContent className="max-w-[95vw] sm:max-w-[90vw] md:max-w-[85vw] lg:max-w-[80vw] p-0 bg-black/90 border-none">
          <DialogClose className="absolute right-4 top-4 z-10 rounded-full p-2.5 bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:scale-105 transition-all duration-200 shadow-lg">
            <X className="h-5 w-5" />
          </DialogClose>
          <div className="w-full h-full flex items-center justify-center p-4">
            {selectedImageIndex !== null && limitedPhotos[selectedImageIndex] && (
              <img
                src={limitedPhotos[selectedImageIndex]}
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

export default MemoryPreview;
