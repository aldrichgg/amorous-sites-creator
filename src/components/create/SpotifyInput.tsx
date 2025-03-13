
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Music, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface SpotifyInputProps {
  spotifyUrl: string;
  onSpotifyUrlChange: (url: string) => void;
}

const SpotifyInput: React.FC<SpotifyInputProps> = ({
  spotifyUrl,
  onSpotifyUrlChange
}) => {
  const [inputValue, setInputValue] = useState(spotifyUrl);
  const [error, setError] = useState<string | null>(null);
  
  // Validate Spotify URL
  const validateSpotifyUrl = (url: string): boolean => {
    if (!url) return true; // Empty is valid
    return url.includes('spotify.com/track/');
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setError(null);
  };
  
  const handleBlur = () => {
    if (inputValue && !validateSpotifyUrl(inputValue)) {
      setError('Por favor, insira um link válido do Spotify (ex: https://open.spotify.com/track/ID)');
    } else {
      setError(null);
      onSpotifyUrlChange(inputValue);
    }
  };
  
  const handleSpotifyOpen = () => {
    window.open('https://open.spotify.com', '_blank');
  };

  return (
    <div className="w-full max-w-lg mx-auto pb-6">
      <motion.h2 
        className="text-3xl font-bold mb-4 text-center text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Música Spotify
      </motion.h2>
      
      <motion.p 
        className="text-gray-300 mb-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Pesquise uma música no Spotify, copie o link e insira no campo abaixo.
      </motion.p>
      
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Music className="h-5 w-5 text-memcyan group-hover:text-green-400 transition-colors" />
          </div>
          <Input
            type="text"
            value={inputValue}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="https://open.spotify.com/track/..."
            className={`w-full pl-12 bg-black/60 backdrop-blur-sm border ${error ? 'border-red-500' : 'border-memblue/30'} shadow-lg shadow-black/30 text-white focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all duration-300 placeholder-gray-500`}
          />
        </div>
        
        {error && (
          <div className="text-red-500 text-sm flex items-center pl-2">
            <AlertCircle className="w-4 h-4 mr-2" />
            {error}
          </div>
        )}
        
        <div className="text-gray-400 text-sm bg-black/40 backdrop-blur-sm p-4 rounded-2xl border border-white/5 shadow-lg">
          <p className="mb-2 font-medium text-white/80">Como pegar o link da música:</p>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Abra o Spotify e encontre a música desejada</li>
            <li>Clique com o botão direito na música e selecione "Compartilhar"</li>
            <li>Selecione "Copiar link"</li>
            <li>Cole o link aqui</li>
          </ol>
        </div>
        
        <motion.button
          onClick={handleSpotifyOpen}
          className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-4 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 mr-2" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424a.622.622 0 01-.857.207c-2.348-1.435-5.304-1.76-8.785-.964a.622.622 0 11-.277-1.215c3.809-.87 7.076-.496 9.712 1.115a.623.623 0 01.207.857zm1.223-2.722a.78.78 0 01-1.072.257c-2.687-1.652-6.785-2.13-9.965-1.166a.78.78 0 01-.973-.519.781.781 0 01.519-.972c3.632-1.102 8.147-.568 11.234 1.328a.78.78 0 01.257 1.072zm.105-2.835c-3.223-1.914-8.54-2.09-11.618-1.156a.935.935 0 11-.542-1.79c3.532-1.072 9.404-.865 13.115 1.338a.936.936 0 11-.955 1.608z"/>
          </svg>
          Abrir Spotify
        </motion.button>
      </motion.div>
    </div>
  );
};

export default SpotifyInput;
