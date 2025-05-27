'use client';

import { format } from 'date-fns';
import { ru } from 'date-fns/locale'; // Русская локализация
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface CalendarHeaderProps {
  currentMonth: Date;
  onMonthChange: (offset: number) => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentMonth,
  onMonthChange,
}) => {
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
