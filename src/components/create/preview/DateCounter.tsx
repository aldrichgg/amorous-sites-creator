
import React, { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import { formatTimeDifference } from '@/lib/date-utils';
import { formatDateForDisplay } from '@/lib/date-utils';

interface DateCounterProps {
  startDate: Date | null;
}

const DateCounter: React.FC<DateCounterProps> = ({ startDate }) => {
  const [timeString, setTimeString] = useState<string>('');
  
  useEffect(() => {
    if (!startDate) return;
    
    // Update the counter every second
    const timer = setInterval(() => {
      setTimeString(formatTimeDifference(startDate));
    }, 1000);
    
    // Initial calculation
    setTimeString(formatTimeDifference(startDate));
    
    return () => clearInterval(timer);
  }, [startDate]);
  
  if (!startDate) return null;
  
  return (
    <div className="text-center mb-4">
      <div className="text-2xl font-bold text-memcyan">
        {timeString}
      </div>
      <div className="flex items-center justify-center text-gray-300 text-xs">
        <Heart className="w-3 h-3 mr-1 text-[#ea384c] fill-[#ea384c]" />
        <span>Desde {formatDateForDisplay(startDate)}</span>
      </div>
    </div>
  );
};

export default DateCounter;
