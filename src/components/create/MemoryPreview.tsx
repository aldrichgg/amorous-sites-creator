
import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Calendar, Music, Image as ImageIcon } from 'lucide-react';

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

  // Extract track ID from Spotify URL
  const extractSpotifyTrackId = (url: string) => {
    if (!url) return null;
    
    // Try to match patterns like https://open.spotify.com/track/49RRBsYse5dBDRubOhCEkE
    const match = url.match(/track\/([a-zA-Z0-9]+)/);
    return match ? match[1] : null;
  };

  const spotifyTrackId = extractSpotifyTrackId(spotifyUrl);

  return (
    <div className="w-full max-w-lg mx-auto mt-8">
      <motion.h3 
        className="text-xl font-semibold mb-4 text-center text-white"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Prévia da sua página
      </motion.h3>
      
      <motion.div
        className="w-full rounded-lg overflow-hidden bg-gradient-to-b from-black to-gray-900 border border-gray-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Header */}
        <div className="bg-black p-4 border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-memblue to-memcyan flex items-center justify-center">
              <Heart className="w-4 h-4 text-white" />
            </div>
            <div className="ml-2">
              <h4 className="text-sm font-bold text-white">{pageName || 'Sua Memória'}</h4>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-4">
          {/* Title and counter */}
          <div className="text-center mb-6">
            <h1 className="text-xl font-bold text-white mb-1">{pageTitle || 'Título da Memória'}</h1>
            {startDate && (
              <div className="text-2xl font-bold text-memcyan">
                {calculateTimeDifference(startDate)}
              </div>
            )}
          </div>
          
          {/* Date */}
          {startDate && (
            <div className="flex items-center justify-center mb-4 text-gray-300 text-sm">
              <Calendar className="w-4 h-4 mr-2 text-memcyan" />
              <span>Desde {formatDate(startDate)}</span>
            </div>
          )}
          
          {/* Message */}
          {message && (
            <div className="bg-black/40 p-3 rounded-lg mb-4 text-white text-sm">
              <p className="whitespace-pre-line">{message}</p>
            </div>
          )}
          
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
            <div className="flex items-center text-gray-300 text-sm mb-4">
              <Music className="w-4 h-4 mr-2 text-green-500" />
              <span>Música vinculada</span>
            </div>
          )}
          
          {/* Photos */}
          {photos.length > 0 && (
            <div className="mb-4">
              <div className="grid grid-cols-3 gap-2">
                {photos.slice(0, 3).map((photo, index) => (
                  <div key={index} className="aspect-square rounded-md overflow-hidden">
                    <img src={photo} alt="Memory" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              {photos.length > 3 && (
                <div className="text-center mt-2 text-sm text-gray-400">
                  +{photos.length - 3} mais fotos
                </div>
              )}
            </div>
          )}
          
          {/* If no photos are selected */}
          {photos.length === 0 && (
            <div className="flex items-center justify-center text-gray-500 mb-4">
              <ImageIcon className="w-4 h-4 mr-2" />
              <span className="text-sm">Adicione fotos para sua memória</span>
            </div>
          )}
          
          {/* Selected emoji as background */}
          <div className="absolute bottom-4 right-4 text-5xl opacity-20">
            {selectedEmoji}
          </div>
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
  );
};

export default MemoryPreview;
