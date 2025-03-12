
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, Image } from 'lucide-react';

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
  const [isDragging, setIsDragging] = useState(false);
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };
  
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };
  
  const handleFiles = (files: FileList) => {
    if (photos.length >= maxPhotos) return;
    
    const newPhotos = [...photos];
    const remainingSlots = maxPhotos - photos.length;
    
    Array.from(files).slice(0, remainingSlots).forEach(file => {
      // Normally, you'd upload the file to a server here and get a URL back
      // For this example, we'll create a local object URL
      const objectUrl = URL.createObjectURL(file);
      newPhotos.push(objectUrl);
    });
    
    onPhotosChange(newPhotos);
  };
  
  const removePhoto = (index: number) => {
    const newPhotos = [...photos];
    newPhotos.splice(index, 1);
    onPhotosChange(newPhotos);
  };
  
  return (
    <div className="w-full max-w-lg mx-auto pb-6">
      <motion.h2 
        className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-center text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Fotos
      </motion.h2>
      
      <motion.p 
        className="text-gray-300 text-sm sm:text-base mb-4 sm:mb-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Selecione fotos para personalizar a página. Você pode adicionar até {maxPhotos} fotos.
      </motion.p>
      
      <motion.div
        className="space-y-4 sm:space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <label
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-4 sm:p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
            isDragging ? 'border-memcyan bg-memcyan/10' : 'border-gray-600 hover:border-gray-400'
          }`}
        >
          <input
            type="file"
            multiple
            accept="image/png, image/jpeg, image/jpg, image/gif"
            className="hidden"
            onChange={handleFileInput}
            disabled={photos.length >= maxPhotos}
          />
          
          <Upload className={`w-8 h-8 sm:w-10 sm:h-10 mb-2 ${isDragging ? 'text-memcyan' : 'text-gray-400'}`} />
          
          <p className="text-center text-gray-300 text-sm sm:text-base">
            Clique para adicionar fotos<br />
            <span className="text-xs sm:text-sm text-gray-500">PNG, JPG, JPEG, GIF (max. {maxPhotos} fotos)</span>
          </p>
        </label>
        
        {photos.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
            <AnimatePresence>
              {photos.map((photo, index) => (
                <motion.div
                  key={index}
                  className="relative aspect-square rounded-lg overflow-hidden group"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={photo}
                    alt={`Photo ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  
                  <motion.button
                    className="absolute top-2 right-2 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center opacity-80 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removePhoto(index)}
                  >
                    <X className="w-4 h-4 text-white" />
                  </motion.button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
        
        {photos.length === 0 && (
          <div className="flex justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-red-500/20 rounded-lg p-2 sm:p-3 text-red-300 text-xs sm:text-sm flex items-center"
            >
              <Image className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Nenhuma foto selecionada ainda
            </motion.div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default PhotoUploader;
