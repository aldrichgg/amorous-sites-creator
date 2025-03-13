
import { useState } from 'react';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval,
  setMonth,
  isSameDay,
  isSameMonth,
  isToday
} from 'date-fns';
import { pt } from 'date-fns/locale';

interface UseDatePickerReturn {
  currentMonth: Date;
  showMonthSelector: boolean;
  currentYear: number;
  daysInMonth: Date[];
  formattedMonth: string;
  prevMonth: () => void;
  nextMonth: () => void;
  toggleMonthSelector: () => void;
  handleMonthSelection: (monthIndex: number) => void;
  prevYear: () => void;
  nextYear: () => void;
  isDaySelected: (day: Date, selectedDate: Date | null) => boolean;
  isDayToday: (day: Date) => boolean;
  isDayInCurrentMonth: (day: Date) => boolean;
}

export const useDatePicker = (): UseDatePickerReturn => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showMonthSelector, setShowMonthSelector] = useState(false);
  
  // Get days of the month
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  // Format the current month
  const formattedMonth = format(currentMonth, 'MMMM yyyy', { locale: pt });
  
  // Current year
  const currentYear = currentMonth.getFullYear();
  
  // Previous month
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  
  // Next month
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  
  // Toggle month selector
  const toggleMonthSelector = () => {
    setShowMonthSelector(!showMonthSelector);
  };
  
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
  
  // Day selection helpers
  const isDaySelected = (day: Date, selectedDate: Date | null): boolean => {
    return selectedDate ? isSameDay(day, selectedDate) : false;
  };
  
  const isDayToday = (day: Date): boolean => {
    return isToday(day);
  };
  
  const isDayInCurrentMonth = (day: Date): boolean => {
    return isSameMonth(day, currentMonth);
  };
  
  return {
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
    nextYear,
    isDaySelected,
    isDayToday,
    isDayInCurrentMonth,
  };
};
