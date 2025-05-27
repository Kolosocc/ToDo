'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { TaskFormProps } from '../types';

export const TaskForm: React.FC<TaskFormProps> = ({
  isOpen,
  taskTitle,
  taskDescription,
  setTaskTitle,
  setTaskDescription,
  onSubmit,
  onCancel,
  isEditing = false,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className='mb-6 p-4 border rounded bg-white dark:bg-gray-800 shadow'
        >
          <h3 className='font-semibold mb-2'>
            {isEditing ? 'Редактировать задачу' : 'Новая задача'}
          </h3>
          <input
            type='text'
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            placeholder='Название задачи'
            className='w-full p-2 mb-3 border rounded text-gray-800 dark:bg-gray-700 dark:text-white'
          />
          <textarea
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            placeholder='Описание задачи (необязательно)'
            className='w-full p-2 mb-3 border rounded text-gray-800 dark:bg-gray-700 dark:text-white'
            rows={4}
          />
          <div className='flex gap-2'>
            <button
              onClick={onSubmit}
              disabled={!taskTitle.trim()}
              className='px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400 hover:scale-105 transition hover:bg-blue-600 dark:hover:bg-blue-600 dark:disabled:bg-gray-600'
            >
              {isEditing ? 'Сохранить' : 'Добавить'}
            </button>
            <motion.button
              onClick={onCancel}
              className='px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded hover:cursor-pointer hover:bg-gray-400 hover:scale-105 dark:hover:bg-gray-500 transition'
            >
              Отмена
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TaskForm;
