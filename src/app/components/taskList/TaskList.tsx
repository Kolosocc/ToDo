'use client';

import { FiTrash2, FiCheck, FiX, FiEdit } from 'react-icons/fi';
import { Task } from '@/app/types/task';

interface TaskListProps {
  tasks: Task[];
  date?: Date | null; // Optional date to filter tasks
  onToggleComplete: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  isFormOpen: boolean;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  date,
  onToggleComplete,
  onEdit,
  onDelete,
  isFormOpen,
}) => {
  // Filter tasks by date if provided
  const filteredTasks = date
    ? tasks.filter(
        (task) =>
          new Date(task.createdAt).toDateString() === date.toDateString()
      )
    : tasks;

  // Format header based on date
  const headerText = date
    ? `Задачи на ${date.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })}`
    : 'Все задачи';

  return (
    <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-4  h-full'>
      <h2 className='text-lg font-semibold mb-2'>{headerText}</h2>
      <ul className='overflow-y-auto'>
        {filteredTasks.map((task) => (
          <li key={task.id} className='mb-2'>
            <div className='flex items-center justify-between'>
              <div>
                <h3 className='font-semibold'>{task.title}</h3>
                <p className='text-sm text-gray-600 dark:text-gray-400'>
                  {task.description || 'Без описания'}
                </p>
              </div>
              <div className='flex gap-2'>
                <button
                  onClick={() => onToggleComplete(task.id)}
                  className={`p-2 text-white rounded transition ${
                    task.completed
                      ? 'bg-yellow-500 hover:bg-yellow-600'
                      : 'bg-green-500 hover:bg-green-600'
                  }`}
                  title={task.completed ? 'Отменить выполнение' : 'Выполнить'}
                >
                  {task.completed ? <FiX size={16} /> : <FiCheck size={16} />}
                </button>
                <button
                  onClick={() => onEdit(task)}
                  className='p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition'
                  title='Редактировать'
                >
                  <FiEdit size={16} />
                </button>
                <button
                  onClick={() => onDelete(task.id)}
                  className='p-2 bg-red-500 text-white rounded hover:bg-red-600 transition'
                  title='Удалить'
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
            </div>
          </li>
        ))}
        {filteredTasks.length === 0 && (
          <p className='text-gray-500 dark:text-gray-400'>
            {date
              ? `Нет задач на ${date.toLocaleDateString('ru-RU')}`
              : 'Нет задач'}
          </p>
        )}
      </ul>
    </div>
  );
};

export default TaskList;
