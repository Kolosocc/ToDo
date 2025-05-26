'use client';

import { isSameDay, format } from 'date-fns';
import { Task } from '@/app/types/task';

import { ru } from 'date-fns/locale';

interface CalendarMobileDayCellProps {
  day: Date;
  tasks: Task[];
  isSelected: boolean;
  isCurrentMonth: boolean;
  onDateSelect: (date: Date | null) => void;
}

const CalendarMobileDayCell: React.FC<CalendarMobileDayCellProps> = ({
  day,
  tasks,
  isSelected,
  isCurrentMonth,
  onDateSelect,
}) => {
  let bgClass = '';
  let hoverClass = '';
  let inlineBgStyle: React.CSSProperties | undefined = undefined;

  if (tasks.length === 1) {
    const task = tasks[0];
    if (task.completed) {
      bgClass = 'bg-green-600';
      hoverClass = 'hover:bg-green-700';
    } else {
      bgClass = 'bg-yellow-500';
      hoverClass = 'hover:bg-yellow-600';
    }
  } else if (tasks.length > 1) {
    const completedCount = tasks.filter((task) => task.completed).length;
    const percentCompleted = Math.round((completedCount / tasks.length) * 100);
    const percentNotCompleted = 100 - percentCompleted;

    if (percentCompleted === 100) {
      bgClass = 'bg-green-600';
      hoverClass = 'hover:bg-green-700';
    } else if (percentNotCompleted === 100) {
      bgClass = 'bg-yellow-500';
      hoverClass = 'hover:bg-yellow-600';
    } else {
      hoverClass = 'hover:opacity-90';
      inlineBgStyle = {
        background: `linear-gradient(135deg, #facc15 ${percentNotCompleted}%, #16a34a ${percentNotCompleted}%)`,
      };
    }
  }

  const baseClass = isSelected
    ? 'bg-blue-500 text-white border-blue-500'
    : tasks.length === 0
    ? 'border-gray-300 dark:border-gray-700'
    : `${bgClass} border-${bgClass.split('-')[1]}-500`;

  const handleClick = () => {
    onDateSelect(isSelected ? null : day);
  };

  return (
    <button
      className={`p-2 text-sm rounded-full w-10 h-10 flex items-center justify-center
        ${baseClass}
        ${isCurrentMonth ? '' : 'text-gray-400'}
        ${
          tasks.length === 0
            ? 'hover:bg-blue-100 dark:hover:bg-blue-900'
            : hoverClass
        } transition`}
      style={inlineBgStyle}
      onClick={handleClick}
    >
      {format(day, 'd', { locale: ru })}
    </button>
  );
};

export default CalendarMobileDayCell;
