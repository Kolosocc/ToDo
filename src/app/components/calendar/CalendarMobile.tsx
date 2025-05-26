'use client';

import { useState } from 'react';

import CalendarGridMobile from '@/app/modules/calendar/CalendarGridMobile';
import CalendarHeader from '@/app/modules/calendar/CalendarHeader';

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
    <div className='p-4 rounded-xl bg-white  dark:bg-gray-800 '>
      <CalendarHeader
        currentMonth={currentMonth}
        onMonthChange={onMonthChange}
      />
      <CalendarGridMobile
        currentMonth={currentMonth}
        selectedDate={selectedDate}
        onDateSelect={onDateSelect}
      />
    </div>
  );
};

export default CalendarMobile;
