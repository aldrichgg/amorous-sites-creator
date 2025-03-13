
import React from 'react';
import { Music } from 'lucide-react';

interface SpotifyPlayerProps {
  spotifyTrackId: string | null;
  spotifyUrl: string;
}

const SpotifyPlayer: React.FC<SpotifyPlayerProps> = ({ spotifyTrackId, spotifyUrl }) => {
  if (spotifyTrackId) {
    return (
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
    );
  }
  
  if (spotifyUrl) {
    return (
      <div className="flex items-center text-gray-300 text-sm mb-4 bg-black/40 p-3 rounded-lg">
        <Music className="w-4 h-4 mr-2 text-green-500" />
        <span>Música vinculada do Spotify</span>
      </div>
    );
  }
  
  return null;
};

export default SpotifyPlayer;
