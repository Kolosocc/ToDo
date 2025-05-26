'use client';

import { useState } from 'react';
import CalendarGridMobile from '@/app/modules/calendar/CalendarGridMobile';
import CalendarHeader from '@/app/modules/calendar/CalendarHeader';
import { Task } from '@/app/types/task';

interface CalendarMobileProps {
  currentMonth: Date;
  onMonthChange: (offset: number) => void;
  selectedDate: Date | null; // Updated to allow null
  onDateSelect: (date: Date | null) => void;
  tasks: Task[];
}

const CalendarMobile: React.FC<CalendarMobileProps> = ({
  currentMonth,
  onMonthChange,
  selectedDate,
  onDateSelect,
  tasks,
}) => {
  return (
    <div className='p-4 rounded-xl bg-white dark:bg-gray-800'>
      <CalendarHeader
        currentMonth={currentMonth}
        onMonthChange={onMonthChange}
      />
      <CalendarGridMobile
        tasks={tasks}
        currentMonth={currentMonth}
        selectedDate={selectedDate}
        onDateSelect={onDateSelect}
      />
    </div>
  );
};

export default CalendarMobile;
