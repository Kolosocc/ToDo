import { Task } from './task';

export interface CalendarGridDesktopProps {
  currentMonth: Date;
  tasks: Task[];
  selectedDate: Date | null;
  onDateSelect: (date: Date | null) => void;
}
