'use client';

import { useIsDesktop } from '@/app/hooks/useIsDesktop';
import CalendarDesktop from './CalendarDesktop';
import CalendarMobile from './CalendarMobile';
import { Task } from '@/app/types/task';

interface CalendarProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  currentMonth: Date;
  onMonthChange: (offset: number) => void;
  tasks: Task[];
}

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
      currentMonth={currentMonth}
      onMonthChange={onMonthChange}
      selectedDate={selectedDate}
      onDateSelect={onDateSelect}
    />
  );
};

export default Calendar;
