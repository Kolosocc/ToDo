'use client';

import CalendarGridMobile from '@/app/modules/calendar/CalendarGridMobile';
import CalendarHeader from '@/app/modules/calendar/CalendarHeader';
import { CalendarMobileProps } from '@/app/types';

const CalendarMobile: React.FC<CalendarMobileProps> = ({
  currentMonth,
  onMonthChange,
  selectedDate,
  onDateSelect,
  tasks,
}) => {
  return (
    <div className='p-4 rounded-xl bg-white dark:bg-gray-800'>
      <CalendarHeader
        currentMonth={currentMonth}
        onMonthChange={onMonthChange}
      />
      <CalendarGridMobile
        tasks={tasks}
        currentMonth={currentMonth}
        selectedDate={selectedDate}
        onDateSelect={onDateSelect}
      />
    </div>
  );
};

export default CalendarMobile;
