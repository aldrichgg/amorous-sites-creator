
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Calendar, Music, Camera, Share2, Loader2 } from 'lucide-react';
import { toast } from "sonner";

import StarBackground from '../components/StarBackground';
import Footer from '../components/Layout/Footer';
import SpotifyPlayer from '../components/create/preview/SpotifyPlayer';
import PhotosCarousel from '../components/create/preview/PhotosCarousel';
import DateCounter from '../components/create/preview/DateCounter';
import MessageDisplay from '../components/create/preview/MessageDisplay';
import EmojiRain from '../components/create/preview/EmojiRain';
import { Button } from '@/components/ui/button';
import { getMemoryByPageName } from '@/services/memoryService';
import { Memory, MemoryPhoto } from '@/types/memory';

const MemoryDisplay = () => {
  const { memoryId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [memoryData, setMemoryData] = useState<Memory | null>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch memory data from Supabase
    const fetchMemory = async () => {
      setLoading(true);
      
      try {
        if (!memoryId) {
          setError("Memória não encontrada. Verifique o link e tente novamente.");
          setLoading(false);
          return;
        }
        
        const { memory, photos } = await getMemoryByPageName(memoryId);
        
        if (memory) {
          setMemoryData(memory);
          setPhotos(photos.map(photo => photo.photoUrl));
          setError(null);
        } else {
          setError("Memória não encontrada. Verifique o link e tente novamente.");
        }
      } catch (err) {
        console.error("Error fetching memory:", err);
        setError("Ocorreu um erro ao carregar a memória.");
      } finally {
        setLoading(false);
      }
    };

    fetchMemory();
  }, [memoryId]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: memoryData?.pageTitle || "Memória especial",
        text: 'Compartilhe esta memória especial!',
        url: window.location.href,
      })
      .then(() => console.log('Compartilhado com sucesso'))
      .catch((error) => console.log('Erro ao compartilhar', error));
    } else {
      // Fallback for browsers that don't support navigator.share
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copiado para a área de transferência!");
    }
  };

  // Show appropriate UI based on loading state and data
  return (
    <div className="min-h-screen bg-black text-white relative">
      <div className="relative overflow-hidden min-h-screen">
        <StarBackground intensity="high" color="mixed" />
        
        {loading ? (
          <div className="flex items-center justify-center min-h-screen">
            <div className="flex flex-col items-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                className="w-12 h-12 border-t-2 border-memcyan rounded-full"
              />
              <p className="mt-4 text-memcyan">Carregando sua memória especial...</p>
            </div>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="glass-card p-8 max-w-md text-center rounded-xl">
              <h2 className="text-2xl font-bold text-red-400 mb-4">Oops!</h2>
              <p className="text-white mb-6">{error}</p>
              <Button onClick={() => navigate('/search')} className="bg-memblue hover:bg-memcyan transition-colors">
                Buscar Minha Memória
              </Button>
            </div>
          </div>
        ) : memoryData && (
          <main className="container mx-auto px-4 py-16 relative z-10 min-h-screen flex flex-col">
            <div className="max-w-3xl mx-auto w-full flex-grow">
              {/* Header */}
              <motion.div 
                className="text-center mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 font-script">
                  {memoryData.pageTitle}
                </h1>
                {memoryData.selectedEmoji && (
                  <div className="text-4xl sm:text-5xl mb-2">{memoryData.selectedEmoji}</div>
                )}
              </motion.div>
              
              {/* Emoji Rain Effect - only display for forever plan */}
              {memoryData.selectedPlan === 'forever' && memoryData.selectedEmoji && (
                <EmojiRain emoji={memoryData.selectedEmoji} />
              )}
              
              {/* Main Content Card */}
              <motion.div 
                className="glass-card rounded-2xl overflow-hidden backdrop-blur-sm mb-8"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {/* Photos Carousel */}
                {photos && photos.length > 0 && (
                  <div className="p-4">
                    <PhotosCarousel photos={photos} />
                  </div>
                )}
                
                {/* Counter */}
                <div className="px-4 py-6 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2 text-memcyan">
                    <Calendar className="w-5 h-5" />
                    <h2 className="text-xl font-medium">Contador de Tempo</h2>
                  </div>
                  <DateCounter startDate={memoryData.startDate} />
                </div>
                
                {/* Message */}
                {memoryData.message && (
                  <div className="px-4 pb-6">
                    <div className="flex items-center justify-center gap-2 mb-2 text-memcyan">
                      <Heart className="w-5 h-5" />
                      <h2 className="text-xl font-medium">Mensagem</h2>
                    </div>
                    <MessageDisplay message={memoryData.message} />
                  </div>
                )}
                
                {/* Spotify Player - only display for forever plan */}
                {memoryData.selectedPlan === 'forever' && memoryData.spotifyTrackId && (
                  <div className="px-4 pb-6">
                    <div className="flex items-center justify-center gap-2 mb-2 text-memcyan">
                      <Music className="w-5 h-5" />
                      <h2 className="text-xl font-medium">Nossa Música</h2>
                    </div>
                    <SpotifyPlayer 
                      spotifyTrackId={memoryData.spotifyTrackId} 
                      spotifyUrl={memoryData.spotifyUrl || ''} 
                    />
                  </div>
                )}
                
                {/* Photos Grid (if there are photos) */}
                {photos && photos.length > 1 && (
                  <div className="px-4 pb-6">
                    <div className="flex items-center justify-center gap-2 mb-2 text-memcyan">
                      <Camera className="w-5 h-5" />
                      <h2 className="text-xl font-medium">Nossas Fotos</h2>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {photos.map((photo: string, index: number) => (
                        <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                          <img
                            src={photo}
                            alt={`Memória ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
              
              {/* Share Button */}
              <motion.div 
                className="flex justify-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Button 
                  onClick={handleShare}
                  className="bg-gradient-to-r from-memblue to-memcyan hover:from-memblue-dark hover:to-memcyan-dark text-white py-3 px-6 rounded-full flex items-center gap-2"
                >
                  <Share2 className="w-5 h-5" />
                  Compartilhar Esta Memória
                </Button>
              </motion.div>
              
              <motion.div 
                className="text-center text-sm text-gray-400 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                Criado com 💙 no LoveIit.com
              </motion.div>
            </div>
          </main>
        )}
        
        <div className="relative z-20 mt-auto">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default MemoryDisplay;
