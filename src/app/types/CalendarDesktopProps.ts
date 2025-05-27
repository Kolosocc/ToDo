import { Task } from './task';

export interface CalendarDesktopProps {
  currentMonth: Date;
  tasks: Task[];
  selectedDate: Date | null;
  onDateSelect: (date: Date | null) => void;
  onMonthChange: (offset: number) => void;
}
