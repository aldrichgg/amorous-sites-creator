
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
        {Array.from({ length: new Date(daysInMonth[0]).getDay() }).map((_, i) => (
          <div key={`empty-${i}`} className="h-6 sm:h-8"></div>
        ))}
        
        {daysInMonth.map((day, i) => {
          const isSelected = isDaySelected(day, selectedDate);
          return (
            <button
              key={i}
              className={`h-6 w-6 sm:h-8 sm:w-8 rounded-full flex items-center justify-center text-xs sm:text-sm transition-colors ${
                isDayToday(day) ? 'text-memcyan font-bold' : 
                isDayInCurrentMonth(day) ? 'text-white' : 'text-gray-600'
              } ${
                isSelected ? 'bg-memblue text-white' : 'hover:bg-gray-800'
              }`}
              onClick={() => onDateSelect(day)}
            >
              {format(day, 'd')}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DaysGrid;
