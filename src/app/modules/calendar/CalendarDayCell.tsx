'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { format, isSameDay } from 'date-fns';
import { ru } from 'date-fns/locale'; // Русская локализация
import { Task } from '@/app/types/task';

interface CalendarDayCellProps {
  day: Date;
  tasks: Task[];
  isSelected: boolean;
  isCurrentMonth: boolean;
  onDateSelect: (date: Date) => void;
}

const MAX_DESC_LENGTH = Number(process.env.NEXT_PUBLIC_THEME_KEY) || 100;

const CalendarDayCell: React.FC<CalendarDayCellProps> = ({
  day,
  tasks,
  isSelected,
  isCurrentMonth,
  onDateSelect,
}) => {
  return (
    <motion.div
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
      <div className='font-semibold mb-2'>
        {format(day, 'd MMM', { locale: ru })}{' '}
      </div>
      <div className='space-y-2 max-h-48 overflow-y-auto'>
        {tasks.length === 0 ? (
          <p className='text-gray-400 dark:text-gray-500 text-sm'>Нет задач</p>
        ) : (
          <AnimatePresence>
            {tasks.map((task) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className='bg-blue-100 dark:bg-blue-900 p-2 rounded-md'
              >
                <h4 className='font-semibold text-sm truncate'>{task.title}</h4>
                <p className='text-xs text-gray-700 dark:text-gray-300'>
                  {task.description
                    ? task.description.length > MAX_DESC_LENGTH
                      ? task.description.slice(0, MAX_DESC_LENGTH) + '...'
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
};

export default CalendarDayCell;
