
import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Input } from '@/components/ui/input';

interface DateDisplayProps {
  selectedDate: Date;
}

const DateDisplay: React.FC<DateDisplayProps> = ({ selectedDate }) => {
  return (
    <motion.div 
      className="p-3 sm:p-4 border-t border-gray-700"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col sm:flex-row items-center gap-2">
        <label className="text-sm text-gray-400">Data selecionada:</label>
        <Input
          value={format(selectedDate, 'dd/MM/yyyy')}
          className="bg-gray-800 border-gray-700 text-white text-center"
          readOnly
        />
      </div>
    </motion.div>
  );
};

export default DateDisplay;
