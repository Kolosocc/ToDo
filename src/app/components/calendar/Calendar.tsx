'use client';

import { useIsDesktop } from '@/app/hooks/useIsDesktop';
import CalendarDesktop from './CalendarDesktop';
import CalendarMobile from './CalendarMobile';
import { CalendarProps } from '@/app/types';

const Calendar: React.FC<CalendarProps> = ({
  selectedDate,
  onDateSelect,
  currentMonth,
  onMonthChange,
  tasks,
}) => {
  const isDesktop = useIsDesktop();

  return isDesktop ? (
    <CalendarDesktop
      onMonthChange={onMonthChange}
      currentMonth={currentMonth}
      selectedDate={selectedDate}
      onDateSelect={onDateSelect}
      tasks={tasks}
    />
  ) : (
    <CalendarMobile
      tasks={tasks}
      currentMonth={currentMonth}
      onMonthChange={onMonthChange}
      selectedDate={selectedDate}
      onDateSelect={onDateSelect}
    />
  );
};

export default Calendar;
