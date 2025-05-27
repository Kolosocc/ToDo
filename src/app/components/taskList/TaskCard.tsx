// TaskCard.tsx
'use client';

import { FiTrash2, FiCheck, FiX, FiEdit, FiMenu } from 'react-icons/fi';
import { Task } from '@/app/types/task';

interface TaskProps {
  task: Task;
  index: number;
  onToggleComplete: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  draggable?: boolean;
  innerRef?: (element: HTMLElement | null) => void;
  draggableProps?: any;
  dragHandleProps?: any;
  isDragging?: boolean;
}

export const TaskCard: React.FC<TaskProps> = ({
  task,
  index,
  onToggleComplete,
  onEdit,
  onDelete,
  draggable = false,
  innerRef,
  draggableProps,
  dragHandleProps,
  isDragging,
}) => {
  return (
    <li
      ref={innerRef}
      {...draggableProps}
      className={`mb-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md transition-opacity ${
        draggable ? 'cursor-default' : ''
      } ${isDragging ? 'opacity-75 bg-gray-200 dark:bg-gray-700' : ''}`}
    >
      <div className='flex items-center justify-between'>
        <div className='flex items-center'>
          {draggable && (
            <div {...dragHandleProps} className='mr-2 cursor-move'>
              <FiMenu size={20} className='text-gray-500 dark:text-gray-400' />
            </div>
          )}
          <div>
            <div className='flex items-center mb-1'>
              <h4 className='text-gray-800 dark:text-gray-200 mr-2'>
                {task.priority}
              </h4>
              <h3 className='font-semibold'>{task.title}</h3>
            </div>
            <p className='text-sm text-gray-600 dark:text-gray-400'>
              {task.description || 'Без описания'}
            </p>
          </div>
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

export default TaskCard;
