
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, CheckCircle2, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { createMemory } from '@/services/memoryService';

interface NavigationButtonsProps {
  onPrevious: () => void;
  onNext: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  nextLabel?: string;
  isDisabled?: boolean;
  memoryData?: any; // This would contain the full memory data
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  onPrevious,
  onNext,
  isFirstStep,
  isLastStep,
  nextLabel = 'Próxima etapa',
  isDisabled = false,
  memoryData
}) => {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);

  const saveMemoryToDatabase = async () => {
    if (!memoryData) return null;
    
    try {
      setIsSaving(true);
      
      // Create URL-friendly slug
      const pageName = memoryData.pageName
        .toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Remove accents
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/[^\w-]+/g, ''); // Remove non-alphanumeric characters
        
      // Map data to our memory service format
      const memoryToSave = {
        pageTitle: memoryData.pageTitle,
        pageName: pageName,
        email: memoryData.email,
        startDate: memoryData.startDate || new Date(),
        message: memoryData.message,
        spotifyUrl: memoryData.spotifyUrl,
        spotifyTrackId: memoryData.spotifyTrackId,
        selectedEmoji: memoryData.selectedEmoji,
        selectedPlan: memoryData.selectedPlan === 'forever' ? 'forever' : 'annual'
      };
      
      const memoryId = await createMemory(memoryToSave, memoryData.photos || []);
      
      if (!memoryId) {
        toast.error("Erro ao salvar sua memória. Por favor, tente novamente.");
        setIsSaving(false);
        return null;
      }
      
      return pageName;
    } catch (error) {
      console.error("Error saving memory:", error);
      toast.error("Ocorreu um erro ao salvar sua memória");
      setIsSaving(false);
      return null;
    }
  };

  const handleNext = async () => {
    if (isLastStep) {
      if (isSaving) return;
      
      // Save memory data to Supabase
      const pageName = await saveMemoryToDatabase();
      
      if (pageName) {
        // Navigate to payment page with memory info
        navigate('/payment', { 
          state: { 
            memorySlug: pageName,
            memoryData: {
              ...memoryData,
              pageName
            }
          } 
        });
      }
    } else {
      onNext();
    }
  };

  return (
    <div className="flex justify-between w-full max-w-lg mx-auto pt-4">
      {!isFirstStep ? (
        <motion.button
          onClick={onPrevious}
          className="flex items-center justify-center px-2 sm:px-4 py-2 rounded-lg border border-gray-700 bg-black/50 text-white hover:bg-gray-900 transition-all duration-300 text-sm sm:text-base"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-1" />
          <span className="hidden sm:inline">Voltar etapa</span>
          <span className="sm:hidden">Voltar</span>
        </motion.button>
      ) : (
        <div></div>
      )}
      
      <motion.button
        onClick={handleNext}
        disabled={isDisabled || isSaving}
        className={`flex items-center justify-center px-2 sm:px-4 py-2 rounded-lg bg-gradient-to-r from-memblue to-memcyan text-white transition-all duration-300 text-sm sm:text-base ${
          isDisabled || isSaving
            ? 'opacity-50 cursor-not-allowed' 
            : 'hover:shadow-lg hover:from-memblue-dark hover:to-memcyan-dark hover:scale-105'
        }`}
        whileHover={!isDisabled && !isSaving ? { scale: 1.05 } : undefined}
        whileTap={!isDisabled && !isSaving ? { scale: 0.95 } : undefined}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {isLastStep ? (
          <>
            {isSaving ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                <span>Salvando...</span>
              </>
            ) : (
              <>
                <span>Finalizar</span>
                <CheckCircle2 className="w-5 h-5 ml-1 text-green-400" />
              </>
            )}
          </>
        ) : (
          <>
            <span className="hidden sm:inline">{nextLabel}</span>
            <span className="sm:hidden">Próxima</span>
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1" />
          </>
        )}
      </motion.button>
    </div>
  );
};

export default NavigationButtons;
