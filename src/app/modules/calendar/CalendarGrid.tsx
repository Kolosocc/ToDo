'use client';

import {
  addDays,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  endOfMonth,
  startOfWeek,
} from 'date-fns';

interface CalendarGridProps {
  currentMonth: Date;
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({
  currentMonth,
  selectedDate,
  onDateSelect,
}) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDate = endOfMonth(monthEnd);

  const days = [];
  let day = startDate;

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      const cloneDay = day;
      days.push(
        <button
          key={cloneDay.toISOString()}
          className={`p-2 text-sm rounded-full w-10 h-10
            ${isSameDay(cloneDay, selectedDate) ? 'bg-blue-500 text-white' : ''}
            ${!isSameMonth(cloneDay, monthStart) ? 'text-gray-400' : ''}
            hover:bg-blue-100 dark:hover:bg-blue-900 transition`}
          onClick={() => onDateSelect(cloneDay)}
        >
          {format(cloneDay, 'd')}
        </button>
      );
      day = addDays(day, 1);
    }
  }

  return <div className='grid grid-cols-7 gap-1'>{days}</div>;
};

export default CalendarGrid;
