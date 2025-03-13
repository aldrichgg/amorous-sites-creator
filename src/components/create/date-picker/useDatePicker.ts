
import { useState, useCallback } from 'react';
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  addMonths,
  subMonths,
  addYears,
  subYears,
  format,
  isSameDay,
  isToday,
  isSameMonth
} from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface UseDatePickerReturn {
  currentMonth: Date;
  showMonthSelector: boolean;
  currentYear: number;
  daysInMonth: Date[];
  formattedMonth: string;
  toggleMonthSelector: () => void;
  handleMonthSelection: (month: number) => void;
  prevMonth: () => void;
  nextMonth: () => void;
  prevYear: () => void;
  nextYear: () => void;
  isDaySelected: (day: Date, selectedDate: Date | null) => boolean;
  isDayToday: (day: Date) => boolean;
  isDayInCurrentMonth: (day: Date, currentMonth?: Date) => boolean;
}

export const useDatePicker = (): UseDatePickerReturn => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showMonthSelector, setShowMonthSelector] = useState(false);
  
  const currentYear = currentMonth.getFullYear();
  
  // Get all days in current month
  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth)
  });
  
  // Format month for display (e.g., "Maio 2023")
  const formattedMonth = format(currentMonth, 'MMMM yyyy', { locale: ptBR });
  
  // Toggle month selector
  const toggleMonthSelector = useCallback(() => {
    setShowMonthSelector(prev => !prev);
  }, []);
  
  // Handle month selection
  const handleMonthSelection = useCallback((month: number) => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(month);
    setCurrentMonth(newDate);
    setShowMonthSelector(false);
  }, [currentMonth]);
  
  // Navigation methods
  const prevMonth = useCallback(() => {
    setCurrentMonth(prev => subMonths(prev, 1));
  }, []);
  
  const nextMonth = useCallback(() => {
    setCurrentMonth(prev => addMonths(prev, 1));
  }, []);
  
  const prevYear = useCallback(() => {
    setCurrentMonth(prev => subYears(prev, 1));
  }, []);
  
  const nextYear = useCallback(() => {
    setCurrentMonth(prev => addYears(prev, 1));
  }, []);
  
  // Helper methods for days
  const isDaySelected = (day: Date, selectedDate: Date | null): boolean => {
    if (!selectedDate) return false;
    return isSameDay(day, selectedDate);
  };
  
  const isDayToday = (day: Date): boolean => {
    return isToday(day);
  };
  
  const isDayInCurrentMonth = (day: Date, monthToCheck: Date = currentMonth): boolean => {
    return isSameMonth(day, monthToCheck);
  };
  
  return {
    currentMonth,
    showMonthSelector,
    currentYear,
    daysInMonth,
    formattedMonth,
    toggleMonthSelector,
    handleMonthSelection,
    prevMonth,
    nextMonth,
    prevYear,
    nextYear,
    isDaySelected,
    isDayToday,
    isDayInCurrentMonth
  };
};
