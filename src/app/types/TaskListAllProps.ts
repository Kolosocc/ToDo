import { FilterStatus } from './FilterStatus';
import { SortType } from './SortType';
import { Task } from './task';

export interface TaskListAllProps {
  tasks: Task[];
  sortType: SortType;
  status: FilterStatus;
  onToggleComplete: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onUpdateTasks: (updatedTasks: Task[]) => void;
}
