'use client';

import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Task } from '@/app/types/task';

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
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const match = window.matchMedia('(prefers-color-scheme: dark)');
      setIsDarkMode(match.matches);
    }
  }, []);

  let inlineStyle: React.CSSProperties = {
    padding: '0.5rem',
    fontSize: '0.875rem',
    borderRadius: '9999px',
    width: '2.5rem',
    height: '2.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: '1px',
    opacity: isCurrentMonth ? 1 : 0.4,
    transition: 'background-color 0.2s, border-color 0.2s, opacity 0.2s',
    color: isCurrentMonth ? 'inherit' : '#9ca3af', // gray-400
  };

  if (isSelected) {
    inlineStyle = {
      ...inlineStyle,
      backgroundColor: '#3b82f6', // blue-500
      borderColor: '#3b82f6',
      color: '#ffffff',
    };
  } else if (tasks.length === 0) {
    inlineStyle = {
      ...inlineStyle,
      borderColor: isDarkMode ? '#4b5563' : '#d1d5db', // gray-700 / gray-300
      backgroundColor: 'transparent',
      ['--hover-bg' as string]: isDarkMode ? '#1e3a8a' : '#dbeafe', // hover color
    };
  } else if (tasks.length === 1) {
    const task = tasks[0];
    if (task.completed) {
      inlineStyle = {
        ...inlineStyle,
        backgroundColor: 'var(--hover-bg, #16a34a)', // green-600
        borderColor: '#16a34a',
        ['--hover-bg' as string]: '#15803d', // hover:bg-green-700
        color: '#ffffff',
      };
    } else {
      inlineStyle = {
        ...inlineStyle,
        backgroundColor: 'var(--hover-bg, #eab308)', // yellow-500
        borderColor: '#eab308',
        ['--hover-bg' as string]: '#ca8a04', // hover:bg-yellow-600
        color: '#000000',
      };
    }
  } else {
    const completedCount = tasks.filter((task) => task.completed).length;
    const percentCompleted = Math.round((completedCount / tasks.length) * 100);
    const percentNotCompleted = 100 - percentCompleted;

    inlineStyle = {
      ...inlineStyle,
      background: `linear-gradient(135deg, #facc15 ${percentNotCompleted}%, #16a34a ${percentNotCompleted}%)`, // yellow to green
      borderColor: '#eab308',
      ['--hover-opacity' as string]: '0.9',
      color: '#ffffff',
    };
  }

  const handleClick = () => {
    onDateSelect(isSelected ? null : day);
  };

  return (
    <>
      <style jsx>{`
        .calendar-mobile-day-cell:hover {
          background-color: var(--hover-bg);
          opacity: var(--hover-opacity, 1);
        }
      `}</style>
      <button
        className='calendar-mobile-day-cell rounded-full'
        style={inlineStyle}
        onClick={handleClick}
      >
        {format(day, 'd', { locale: ru })}
      </button>
    </>
  );
};

export default CalendarMobileDayCell;
