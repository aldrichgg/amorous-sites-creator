
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Image, Plus, Trash2 } from 'lucide-react';
import { toast } from "sonner";
import { uploadPhoto } from '@/services/memoryService';

interface PhotoUploaderProps {
  maxPhotos: number;
  photos: string[];
  onPhotosChange: (photos: string[]) => void;
}

const PhotoUploader: React.FC<PhotoUploaderProps> = ({
  maxPhotos,
  photos,
  onPhotosChange
}) => {
  const [isUploading, setIsUploading] = useState(false);
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    if (files.length === 0) return;
    
    // Check if adding these files would exceed the maximum
    if (photos.length + files.length > maxPhotos) {
      toast.error(`Você pode adicionar no máximo ${maxPhotos} fotos`);
      return;
    }
    
    // Check file types and sizes
    for (const file of files) {
      if (!file.type.startsWith('image/')) {
        toast.error("Por favor, selecione apenas arquivos de imagem");
        return;
      }
      
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("As imagens devem ter no máximo 5MB");
        return;
      }
    }
    
    setIsUploading(true);
    
    try {
      const newPhotos = [...photos];
      
      // Upload each file
      for (const file of files) {
        const uploadedUrl = await uploadPhoto(file);
        
        if (uploadedUrl) {
          newPhotos.push(uploadedUrl);
        } else {
          toast.error(`Falha ao enviar ${file.name}`);
        }
      }
      
      onPhotosChange(newPhotos);
      toast.success("Fotos adicionadas com sucesso!");
    } catch (error) {
      console.error("Error uploading photos:", error);
      toast.error("Ocorreu um erro ao enviar suas fotos");
    } finally {
      setIsUploading(false);
      // Reset the input
      e.target.value = '';
    }
  };
  
  const handleRemovePhoto = (index: number) => {
    const newPhotos = [...photos];
    newPhotos.splice(index, 1);
    onPhotosChange(newPhotos);
    toast.success("Foto removida");
  };
  
  return (
    <div className="w-full max-w-lg mx-auto pb-6">
      <motion.h2 
        className="text-3xl font-bold mb-4 text-center text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Adicione fotos
      </motion.h2>
      
      <motion.p 
        className="text-gray-300 mb-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {maxPhotos === 3 ? 
          'No plano Anual, você pode adicionar até 3 fotos' : 
          'No plano Para Sempre, você pode adicionar até 7 fotos'}
      </motion.p>
      
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {/* Photo grid */}
        {photos.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
            {photos.map((photo, index) => (
              <motion.div 
                key={index}
                className="relative aspect-square rounded-lg overflow-hidden border border-memblue/30 bg-black/40"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <img 
                  src={photo} 
                  alt={`Foto ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
                <motion.button
                  className="absolute top-2 right-2 p-1 bg-black/70 rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleRemovePhoto(index)}
                >
                  <Trash2 className="w-4 h-4" />
                </motion.button>
              </motion.div>
            ))}
          </div>
        )}
        
        {/* Upload button */}
        {photos.length < maxPhotos && (
          <div>
            <label 
              htmlFor="photoUpload" 
              className={`w-full flex flex-col items-center justify-center border-2 border-dashed ${
                isUploading ? 'border-gray-600 bg-gray-800/30' : 'border-memblue/40 hover:border-memcyan/60 bg-black/40 hover:bg-black/60'
              } rounded-lg p-6 cursor-pointer transition-all duration-300`}
            >
              <div className="flex flex-col items-center justify-center">
                {isUploading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    className="w-10 h-10 border-t-2 border-memcyan rounded-full mb-3"
                  />
                ) : (
                  <Plus className="w-10 h-10 text-memblue mb-3" />
                )}
                
                <p className="text-sm text-gray-300 text-center">
                  {isUploading ? 'Enviando...' : `Clique para adicionar fotos (${photos.length}/${maxPhotos})`}
                </p>
                <p className="text-xs text-gray-500 text-center mt-1">
                  JPG, PNG ou GIF • Máximo 5MB
                </p>
              </div>
              <input 
                id="photoUpload"
                type="file" 
                accept="image/*" 
                multiple 
                className="hidden" 
                onChange={handleFileChange}
                disabled={isUploading || photos.length >= maxPhotos}
              />
            </label>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default PhotoUploader;
