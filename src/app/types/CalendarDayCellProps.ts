import { Task } from './task';

export interface CalendarDayCellProps {
  day: Date;
  tasks: Task[];
  isSelected: boolean;
  isCurrentMonth: boolean;
  onDateSelect: (date: Date | null) => void;
}
