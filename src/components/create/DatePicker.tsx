
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

// Import components
import MonthSelector from './date-picker/MonthSelector';
import DaysGrid from './date-picker/DaysGrid';
import DateDisplay from './date-picker/DateDisplay';

// Import custom hook
import { useDatePicker } from './date-picker/useDatePicker';

interface DatePickerProps {
  selectedDate: Date | null;
  onDateChange: (date: Date) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({
  selectedDate,
  onDateChange
}) => {
  const {
    currentMonth,
    showMonthSelector,
    currentYear,
    daysInMonth,
    formattedMonth,
    prevMonth,
    nextMonth,
    toggleMonthSelector,
    handleMonthSelection,
    prevYear,
    nextYear
  } = useDatePicker();
  
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
            onClick={toggleMonthSelector}
          >
            {formattedMonth}
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
