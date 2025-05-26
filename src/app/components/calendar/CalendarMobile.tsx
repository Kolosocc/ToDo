'use client';

import { useState } from 'react';
import CalendarHeader from '../../modules/calendar/CalendarHeader';
import CalendarGrid from '../../modules/calendar/CalendarGrid';

interface CalendarMobileProps {
  currentMonth: Date;
  onMonthChange: (offset: number) => void;
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

const CalendarMobile: React.FC<CalendarMobileProps> = ({
  currentMonth,
  onMonthChange,
  selectedDate,
  onDateSelect,
}) => {
  return (
    <div className='p-4 rounded-xl bg-white  dark:bg-gray-800 shadow-md'>
      <CalendarHeader
        currentMonth={currentMonth}
        onMonthChange={onMonthChange}
      />
      <CalendarGrid
        currentMonth={currentMonth}
        selectedDate={selectedDate}
        onDateSelect={onDateSelect}
      />
    </div>
  );
};

export default CalendarMobile;
