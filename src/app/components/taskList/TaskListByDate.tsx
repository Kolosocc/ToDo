'use client';

import { Task } from '@/app/types/task';
import TaskList from './TaskList';

interface TaskListByDateProps {
  tasks: Task[];
  date: Date | null;
  onToggleComplete: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  isFormOpen: boolean;
}

export const TaskListByDate: React.FC<TaskListByDateProps> = ({
  tasks,
  date,
  onToggleComplete,
  onEdit,
  onDelete,
  isFormOpen,
}) => {
  return (
    <div className='h-full'>
      <TaskList
        tasks={tasks}
        date={date}
        onToggleComplete={onToggleComplete}
        onEdit={onEdit}
        onDelete={onDelete}
        isFormOpen={isFormOpen}
      />
    </div>
  );
};

export default TaskListByDate;
