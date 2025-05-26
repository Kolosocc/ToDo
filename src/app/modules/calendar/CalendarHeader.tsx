'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale'; // Русская локализация
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
        aria-label='Предыдущий месяц'
      >
        <FiChevronLeft size={24} />
      </button>

      <h2 className='text-lg font-semibold'>
        {format(currentMonth, 'MMMM yyyy', { locale: ru })}{' '}
        {/* Отображаем месяц и год на русском */}
      </h2>

      <button
        onClick={() => onMonthChange(1)}
        className='p-1 hover:text-blue-600 transition'
        aria-label='Следующий месяц'
      >
        <FiChevronRight size={24} />
      </button>
    </div>
  );
};

export default CalendarHeader;
