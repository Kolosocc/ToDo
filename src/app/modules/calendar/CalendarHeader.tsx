'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useIsDesktop } from '@/app/hooks/useIsDesktop';

interface CalendarHeaderProps {
  currentMonth: Date;
  onMonthChange: (offset: number) => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentMonth,
  onMonthChange,
}) => {
  const isDesktop = useIsDesktop();

  return (
    <div className='flex justify-between items-center mb-2'>
      <button
        onClick={() => onMonthChange(-1)}
        className='p-1 hover:text-blue-600 transition'
        aria-label='Previous month'
      >
        <FiChevronLeft size={24} />
      </button>

      <h2 className='text-lg font-semibold'>
        {format(currentMonth, 'MMMM yyyy')}
      </h2>

      <button
        onClick={() => onMonthChange(1)}
        className='p-1 hover:text-blue-600 transition'
        aria-label='Next month'
      >
        <FiChevronRight size={24} />
      </button>
    </div>
  );
};

export default CalendarHeader;
