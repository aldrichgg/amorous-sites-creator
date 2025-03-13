
import React, { useEffect, useState } from 'react';
import { Calendar } from 'lucide-react';

interface DateCounterProps {
  startDate: Date | null;
}

const DateCounter: React.FC<DateCounterProps> = ({ startDate }) => {
  const [timeString, setTimeString] = useState<string>('');
  
  useEffect(() => {
    if (!startDate) return;
    
    // Update the counter every second
    const timer = setInterval(() => {
      setTimeString(calculateTimeDifference(startDate));
    }, 1000);
    
    // Initial calculation
    setTimeString(calculateTimeDifference(startDate));
    
    return () => clearInterval(timer);
  }, [startDate]);
  
  if (!startDate) return null;
  
  // Format date for display
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    }).format(date);
  };

  // Calculate time difference in detailed format (hours, minutes, seconds)
  const calculateTimeDifference = (date: Date): string => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    
    // Calculate hours, minutes, and seconds
    const totalSeconds = Math.floor(diffTime / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    // Format the string
    return `${hours} ${hours === 1 ? 'hora' : 'horas'}, ${minutes} ${minutes === 1 ? 'minuto' : 'minutos'} e ${seconds} ${seconds === 1 ? 'segundo' : 'segundos'}`;
  };
  
  return (
    <div className="text-center mb-4">
      <div className="text-2xl font-bold text-memcyan">
        {timeString}
      </div>
      <div className="flex items-center justify-center text-gray-300 text-xs">
        <Calendar className="w-3 h-3 mr-1 text-memcyan" />
        <span>Desde {formatDate(startDate)}</span>
      </div>
    </div>
  );
};

export default DateCounter;
