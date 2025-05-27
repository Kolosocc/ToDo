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
import { Task } from '@/app/types/task';
import CalendarMobileDayCell from './CalendarMobileDayCell';

interface CalendarGridMobileProps {
  currentMonth: Date;
  selectedDate: Date | null;
  onDateSelect: (date: Date | null) => void;
  tasks: Task[];
}

const CalendarGridMobile: React.FC<CalendarGridMobileProps> = ({
  currentMonth,
  selectedDate,
  onDateSelect,
  tasks,
}) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDate = endOfMonth(monthEnd);
  const weekdays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

  const tasksByDate = (date: Date): Task[] => {
    const targetDateStr = format(date, 'yyyy-MM-dd');
    return tasks.filter((t) => {
      const taskDateStr = format(new Date(t.createdAt), 'yyyy-MM-dd');
      return taskDateStr === targetDateStr;
    });
  };

  const days = [];
  let day = startDate;

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      const cloneDay = day;
      days.push(
        <CalendarMobileDayCell
          key={cloneDay.toISOString()}
          day={cloneDay}
          tasks={tasksByDate(cloneDay)}
          isSelected={selectedDate ? isSameDay(cloneDay, selectedDate) : false}
          isCurrentMonth={isSameMonth(cloneDay, monthStart)}
          onDateSelect={onDateSelect}
        />
      );
      day = addDays(day, 1);
    }
  }

  return (
    <div className='grid grid-cols-7 gap-1'>
      {weekdays.map((weekday, index) => (
        <div
          key={index}
          className='text-center text-sm font-semibold text-gray-600 dark:text-gray-300'
        >
          {weekday}
        </div>
      ))}
      {days}
    </div>
  );
};

export default CalendarGridMobile;
