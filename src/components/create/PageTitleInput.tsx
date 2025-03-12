
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit3 } from 'lucide-react';

interface PageTitleInputProps {
  title: string;
  onTitleChange: (title: string) => void;
  label: string;
  description: string;
  placeholder: string;
}

const PageTitleInput: React.FC<PageTitleInputProps> = ({
  title,
  onTitleChange,
  label,
  description,
  placeholder
}) => {
  const [inputValue, setInputValue] = useState(title);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  
  const handleBlur = () => {
    onTitleChange(inputValue);
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
          <Edit3 className="h-5 w-5 text-gray-400" />
        </div>
      </motion.div>
    </div>
  );
};

export default PageTitleInput;
