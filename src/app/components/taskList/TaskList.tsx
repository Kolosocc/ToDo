'use client';

import { FiTrash2, FiCheck, FiX, FiEdit } from 'react-icons/fi';
import { Task } from '@/app/types/task';

interface TaskListProps {
  task: Task;

  onToggleComplete: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  task,

  onToggleComplete,
  onEdit,
  onDelete,
}) => {
  return (
    <li key={task.id} className={`mb-2 shadow-md`}>
      <div className='flex items-center justify-between'>
        <div>
          <div className='flex items-center mb-1'>
            <h4 className=' text-gray-800 dark:text-gray-200 mr-2'>
              {task.priority}
            </h4>
            <h3 className='font-semibold'>{task.title}</h3>
          </div>
          <p className='text-sm text-gray-600 dark:text-gray-400'>
            {task.description || 'Без описания'}
          </p>
        </div>
        <div className='flex gap-2'>
          <button
            onClick={() => onToggleComplete(task.id)}
            className={`p-2 text-white rounded transition ${
              task.completed
                ? 'bg-green-500 hover:bg-green-600'
                : 'bg-yellow-500 hover:bg-yellow-600'
            }`}
            title={task.completed ? 'Отменить выполнение' : 'Выполнить'}
          >
            {task.completed ? <FiCheck size={16} /> : <FiX size={16} />}
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
  );
};

export default TaskList;
