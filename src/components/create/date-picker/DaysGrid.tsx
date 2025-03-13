
import React from 'react';
import { format, isSameDay, isSameMonth, isToday } from 'date-fns';
import { useDatePicker } from './useDatePicker';

interface DaysGridProps {
  currentMonth: Date;
  daysInMonth: Date[];
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
}

const DaysGrid: React.FC<DaysGridProps> = ({
  currentMonth,
  daysInMonth,
  selectedDate,
  onDateSelect
}) => {
  const { isDaySelected, isDayToday, isDayInCurrentMonth } = useDatePicker();
  
  // Days of the week
  const daysOfWeek = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
  
  return (
    <div className="p-2 sm:p-4">
      <div className="grid grid-cols-7 mb-2 sm:mb-3">
        {daysOfWeek.map((day, i) => (
          <div 
            key={i} 
            className="h-6 sm:h-8 flex items-center justify-center text-xs sm:text-sm text-gray-400 font-medium"
          >
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1 sm:gap-2">
        {Array.from({ length: new Date(daysInMonth[0]).getDay() }).map((_, i) => (
          <div key={`empty-${i}`} className="h-8 sm:h-10"></div>
        ))}
        
        {daysInMonth.map((day, i) => {
          const isSelected = isDaySelected(day, selectedDate);
          const isToday = isDayToday(day);
          const isCurrentMonth = isDayInCurrentMonth(day, currentMonth);
          
          return (
            <button
              key={i}
              className={`h-8 w-8 sm:h-10 sm:w-10 rounded-full flex items-center justify-center text-xs sm:text-sm transition-all duration-200 relative
                ${isToday && !isSelected ? 'text-memcyan font-bold' : ''}
                ${isCurrentMonth ? 'text-white' : 'text-gray-600'}
                ${isSelected 
                  ? 'bg-gradient-to-r from-memblue to-memcyan text-white font-medium shadow-lg shadow-memcyan/20' 
                  : 'hover:bg-gray-800/70'}`}
              onClick={() => onDateSelect(day)}
            >
              {isToday && !isSelected && (
                <span className="absolute inset-0 rounded-full border border-memcyan animate-pulse"></span>
              )}
              {format(day, 'd')}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DaysGrid;
