'use client';

import { Task } from '@/app/types/task';
import TaskList from './TaskList';

interface TaskListAllProps {
  tasks: Task[];
  onToggleComplete: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  isFormOpen: boolean;
}

export const TaskListAll: React.FC<TaskListAllProps> = ({
  tasks,
  onToggleComplete,
  onEdit,
  onDelete,
  isFormOpen,
}) => {
  return (
    <TaskList
      tasks={tasks}
      onToggleComplete={onToggleComplete}
      onEdit={onEdit}
      onDelete={onDelete}
      isFormOpen={isFormOpen}
    />
  );
};

export default TaskListAll;
