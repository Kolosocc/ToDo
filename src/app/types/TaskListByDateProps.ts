import { Task } from './task';

export interface TaskListByDateProps {
  tasks: Task[];
  date: Date | null;
  onToggleComplete: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}
