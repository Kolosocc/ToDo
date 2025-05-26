'use client';

import { useState, useEffect } from 'react';
import {
  startOfMonth,
  startOfWeek,
  addDays,
  format,
  isSameDay,
  isSameMonth,
} from 'date-fns';

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
    for (let i = 0; i < 30; i++) {
      // Покрываем до 5 недель
      days.push(addDays(startDate, i));
    }
    setCalendarDays(days);
  }, [currentMonth]);

  const tasksByDate = (date: Date): Task[] => {
    // Форматируем дату в YYYY-MM-DD
    const targetDateStr = format(date, 'yyyy-MM-dd');
    const targetMonthStr = format(date, 'yyyy-MM');

    return tasks.filter((t) => {
      // Извлекаем дату из createdAt
      const taskDate = new Date(t.createdAt);
      const taskDateStr = format(taskDate, 'yyyy-MM-dd');
      const taskMonthStr = format(taskDate, 'yyyy-MM');

      const isSameDayMatch = taskDateStr === targetDateStr;
      const isSameMonthMatch = taskMonthStr === targetMonthStr;

      return isSameDayMatch && isSameMonthMatch;
    });
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
      {calendarDays.map((day) => {
        const dayTasks = tasksByDate(day);

        return (
          <CalendarDayCell
            key={day.toISOString()}
            day={day}
            tasks={dayTasks}
            isSelected={selectedDate ? isSameDay(day, selectedDate) : false}
            isCurrentMonth={isSameMonth(day, currentMonth)}
            onDateSelect={onDateSelect}
          />
        );
      })}
    </div>
  );
};

export default CalendarGridDesktop;
