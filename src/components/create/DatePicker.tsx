
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, setMonth } from 'date-fns';
import { pt } from 'date-fns/locale';

// Import new component files
import MonthSelector from './date-picker/MonthSelector';
import DaysGrid from './date-picker/DaysGrid';
import DateDisplay from './date-picker/DateDisplay';

interface DatePickerProps {
  selectedDate: Date | null;
  onDateChange: (date: Date) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({
  selectedDate,
  onDateChange
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showMonthSelector, setShowMonthSelector] = useState(false);
  
  // Previous month
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  
  // Next month
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  
  // Get days of the month
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  // Current year
  const currentYear = currentMonth.getFullYear();

  // Handle month selection
  const handleMonthSelection = (monthIndex: number) => {
    const newDate = setMonth(currentMonth, monthIndex);
    setCurrentMonth(newDate);
    setShowMonthSelector(false);
  };
  
  // Previous year
  const prevYear = () => {
    const newDate = setMonth(currentMonth, currentMonth.getMonth());
    newDate.setFullYear(currentYear - 1);
    setCurrentMonth(newDate);
  };
  
  // Next year
  const nextYear = () => {
    const newDate = setMonth(currentMonth, currentMonth.getMonth());
    newDate.setFullYear(currentYear + 1);
    setCurrentMonth(newDate);
  };
  
  return (
    <div className="w-full max-w-lg mx-auto pb-6">
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
      
      <motion.div
        className="bg-black/60 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-700">
          <button 
            onClick={prevMonth}
            className="p-1 sm:p-2 rounded-full hover:bg-gray-800 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
          </button>
          
          <button 
            className="flex items-center text-white text-base sm:text-lg font-medium hover:bg-gray-800/50 py-1 px-3 rounded-md transition-colors"
            onClick={() => setShowMonthSelector(!showMonthSelector)}
          >
            {format(currentMonth, 'MMMM yyyy', { locale: pt })}
          </button>
          
          <button 
            onClick={nextMonth}
            className="p-1 sm:p-2 rounded-full hover:bg-gray-800 transition-colors"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
          </button>
        </div>
        
        <AnimatePresence mode="wait">
          {showMonthSelector ? (
            <MonthSelector 
              currentMonth={currentMonth}
              currentYear={currentYear}
              onMonthSelect={handleMonthSelection}
              onPrevYear={prevYear}
              onNextYear={nextYear}
            />
          ) : (
            <DaysGrid 
              currentMonth={currentMonth}
              daysInMonth={daysInMonth}
              selectedDate={selectedDate}
              onDateSelect={onDateChange}
            />
          )}
        </AnimatePresence>
        
        {/* Display the selected date in an input below the calendar */}
        {selectedDate && <DateDisplay selectedDate={selectedDate} />}
      </motion.div>
    </div>
  );
};

export default DatePicker;
