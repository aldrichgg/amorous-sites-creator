
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Calendar, Music, Image as ImageIcon, Globe } from 'lucide-react';
import { useIsMobile } from '../../hooks/use-mobile';

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

  // Format date for display
  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return new Intl.DateTimeFormat('pt-BR', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    }).format(date);
  };

  // Calculate time difference
  const calculateTimeDifference = (date: Date | null) => {
    if (!date) return '';
    
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);
    
    if (diffYears > 0) {
      return `${diffYears} ${diffYears === 1 ? 'ano' : 'anos'}`;
    } else if (diffMonths > 0) {
      return `${diffMonths} ${diffMonths === 1 ? 'mês' : 'meses'}`;
    } else {
      return `${diffDays} ${diffDays === 1 ? 'dia' : 'dias'}`;
    }
  };

  const previewWidth = isMobile ? "100%" : "375px";
  const previewHeight = "700px";

  return (
    <div className="w-full mx-auto mt-8 flex justify-center">
      <div className="flex flex-col items-center">
        <motion.h3 
          className="text-xl font-semibold mb-4 text-center text-white"
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
        >
          {/* Mobile device frame */}
          <div className="relative rounded-[40px] overflow-hidden bg-gray-900 border-8 border-gray-800 shadow-2xl" style={{ width: previewWidth, height: previewHeight }}>
            {/* Device notch */}
            <div className="absolute top-0 left-0 right-0 h-6 bg-black z-10 flex justify-center items-center">
              <div className="w-40 h-5 bg-black rounded-b-xl"></div>
            </div>
            
            {/* Browser content */}
            <div className="w-full h-full overflow-hidden bg-gradient-to-b from-gray-900 to-black flex flex-col">
              {/* Browser Header */}
              <div className="bg-gray-800 p-2 flex items-center space-x-2">
                <div className="flex space-x-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
              </div>
              
              {/* URL Bar */}
              <div className="bg-gray-100 mx-2 my-1 p-2 rounded-md flex items-center">
                <Globe className="w-4 h-4 mr-2 text-gray-500" />
                <div className="text-gray-800 text-sm font-medium truncate">
                  memoryiit.com/{pageName || 'sua-memoria'}
                </div>
              </div>
              
              {/* Content */}
              <div className="flex-1 overflow-y-auto p-4 relative">
                {/* Spotify Embed */}
                {spotifyTrackId && (
                  <div className="mb-4">
                    <iframe 
                      title="Spotify Embed"
                      style={{ borderRadius: '12px' }} 
                      src={`https://open.spotify.com/embed/track/${spotifyTrackId}?utm_source=generator`} 
                      width="100%" 
                      height="152" 
                      frameBorder="0" 
                      allowFullScreen 
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                      loading="lazy"
                    ></iframe>
                  </div>
                )}
                
                {/* Spotify indication (when URL exists but embed not shown) */}
                {spotifyUrl && !spotifyTrackId && (
                  <div className="flex items-center text-gray-300 text-sm mb-4 bg-black/40 p-3 rounded-lg">
                    <Music className="w-4 h-4 mr-2 text-green-500" />
                    <span>Música vinculada do Spotify</span>
                  </div>
                )}
                
                {/* Photos */}
                {photos.length > 0 && (
                  <div className="mb-4">
                    <div className="aspect-[4/3] rounded-md overflow-hidden bg-gray-800 flex items-center justify-center">
                      {photos.length > 0 ? (
                        <img src={photos[0]} alt="Memory" className="w-full h-full object-contain" />
                      ) : (
                        <ImageIcon className="w-12 h-12 text-gray-600" />
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
                )}
                
                {/* Title */}
                <div className="text-center mb-2">
                  <h1 className="text-2xl font-bold text-white">{pageTitle || 'Título da Memória'}</h1>
                </div>
                
                {/* Counter */}
                {startDate && (
                  <div className="text-center mb-4">
                    <div className="text-2xl font-bold text-memcyan">
                      {calculateTimeDifference(startDate)}
                    </div>
                    <div className="flex items-center justify-center text-gray-300 text-xs">
                      <Calendar className="w-3 h-3 mr-1 text-memcyan" />
                      <span>Desde {formatDate(startDate)}</span>
                    </div>
                  </div>
                )}
                
                {/* Message */}
                {message && (
                  <div className="bg-black/40 p-3 rounded-lg text-white text-sm mb-4">
                    <p className="whitespace-pre-line">{message}</p>
                  </div>
                )}
                
                {/* If no photos are selected */}
                {photos.length === 0 && (
                  <div className="flex items-center justify-center text-gray-500 mb-4 p-8 bg-gray-800/50 rounded-lg">
                    <ImageIcon className="w-10 h-10 opacity-40" />
                  </div>
                )}
                
                {/* Selected emoji as background */}
                {selectedEmoji && (
                  <div className="absolute bottom-4 right-4 text-5xl opacity-20">
                    {selectedEmoji}
                  </div>
                )}
              </div>
            </div>
            
            {/* Home button/indicator */}
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1/3 h-1 bg-gray-600 rounded-full"></div>
          </div>
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
