'use client';

import { Task } from '@/app/types/task';
import TaskList from './TaskList';

interface TaskListAllProps {
  tasks: Task[];
  onToggleComplete: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export const TaskListAll: React.FC<TaskListAllProps> = ({
  tasks,
  onToggleComplete,
  onEdit,
  onDelete,
}) => {
  return (
    <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-4  h-full'>
      <h2 className='text-lg font-semibold mb-2'>Все задачи</h2>
      <ul className='overflow-y-auto'>
        {tasks.map((task) => (
          <TaskList
            task={task}
            onToggleComplete={onToggleComplete}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
        {tasks.length === 0 && (
          <p className='text-gray-500 dark:text-gray-400'>Нет задач</p>
        )}
      </ul>
    </div>
  );
};

export default TaskListAll;
