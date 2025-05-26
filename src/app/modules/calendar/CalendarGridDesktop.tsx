'use client';

import { useState, useEffect } from 'react';
import {
  startOfMonth,
  startOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
} from 'date-fns';
import { ru } from 'date-fns/locale'; // Русская локализация
import { Task } from '@/app/types/task';
import CalendarDayCell from './CalendarDayCell';

interface CalendarGridDesktopProps {
  currentMonth: Date;
  tasks: Task[];
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

const CalendarGridDesktop: React.FC<CalendarGridDesktopProps> = ({
  currentMonth,
  tasks,
  selectedDate,
  onDateSelect,
}) => {
  const [calendarDays, setCalendarDays] = useState<Date[]>([]);

  useEffect(() => {
    const monthStart = startOfMonth(currentMonth);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 }); // Начинаем с понедельника
    const days: Date[] = [];
    // Генерируем только 14 дней (2 недели)
    for (let i = 0; i < 21; i++) {
      days.push(addDays(startDate, i));
    }
    setCalendarDays(days);
  }, [currentMonth]);

  // Фильтрация задач по дате
  const tasksByDate = (date: Date) => {
    return tasks.filter(
      (t) =>
        isSameDay(new Date(t.createdAt), date) &&
        isSameMonth(new Date(t.createdAt), currentMonth)
    );
  };

  // Названия дней недели на русском
  const weekdays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

  return (
    <div className='grid grid-cols-7 gap-4 mt-4'>
      {/* Заголовки дней недели */}
      {weekdays.map((weekday, index) => (
        <div
          key={index}
          className='text-center text-sm font-semibold text-gray-600 dark:text-gray-300'
        >
          {weekday}
        </div>
      ))}
      {/* Сетка дней */}
      {calendarDays.map((day) => (
        <CalendarDayCell
          key={day.toISOString()}
          day={day}
          tasks={tasksByDate(day)}
          isSelected={isSameDay(day, selectedDate)}
          isCurrentMonth={isSameMonth(day, currentMonth)}
          onDateSelect={onDateSelect}
        />
      ))}
    </div>
  );
};

export default CalendarGridDesktop;
