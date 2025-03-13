
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isSameDay, setMonth, setYear } from 'date-fns';
import { pt } from 'date-fns/locale';
import { Input } from '@/components/ui/input';

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
  
  // Days of the week
  const daysOfWeek = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
  
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
    const newDate = setYear(currentMonth, currentYear - 1);
    setCurrentMonth(newDate);
  };
  
  // Next year
  const nextYear = () => {
    const newDate = setYear(currentMonth, currentYear + 1);
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
            <motion.div 
              className="p-3 sm:p-4 bg-black/90"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center justify-between mb-4">
                <button 
                  onClick={prevYear}
                  className="p-1 sm:p-2 rounded-full hover:bg-gray-800 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                </button>
                
                <span className="text-white text-lg font-bold">{currentYear}</span>
                
                <button 
                  onClick={nextYear}
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
                      onClick={() => handleMonthSelection(month.value)}
                    >
                      {month.name}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <div className="p-2 sm:p-3">
              <div className="grid grid-cols-7 mb-1 sm:mb-2">
                {daysOfWeek.map((day, i) => (
                  <div 
                    key={i} 
                    className="h-6 sm:h-8 flex items-center justify-center text-xs sm:text-sm text-gray-500 font-medium"
                  >
                    {day}
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: new Date(monthStart).getDay() }).map((_, i) => (
                  <div key={`empty-${i}`} className="h-6 sm:h-8"></div>
                ))}
                
                {daysInMonth.map((day, i) => {
                  const isSelected = selectedDate ? isSameDay(day, selectedDate) : false;
                  return (
                    <button
                      key={i}
                      className={`h-6 w-6 sm:h-8 sm:w-8 rounded-full flex items-center justify-center text-xs sm:text-sm transition-colors ${
                        isToday(day) ? 'text-memcyan font-bold' : 
                        isSameMonth(day, currentMonth) ? 'text-white' : 'text-gray-600'
                      } ${
                        isSelected ? 'bg-memblue text-white' : 'hover:bg-gray-800'
                      }`}
                      onClick={() => onDateChange(day)}
                    >
                      {format(day, 'd')}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </AnimatePresence>
        
        {/* Display the selected date in an input below the calendar */}
        {selectedDate && (
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
        )}
      </motion.div>
    </div>
  );
};

export default DatePicker;
