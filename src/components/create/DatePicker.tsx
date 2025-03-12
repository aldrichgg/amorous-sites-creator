
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isSameDay } from 'date-fns';
import { pt } from 'date-fns/locale';

interface DatePickerProps {
  selectedDate: Date | null;
  onDateChange: (date: Date) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({
  selectedDate,
  onDateChange
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
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
  
  return (
    <div className="w-full max-w-lg mx-auto pb-6">
      <motion.h2 
        className="text-3xl font-bold mb-4 text-center text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Contador de tempo
      </motion.h2>
      
      <motion.p 
        className="text-gray-300 mb-6 text-center"
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
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <button 
            onClick={prevMonth}
            className="p-2 rounded-full hover:bg-gray-800 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-400" />
          </button>
          
          <h2 className="text-white text-lg font-medium">
            {format(currentMonth, 'MMMM yyyy', { locale: pt })}
          </h2>
          
          <button 
            onClick={nextMonth}
            className="p-2 rounded-full hover:bg-gray-800 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>
        
        <div className="p-3">
          <div className="grid grid-cols-7 mb-2">
            {daysOfWeek.map((day, i) => (
              <div 
                key={i} 
                className="h-8 flex items-center justify-center text-sm text-gray-500 font-medium"
              >
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: new Date(monthStart).getDay() }).map((_, i) => (
              <div key={`empty-${i}`} className="h-8"></div>
            ))}
            
            {daysInMonth.map((day, i) => {
              const isSelected = selectedDate ? isSameDay(day, selectedDate) : false;
              return (
                <button
                  key={i}
                  className={`h-8 w-8 rounded-full flex items-center justify-center text-sm transition-colors ${
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
      </motion.div>
    </div>
  );
};

export default DatePicker;
