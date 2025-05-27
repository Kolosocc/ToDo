'use client';

import CalendarGridDesktop from '@/app/modules/calendar/CalendarGridDesktop';
import CalendarHeader from '@/app/modules/calendar/CalendarHeader';
import { CalendarDesktopProps } from '@/app/types';

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
