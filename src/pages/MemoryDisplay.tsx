import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Calendar, Music, Camera, Share2, Loader2, X } from 'lucide-react';
import { toast } from "sonner";

import StarBackground from '../components/StarBackground';
import SpotifyPlayer from '../components/create/preview/SpotifyPlayer';
import PhotosCarousel from '../components/create/preview/PhotosCarousel';
import DateCounter from '../components/create/preview/DateCounter';
import MessageDisplay from '../components/create/preview/MessageDisplay';
import EmojiRain from '../components/create/preview/EmojiRain';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Dialog,
  DialogContent,
  DialogClose
} from "@/components/ui/dialog";
import { getMemoryByPageName } from '@/services/memoryService';
import { Memory, MemoryPhoto } from '@/types/memory';

const MemoryDisplay = () => {
  const { memoryId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [memoryData, setMemoryData] = useState<Memory | null>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  useEffect(() => {
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
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copiado para a área de transferência!");
    }
  };

  const openImageModal = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeImageModal = () => {
    setSelectedImageIndex(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/20 to-black text-white relative">
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
            <div className="neo-blur p-8 max-w-md text-center rounded-xl">
              <h2 className="text-2xl font-bold text-red-400 mb-4">Oops!</h2>
              <p className="text-white mb-6">{error}</p>
              <Button onClick={() => navigate('/search')} className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90 transition-opacity">
                Buscar Minha Memória
              </Button>
            </div>
          </div>
        ) : memoryData && (
          <main className="container mx-auto px-4 py-12 relative z-10 min-h-screen flex flex-col">
            <div className="max-w-3xl mx-auto w-full flex-grow">
              <motion.div 
                className="text-center mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 font-script bg-gradient-to-r from-purple-300 to-pink-200 bg-clip-text text-transparent">
                  {memoryData.pageTitle}
                </h1>
              </motion.div>
              
              {memoryData.selectedPlan === 'forever' && memoryData.selectedEmoji && (
                <EmojiRain emoji={memoryData.selectedEmoji} />
              )}
              
              <motion.div 
                className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden mb-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.5)]"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {memoryData.selectedPlan === 'forever' && memoryData.spotifyTrackId && (
                  <div className="px-4 pt-6 pb-2">
                    <div className="flex items-center justify-center gap-2 mb-2 text-purple-300">
                      <Music className="w-5 h-5" />
                      <h2 className="text-xl font-medium">Música</h2>
                    </div>
                    <SpotifyPlayer 
                      spotifyTrackId={memoryData.spotifyTrackId} 
                      spotifyUrl={memoryData.spotifyUrl || ''} 
                    />
                  </div>
                )}
                
                {photos && photos.length > 0 && (
                  <div className="p-4">
                    <PhotosCarousel photos={photos} />
                  </div>
                )}
                
                <div className="px-4 pt-2 pb-2 text-center">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-200 to-pink-100 bg-clip-text text-transparent">
                    {memoryData.pageTitle}
                  </h2>
                </div>
                
                <div className="px-4 py-2 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2 text-purple-300">
                    <Calendar className="w-5 h-5" />
                    <h2 className="text-xl font-medium">Contador de Tempo</h2>
                  </div>
                  <DateCounter startDate={memoryData.startDate} />
                </div>
                
                <div className="px-8 py-2">
                  <Separator className="bg-purple-400/30" />
                </div>
                
                {memoryData.message && (
                  <div className="px-4 py-4">
                    <div className="flex items-center justify-center gap-2 mb-2 text-purple-300">
                      <Heart className="w-5 h-5" />
                      <h2 className="text-xl font-medium">Mensagem</h2>
                    </div>
                    <MessageDisplay message={memoryData.message} />
                  </div>
                )}
                
                {photos && photos.length > 1 && (
                  <div className="px-4 pb-6">
                    <div className="flex items-center justify-center gap-2 mb-2 text-purple-300">
                      <Camera className="w-5 h-5" />
                      <h2 className="text-xl font-medium">Álbum de fotos</h2>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {photos.map((photo: string, index: number) => (
                        <div 
                          key={index} 
                          className="relative aspect-square rounded-lg overflow-hidden shadow-md transform transition-transform hover:scale-105 cursor-pointer"
                          onClick={() => openImageModal(index)}
                        >
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
              
              <motion.div 
                className="flex justify-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Button 
                  onClick={handleShare}
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:shadow-lg hover:opacity-90 text-white py-3 px-6 rounded-full flex items-center gap-2 shadow-[0_4px_12px_-2px_rgba(0,0,0,0.3)]"
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
                Criado com 💜 no LoveIit.com
              </motion.div>
            </div>
          </main>
        )}
      </div>

      <Dialog open={selectedImageIndex !== null} onOpenChange={closeImageModal}>
        <DialogContent className="max-w-[95vw] sm:max-w-[90vw] md:max-w-[85vw] lg:max-w-[80vw] p-0 bg-black/90 border-none">
          <DialogClose className="absolute right-4 top-4 z-10 rounded-full p-2.5 bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:scale-105 transition-all duration-200 shadow-lg">
            <X className="h-5 w-5" />
          </DialogClose>
          <div className="w-full h-full flex items-center justify-center p-4">
            {selectedImageIndex !== null && photos[selectedImageIndex] && (
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

export default MemoryDisplay;
