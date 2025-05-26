'use client';

import CalendarGridDesktop from '@/app/modules/calendar/CalendarGridDesktop';
import CalendarHeader from '@/app/modules/calendar/CalendarHeader';

import { Task } from '@/app/types/task';

interface CalendarDesktopProps {
  currentMonth: Date;
  tasks: Task[];
  selectedDate: Date | null;
  onDateSelect: (date: Date | null) => void;
  onMonthChange: (offset: number) => void;
}

const CalendarDesktop: React.FC<CalendarDesktopProps> = ({
  currentMonth,
  tasks,
  selectedDate,
  onDateSelect,
  onMonthChange,
}) => {
  console.log(tasks);
  return (
    <div className='p-4 rounded-xl bg-white dark:bg-gray-800 '>
      <CalendarHeader
        currentMonth={currentMonth}
        onMonthChange={onMonthChange}
      />
      <CalendarGridDesktop
        currentMonth={currentMonth}
        tasks={tasks}
        selectedDate={selectedDate}
        onDateSelect={onDateSelect}
      />
    </div>
  );
};

export default CalendarDesktop;
