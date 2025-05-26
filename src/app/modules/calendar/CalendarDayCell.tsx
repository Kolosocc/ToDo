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
  let bgClass = '';
  let hoverClass = '';
  let displayText = '';
  let inlineBgStyle: React.CSSProperties | undefined = undefined;

  if (tasks.length === 1) {
    const task = tasks[0];
    if (task.completed) {
      bgClass = 'bg-green-600';
      hoverClass = 'hover:bg-green-700';
      displayText = task.title;
    } else {
      bgClass = 'bg-yellow-500';
      hoverClass = 'hover:bg-yellow-600';
      displayText = task.title;
    }
  } else if (tasks.length > 1) {
    const completedCount = tasks.filter((task) => task.completed).length;
    const percentCompleted = Math.round((completedCount / tasks.length) * 100);
    const percentNotCompleted = 100 - percentCompleted;

    if (percentCompleted === 100) {
      bgClass = 'bg-green-600';
      hoverClass = 'hover:bg-green-700';
      displayText = 'Много задач';
    } else if (percentNotCompleted === 100) {
      bgClass = 'bg-yellow-500';
      hoverClass = 'hover:bg-yellow-600';
      displayText = 'Много задач';
    } else {
      displayText = 'Много задач';
      hoverClass = 'hover:opacity-90'; // Можно заменить на кастомный ховер
      inlineBgStyle = {
        background: `linear-gradient(135deg, #facc15 ${percentNotCompleted}%, #16a34a ${percentNotCompleted}%)`,
      };
    }
  }

  const baseClass = isSelected
    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900'
    : tasks.length === 0
    ? 'border-gray-300 dark:border-gray-700'
    : `${bgClass} border-${bgClass.split('-')[1]}-500`;

  const handleClick = () => {
    onDateSelect(isSelected ? null : day);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      onClick={handleClick}
      style={inlineBgStyle}
      className={`rounded-lg cursor-pointer border p-1 
        ${inlineBgStyle ? '' : bgClass} 
        ${baseClass}
        ${isCurrentMonth ? '' : 'opacity-50'}
        ${
          tasks.length === 0
            ? 'hover:border-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900'
            : hoverClass
        }
      `}
    >
      <div className='font-semibold mb-2'>
        {format(day, 'd MMM', { locale: ru })}
      </div>
      <div className='space-y-2 max-h-48 overflow-y-auto overflow-x-hidden'>
        {tasks.length === 0 ? (
          <p className='text-gray-400 dark:text-gray-500 text-sm'>Нет задач</p>
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
  );
};

export default CalendarDayCell;
