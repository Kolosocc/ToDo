import { Task } from './task';

export interface CalendarMobileProps {
  currentMonth: Date;
  onMonthChange: (offset: number) => void;
  selectedDate: Date | null;
  onDateSelect: (date: Date | null) => void;
  tasks: Task[];
}
