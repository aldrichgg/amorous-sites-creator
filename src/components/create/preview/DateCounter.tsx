
import React from 'react';
import { Calendar } from 'lucide-react';

interface DateCounterProps {
  startDate: Date | null;
}

const DateCounter: React.FC<DateCounterProps> = ({ startDate }) => {
  if (!startDate) return null;
  
  // Format date for display
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    }).format(date);
  };

  // Calculate time difference
  const calculateTimeDifference = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);
    
    if (diffYears > 0) {
      return `${diffYears} ${diffYears === 1 ? 'ano' : 'anos'}`;
    } else if (diffMonths > 0) {
      return `${diffMonths} ${diffMonths === 1 ? 'mês' : 'meses'}`;
    } else {
      return `${diffDays} ${diffDays === 1 ? 'dia' : 'dias'}`;
    }
  };
  
  return (
    <div className="text-center mb-4">
      <div className="text-2xl font-bold text-memcyan">
        {calculateTimeDifference(startDate)}
      </div>
      <div className="flex items-center justify-center text-gray-300 text-xs">
        <Calendar className="w-3 h-3 mr-1 text-memcyan" />
        <span>Desde {formatDate(startDate)}</span>
      </div>
    </div>
  );
};

export default DateCounter;
