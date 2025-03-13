
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { setYear } from 'date-fns';

interface MonthSelectorProps {
  currentMonth: Date;
  currentYear: number;
  onMonthSelect: (monthIndex: number) => void;
  onPrevYear: () => void;
  onNextYear: () => void;
}

const MonthSelector: React.FC<MonthSelectorProps> = ({
  currentMonth,
  currentYear,
  onMonthSelect,
  onPrevYear,
  onNextYear
}) => {
  // Months
  const months = [
    { name: 'jan.', value: 0 },
    { name: 'fev.', value: 1 },
    { name: 'mar.', value: 2 },
    { name: 'abr.', value: 3 },
    { name: 'mai.', value: 4 },
    { name: 'jun.', value: 5 },
    { name: 'jul.', value: 6 },
    { name: 'ago.', value: 7 },
    { name: 'set.', value: 8 },
    { name: 'out.', value: 9 },
    { name: 'nov.', value: 10 },
    { name: 'dez.', value: 11 },
  ];
  
  return (
    <motion.div 
      className="p-3 sm:p-4 bg-black/90"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center justify-between mb-4">
        <button 
          onClick={onPrevYear}
          className="p-1 sm:p-2 rounded-full hover:bg-gray-800 transition-colors"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
        </button>
        
        <span className="text-white text-lg font-bold">{currentYear}</span>
        
        <button 
          onClick={onNextYear}
          className="p-1 sm:p-2 rounded-full hover:bg-gray-800 transition-colors"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
        </button>
      </div>
      
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {months.map((month) => {
          const isSelected = month.value === currentMonth.getMonth();
          return (
            <button
              key={month.value}
              className={`p-2 sm:p-3 rounded-md text-sm sm:text-base font-medium transition-colors ${
                isSelected 
                  ? 'bg-memblue text-white' 
                  : 'text-gray-200 hover:bg-gray-800'
              }`}
              onClick={() => onMonthSelect(month.value)}
            >
              {month.name}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default MonthSelector;
