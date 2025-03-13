
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '../../hooks/use-mobile';

import MobileDeviceFrame from './preview/MobileDeviceFrame';
import BrowserHeader from './preview/BrowserHeader';
import SpotifyPlayer from './preview/SpotifyPlayer';
import PhotosCarousel from './preview/PhotosCarousel';
import DateCounter from './preview/DateCounter';
import MessageDisplay from './preview/MessageDisplay';

interface MemoryPreviewProps {
  pageTitle: string;
  pageName: string;
  startDate: Date | null;
  message: string;
  spotifyUrl: string;
  selectedEmoji: string;
  photos: string[];
}

const MemoryPreview: React.FC<MemoryPreviewProps> = ({
  pageTitle,
  pageName,
  startDate,
  message,
  spotifyUrl,
  selectedEmoji,
  photos
}) => {
  const [spotifyTrackId, setSpotifyTrackId] = useState<string | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Extract Spotify track ID when spotifyUrl changes
    if (spotifyUrl) {
      const match = spotifyUrl.match(/track\/([a-zA-Z0-9]+)/);
      const id = match ? match[1] : null;
      console.log("Extracted Spotify track ID:", id, "from URL:", spotifyUrl);
      setSpotifyTrackId(id);
    } else {
      setSpotifyTrackId(null);
    }
  }, [spotifyUrl]);

  // Adjust for smaller screens
  const previewWidth = isMobile ? "95%" : "350px";
  const previewHeight = isMobile ? "600px" : "700px";

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
            {/* Browser content */}
            <div className="w-full h-full overflow-hidden bg-gradient-to-b from-gray-900 to-black flex flex-col">
              <BrowserHeader pageName={pageName} />
              
              {/* Content */}
              <div className="flex-1 overflow-y-auto p-4 relative">
                <SpotifyPlayer spotifyTrackId={spotifyTrackId} spotifyUrl={spotifyUrl} />
                <PhotosCarousel photos={photos} />
                
                {/* Title */}
                <div className="text-center mb-2">
                  <h1 className="text-xl sm:text-2xl font-bold text-white">{pageTitle || 'Título da Memória'}</h1>
                </div>
                
                <DateCounter startDate={startDate} />
                <MessageDisplay message={message} />
                
                {/* Selected emoji as background */}
                {selectedEmoji && (
                  <div className="absolute bottom-4 right-4 text-4xl sm:text-5xl opacity-20">
                    {selectedEmoji}
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
    </div>
  );
};

export default MemoryPreview;
