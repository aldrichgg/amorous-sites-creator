
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Edit3, Check, X } from 'lucide-react';
import { checkPageNameAvailability } from '@/services/memoryService';
import { toast } from 'sonner';

interface PageTitleInputProps {
  title: string;
  onTitleChange: (title: string) => void;
  label: string;
  description: string;
  placeholder: string;
  checkAvailability?: boolean;
}

const PageTitleInput: React.FC<PageTitleInputProps> = ({
  title,
  onTitleChange,
  label,
  description,
  placeholder,
  checkAvailability = false
}) => {
  const [inputValue, setInputValue] = useState(title);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [debouncedValue, setDebouncedValue] = useState(title);
  
  // Handle immediate input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    
    if (checkAvailability) {
      setIsAvailable(null);
    } else {
      // If we're not checking availability, update parent state immediately
      onTitleChange(value);
    }
  };
  
  // Update the debounced value after typing stops
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, 500); // 500ms delay

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue]);
  
  // Check availability when debounced value changes
  useEffect(() => {
    const checkAvailabilityAsync = async () => {
      if (!checkAvailability || !debouncedValue) return;
      
      try {
        setIsChecking(true);
        const available = await checkPageNameAvailability(debouncedValue);
        setIsAvailable(available);
        setIsChecking(false);
        
        // Update parent state if available
        if (available) {
          onTitleChange(debouncedValue);
        } else {
          toast.error("Nome de página já está em uso. Por favor, escolha outro nome.");
        }
      } catch (error) {
        console.error("Error checking availability:", error);
        setIsChecking(false);
        setIsAvailable(null);
      }
    };
    
    checkAvailabilityAsync();
  }, [debouncedValue, checkAvailability, onTitleChange]);
  
  // Format the value to display in the message
  const getFormattedPageName = (value: string) => {
    return value
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '');
  };
  
  const handleBlur = () => {
    // If we're not checking availability, update parent state on blur
    if (!checkAvailability) {
      onTitleChange(inputValue);
    } else if (isAvailable) {
      // If checking availability and it's available, update parent state
      onTitleChange(inputValue);
    }
  };
  
  return (
    <div className="w-full max-w-lg mx-auto pb-6">
      <motion.h2 
        className="text-3xl font-bold mb-4 text-center text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {label}
      </motion.h2>
      
      <motion.p 
        className="text-gray-300 mb-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {description}
      </motion.p>
      
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          className="w-full px-4 py-3 rounded-lg bg-black/60 border border-memblue/30 text-white focus:outline-none focus:ring-2 focus:ring-memcyan transition-all duration-300 placeholder-gray-500"
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          {checkAvailability ? (
            isChecking ? (
              <div className="h-5 w-5 rounded-full border-2 border-memcyan border-t-transparent animate-spin"></div>
            ) : isAvailable === true ? (
              <Check className="h-5 w-5 text-green-500" />
            ) : isAvailable === false ? (
              <X className="h-5 w-5 text-red-500" />
            ) : (
              <Edit3 className="h-5 w-5 text-gray-400" />
            )
          ) : (
            <Edit3 className="h-5 w-5 text-gray-400" />
          )}
        </div>
      </motion.div>
      
      {checkAvailability && inputValue && (
        <motion.div
          className="mt-2 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {isChecking ? (
            <p className="text-gray-400">Verificando disponibilidade...</p>
          ) : isAvailable === true ? (
            <p className="text-green-500">
              ✓ URL disponível: loveiit.com/{getFormattedPageName(inputValue)}
            </p>
          ) : isAvailable === false ? (
            <p className="text-red-500">
              ✗ Este nome já está em uso. Por favor, escolha outro.
            </p>
          ) : null}
        </motion.div>
      )}
    </div>
  );
};

export default PageTitleInput;
