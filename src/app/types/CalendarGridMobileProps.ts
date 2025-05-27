import { Task } from './task';

export interface CalendarGridMobileProps {
  currentMonth: Date;
  selectedDate: Date | null;
  onDateSelect: (date: Date | null) => void;
  tasks: Task[];
}
