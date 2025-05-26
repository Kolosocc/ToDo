'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
} from 'date-fns';
import CalendarHeader from '../../modules/calendar/CalendarHeader';

import { Task } from '@/app/types/task';

interface CalendarDesktopProps {
  currentMonth: Date;
  tasks: Task[];
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  onMonthChange: (offset: number) => void;
}

const MAX_DESC_LENGTH = Number(process.env.NEXT_PUBLIC_THEME_KEY) || 100;

const CalendarDesktop: React.FC<CalendarDesktopProps> = ({
  currentMonth,
  tasks,
  selectedDate,
  onDateSelect,
  onMonthChange,
}) => {
  // Генерируем дни календаря — 6 недель по 7 дней (42 дня)
  const [calendarDays, setCalendarDays] = useState<Date[]>([]);

  useEffect(() => {
    const monthStart = startOfMonth(currentMonth);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
    const days: Date[] = [];
    for (let i = 0; i < 42; i++) {
      days.push(addDays(startDate, i));
    }
    setCalendarDays(days);
  }, [currentMonth]);

  // Фильтрация задач по дате создания, показываем задачи, которые "созданы" в этот день
  const tasksByDate = (date: Date) => {
    return tasks.filter(
      (t) =>
        isSameDay(new Date(t.createdAt), date) && // используем createdAt
        isSameMonth(new Date(t.createdAt), currentMonth)
    );
  };

  return (
    <div className='p-4 rounded-xl bg-white dark:bg-gray-800 shadow-md'>
      {/* Хедер один раз */}
      <CalendarHeader
        currentMonth={currentMonth}
        onMonthChange={onMonthChange}
      />

      {/* Сетка календаря */}
      <div className='grid grid-cols-7 gap-4 mt-4'>
        {calendarDays.map((day) => {
          const dayTasks = tasksByDate(day);
          const isSelected = isSameDay(day, selectedDate);
          const isCurrentMonth = isSameMonth(day, currentMonth);

          return (
            <motion.div
              key={day.toISOString()}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              onClick={() => onDateSelect(day)}
              className={`p-4 rounded-lg cursor-pointer border
                ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900'
                    : 'border-gray-300 dark:border-gray-700'
                }
                ${!isCurrentMonth ? 'opacity-50' : ''}
                hover:border-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900`}
            >
              <div className='font-semibold mb-2'>{format(day, 'd MMM')}</div>
              <div className='space-y-2 max-h-48 overflow-y-auto'>
                {dayTasks.length === 0 ? (
                  <p className='text-gray-400 dark:text-gray-500 text-sm'>
                    Нет задач
                  </p>
                ) : (
                  <AnimatePresence>
                    {dayTasks.map((task) => (
                      <motion.div
                        key={task.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className='bg-blue-100 dark:bg-blue-900 p-2 rounded-md'
                      >
                        <h4 className='font-semibold text-sm truncate'>
                          {task.title}
                        </h4>
                        <p className='text-xs text-gray-700 dark:text-gray-300'>
                          {task.description
                            ? task.description.length > MAX_DESC_LENGTH
                              ? task.description.slice(0, MAX_DESC_LENGTH) +
                                '...'
                              : task.description
                            : ''}
                        </p>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarDesktop;
