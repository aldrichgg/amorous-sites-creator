import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '../../hooks/use-mobile';

import MobileDeviceFrame from './preview/MobileDeviceFrame';
import BrowserHeader from './preview/BrowserHeader';
import SpotifyPlayer from './preview/SpotifyPlayer';
import PhotosCarousel from './preview/PhotosCarousel';
import DateCounter from './preview/DateCounter';
import MessageDisplay from './preview/MessageDisplay';
import EmojiRain from './preview/EmojiRain';

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
      // Improved track ID extraction
      try {
        // Handle standard format with various prefixes: spotify.com/track/ID or open.spotify.com/intl-pt/track/ID
        const match = spotifyUrl.match(/\/track\/([a-zA-Z0-9]+)/);
        if (match && match[1]) {
          console.log("Extracted Spotify track ID:", match[1], "from URL:", spotifyUrl);
          setSpotifyTrackId(match[1]);
          return;
        }
        
        // Handle spotify:track:ID format
        const uriMatch = spotifyUrl.match(/spotify:track:([a-zA-Z0-9]+)/);
        if (uriMatch && uriMatch[1]) {
          console.log("Extracted Spotify track ID from URI:", uriMatch[1]);
          setSpotifyTrackId(uriMatch[1]);
          return;
        }
        
        // Try parsing as URL for more complex cases
        try {
          const url = new URL(spotifyUrl);
          // Check if the ID is in the pathname
          const pathMatch = url.pathname.match(/\/track\/([a-zA-Z0-9]+)/);
          if (pathMatch && pathMatch[1]) {
            console.log("Extracted Spotify track ID from path:", pathMatch[1]);
            setSpotifyTrackId(pathMatch[1]);
            return;
          }
          
          // As fallback, check query parameters
          const trackParam = url.searchParams.get('track');
          if (trackParam) {
            console.log("Extracted Spotify track ID from params:", trackParam);
            setSpotifyTrackId(trackParam);
            return;
          }
        } catch (urlError) {
          console.log("Could not parse as URL:", urlError);
        }
        
        // No valid ID found
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

  // Adjust for smaller screens with more natural phone dimensions
  const previewWidth = isMobile ? "280px" : "320px";
  const previewHeight = isMobile ? "580px" : "650px";

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
            <div className="w-full h-full overflow-y-auto bg-gradient-to-b from-gray-900 to-black flex flex-col">
              <div className="w-full sticky top-0 z-20 pt-2">
                <BrowserHeader pageName={pageName} />
              </div>
              
              {/* Content */}
              <div className="flex-1 overflow-y-auto p-4 relative">
                {/* Emoji Rain Effect */}
                {selectedEmoji && <EmojiRain emoji={selectedEmoji} />}
                
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
