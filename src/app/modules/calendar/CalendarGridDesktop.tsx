'use client';

import { useState, useEffect } from 'react';
import {
  startOfMonth,
  startOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
} from 'date-fns';
import { ru } from 'date-fns/locale';
import { Task } from '@/app/types/task';
import CalendarDayCell from './CalendarDayCell';

interface CalendarGridDesktopProps {
  currentMonth: Date;
  tasks: Task[];
  selectedDate: Date | null;
  onDateSelect: (date: Date | null) => void;
}

const CalendarGridDesktop: React.FC<CalendarGridDesktopProps> = ({
  currentMonth,
  tasks,
  selectedDate,
  onDateSelect,
}) => {
  const [calendarDays, setCalendarDays] = useState<Date[]>([]);
  const weekdays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

  useEffect(() => {
    const monthStart = startOfMonth(currentMonth);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
    const days: Date[] = [];
    for (let i = 0; i < 21; i++) {
      days.push(addDays(startDate, i));
    }
    setCalendarDays(days);
  }, [currentMonth]);

  const tasksByDate = (date: Date) => {
    return tasks.filter(
      (t) =>
        isSameDay(new Date(t.createdAt), date) &&
        isSameMonth(new Date(t.createdAt), currentMonth)
    );
  };

  return (
    <div className='grid grid-cols-7 gap-4 mt-4'>
      {weekdays.map((weekday, index) => (
        <div
          key={index}
          className='text-center text-sm font-semibold text-gray-600 dark:text-gray-300'
        >
          {weekday}
        </div>
      ))}
      {calendarDays.map((day) => (
        <CalendarDayCell
          key={day.toISOString()}
          day={day}
          tasks={tasksByDate(day)}
          isSelected={selectedDate ? isSameDay(day, selectedDate) : false}
          isCurrentMonth={isSameMonth(day, currentMonth)}
          onDateSelect={onDateSelect} // Pass the parent's onDateSelect directly
        />
      ))}
    </div>
  );
};

export default CalendarGridDesktop;
