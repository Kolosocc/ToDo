import { Task } from './task';

export interface CalendarProps {
  selectedDate: Date | null;
  onDateSelect: (date: Date | null) => void;
  currentMonth: Date;
  onMonthChange: (offset: number) => void;
  tasks: Task[];
}
