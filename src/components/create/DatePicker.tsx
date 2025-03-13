
import React from 'react';
import DatePickerTitle from './date-picker/DatePickerTitle';
import DatePickerSelector from './date-picker/DatePickerSelector';

interface DatePickerProps {
  selectedDate: Date | null;
  onDateChange: (date: Date) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({
  selectedDate,
  onDateChange
}) => {
  return (
    <div className="w-full max-w-lg mx-auto pb-6">
      <DatePickerTitle />
      <DatePickerSelector 
        selectedDate={selectedDate} 
        onDateChange={onDateChange} 
      />
    </div>
  );
};

export default DatePicker;
