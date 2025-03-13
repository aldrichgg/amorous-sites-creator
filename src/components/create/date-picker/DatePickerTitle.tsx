
import React from 'react';
import { motion } from 'framer-motion';

const DatePickerTitle: React.FC = () => {
  return (
    <>
      <motion.h2 
        className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-center text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Contador de tempo
      </motion.h2>
      
      <motion.p 
        className="text-gray-300 text-sm sm:text-base mb-4 sm:mb-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Selecione a data de início que simbolize o início de relacionamento, amizade, etc.
      </motion.p>
    </>
  );
};

export default DatePickerTitle;
