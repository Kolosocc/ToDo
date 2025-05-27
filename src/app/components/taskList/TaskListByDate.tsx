'use client';

import { Task } from '@/app/types/task';
import TaskList from './TaskList';

interface TaskListByDateProps {
  tasks: Task[];
  date: Date | null;
  onToggleComplete: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export const TaskListByDate: React.FC<TaskListByDateProps> = ({
  tasks,
  date,
  onToggleComplete,
  onEdit,
  onDelete,
}) => {
  const filteredTasks = date
    ? tasks.filter(
        (task) =>
          new Date(task.createdAt).toDateString() === date.toDateString()
      )
    : tasks;

  return (
    <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-4  h-full'>
      <h2 className='text-lg font-semibold mb-2'>{`Задачи на ${
        date &&
        date.toLocaleDateString('ru-RU', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })
      }`}</h2>
      <div className='h-full'>
        <ul className='overflow-y-auto'>
          {filteredTasks.map((task) => (
            <TaskList
              key={task.id}
              task={task}
              onToggleComplete={onToggleComplete}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}

          {filteredTasks.length === 0 && (
            <p className='text-gray-500 dark:text-gray-400'>
              {date && `Нет задач на ${date.toLocaleDateString('ru-RU')}`}
            </p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default TaskListByDate;
