'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { format, isSameDay } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Task } from '@/app/types/task';

interface CalendarDayCellProps {
  day: Date;
  tasks: Task[];
  isSelected: boolean;
  isCurrentMonth: boolean;
  onDateSelect: (date: Date | null) => void;
}

const MAX_DESC_LENGTH = Number(process.env.NEXT_PUBLIC_THEME_KEY) || 100;

const CalendarDayCell: React.FC<CalendarDayCellProps> = ({
  day,
  tasks,
  isSelected,
  isCurrentMonth,
  onDateSelect,
}) => {
  let inlineStyle: React.CSSProperties = {
    padding: '0.25rem',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    borderWidth: '1px',
    opacity: isCurrentMonth ? 1 : 0.5,
    transition: 'background-color 0.2s, border-color 0.2s, opacity 0.2s',
  };
  let displayText = '';

  if (isSelected) {
    inlineStyle = {
      ...inlineStyle,
      borderColor: '#3b82f6', // blue-500
      backgroundColor: window.matchMedia('(prefers-color-scheme: dark)').matches
        ? '#1e3a8a' // blue-900
        : '#eff6ff', // blue-50
    };
  } else if (tasks.length === 0) {
    inlineStyle = {
      ...inlineStyle,
      borderColor: window.matchMedia('(prefers-color-scheme: dark)').matches
        ? '#4b5563' // gray-700
        : '#d1d5db', // gray-300
      backgroundColor: 'transparent',
      ['--hover-bg' as string]: window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches
        ? '#1e3a8a' // dark:hover:bg-blue-900
        : '#dbeafe', // hover:bg-blue-100
      ['--hover-border' as string]: '#60a5fa', // hover:border-blue-400
    };
  } else if (tasks.length === 1) {
    const task = tasks[0];
    if (task.completed) {
      inlineStyle = {
        ...inlineStyle,
        backgroundColor: 'var(--hover-bg, #16a34a)', // green-600
        borderColor: '#16a34a', // green-600
        ['--hover-bg' as string]: '#15803d', // hover:bg-green-700
      };
      displayText = task.title;
    } else {
      inlineStyle = {
        ...inlineStyle,
        backgroundColor: 'var(--hover-bg, #eab308)', // yellow-500
        borderColor: '#eab308', // yellow-500
        ['--hover-bg' as string]: '#ca8a04', // hover:bg-yellow-600
      };
      displayText = task.title;
    }
  } else {
    const completedCount = tasks.filter((task) => task.completed).length;
    const percentCompleted = Math.round((completedCount / tasks.length) * 100);
    const percentNotCompleted = 100 - percentCompleted;

    if (percentCompleted === 100) {
      inlineStyle = {
        ...inlineStyle,
        backgroundColor: 'var(--hover-bg, #16a34a)', // green-600
        borderColor: '#16a34a', // green-600
        ['--hover-bg' as string]: '#15803d', // hover:bg-green-700
      };
      displayText = 'Много задач';
    } else if (percentNotCompleted === 100) {
      inlineStyle = {
        ...inlineStyle,
        backgroundColor: 'var(--hover-bg, #eab308)', // yellow-500
        borderColor: '#eab308', // yellow-500
        ['--hover-bg' as string]: '#ca8a04', // hover:bg-yellow-600
      };
      displayText = 'Много задач';
    } else {
      inlineStyle = {
        ...inlineStyle,
        background: `linear-gradient(135deg, #facc15 ${percentNotCompleted}%, #16a34a ${percentNotCompleted}%)`,
        borderColor: '#eab308', // yellow-500
        ['--hover-opacity' as string]: '0.9', // hover:opacity-90
      };
      displayText = 'Много задач';
    }
  }

  const handleClick = () => {
    onDateSelect(isSelected ? null : day);
  };

  return (
    <>
      <style jsx>{`
        .calendar-day-cell:hover {
          background-color: var(--hover-bg);
          border-color: var(--hover-border);
          opacity: var(--hover-opacity, 1);
        }
      `}</style>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        onClick={handleClick}
        style={inlineStyle}
        className='calendar-day-cell rounded-lg cursor-pointer border'
      >
        <div className='font-semibold mb-2'>
          {format(day, 'd MMM', { locale: ru })}
        </div>
        <div className='space-y-2 max-h-48 overflow-y-auto overflow-x-hidden'>
          {tasks.length === 0 ? (
            <p className='text-gray-400 dark:text-gray-500 text-sm'>
              Нет задач
            </p>
          ) : (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <h4 className='font-semibold text-sm truncate text-white'>
                  {displayText}
                </h4>
                {tasks.length === 1 && tasks[0].description && (
                  <p className='text-xs text-gray-200 dark:text-gray-300'>
                    {tasks[0].description.length > MAX_DESC_LENGTH
                      ? tasks[0].description.slice(0, MAX_DESC_LENGTH) + '...'
                      : tasks[0].description}
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default CalendarDayCell;
