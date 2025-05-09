
import React from 'react';
import { Music } from 'lucide-react';

interface SpotifyPlayerProps {
  spotifyTrackId: string | null;
  spotifyUrl: string;
}

const SpotifyPlayer: React.FC<SpotifyPlayerProps> = ({ spotifyTrackId, spotifyUrl }) => {
  // Parse the track ID if we have a URL but no ID extracted yet
  const getTrackId = (): string | null => {
    if (spotifyTrackId) return spotifyTrackId;
    
    if (spotifyUrl) {
      // Handle different Spotify URL formats
      try {
        // Extract ID from URLs like 'spotify.com/intl-pt/track/ID' or 'open.spotify.com/track/ID'
        // This pattern will match track IDs regardless of language prefix or domains
        const match = spotifyUrl.match(/\/track\/([a-zA-Z0-9]+)/);
        if (match && match[1]) return match[1];
        
        // Handle spotify:track:ID format
        const uriMatch = spotifyUrl.match(/spotify:track:([a-zA-Z0-9]+)/);
        if (uriMatch && uriMatch[1]) return uriMatch[1];
        
        // Try getting ID from URL parameters if embedded in a link
        try {
          const url = new URL(spotifyUrl);
          // Some Spotify urls have the ID in the pathname rather than as a parameter
          const pathMatch = url.pathname.match(/\/track\/([a-zA-Z0-9]+)/);
          if (pathMatch && pathMatch[1]) return pathMatch[1];
          
          // As fallback, check query parameters
          const trackParam = url.searchParams.get('track');
          if (trackParam) return trackParam;
        } catch {
          console.log('Could not parse as URL');
        }
      } catch (e) {
        console.log('Error parsing Spotify URL:', e);
        return null;
      }
    }
    
    return null;
  };
  
  const trackId = getTrackId();
  
  if (trackId) {
    return (
      <div className="mb-4">
        <iframe 
          title="Spotify Embed"
          style={{ borderRadius: '12px' }} 
          src={`https://open.spotify.com/embed/track/${trackId}?utm_source=generator`} 
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
