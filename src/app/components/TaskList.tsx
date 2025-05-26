'use client';

import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FilterBar } from './FilterBar';
import { motion, AnimatePresence } from 'framer-motion';
import { Task } from '../types/task';

type FilterStatus = 'all' | 'completed' | 'pending';

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<FilterStatus>('all');
  const [isCreating, setIsCreating] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Load tasks from localStorage on mount
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Handle task creation
  const handleCreateTask = () => {
    if (!newTaskTitle.trim()) return; // Prevent empty tasks
    const maxPriority =
      tasks.length > 0 ? Math.max(...tasks.map((task) => task.priority)) : 0;
    const newTask: Task = {
      id: uuidv4(), // Correctly typed as string
      title: newTaskTitle,
      description: newTaskDescription || undefined,
      completed: false,
      createdAt: new Date().toISOString(),
      priority: maxPriority + 1,
    };
    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
    setNewTaskDescription('');
    setIsCreating(false);
  };

  // Handle task editing
  const handleEditTask = (task: Task) => {
    if (!task.title.trim()) return; // Prevent empty title
    setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
    setEditingTask(null);
  };

  // Handle task deletion
  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Handle task completion toggle
  const handleToggleComplete = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Filter tasks
  const filteredTasks = tasks
    .filter((task) => task.title.toLowerCase().includes(search.toLowerCase()))
    .filter((task) =>
      status === 'all'
        ? true
        : status === 'completed'
        ? task.completed
        : !task.completed
    );

  return (
    <div className='p-4 max-w-4xl mx-auto'>
      <FilterBar
        search={search}
        status={status}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
        onCreateTask={() => setIsCreating(true)}
      />

      {/* Task Creation Form */}
      <AnimatePresence>
        {isCreating && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className='mb-4 p-4 border rounded bg-white dark:bg-gray-800'
          >
            <h3 className='font-semibold mb-2'>Новая задача</h3>
            <input
              type='text'
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder='Название задачи'
              className='w-full p-2 mb-2 border rounded text-gray-800 dark:bg-gray-700 dark:text-white'
            />
            <textarea
              value={newTaskDescription}
              onChange={(e) => setNewTaskDescription(e.target.value)}
              placeholder='Описание задачи (необязательно)'
              className='w-full p-2 mb-2 border rounded text-gray-800 dark:bg-gray-700 dark:text-white'
            />
            <div className='flex gap-2'>
              <button
                onClick={handleCreateTask}
                disabled={!newTaskTitle.trim()}
                className='px-4 py-2 bg-green-500 text-white rounded disabled:opacity-50'
              >
                Добавить
              </button>
              <button
                onClick={() => setIsCreating(false)}
                className='px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded'
              >
                Отмена
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Task List */}
      <div className='grid gap-4'>
        <AnimatePresence>
          {filteredTasks.map((task) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className='p-4 border rounded bg-white dark:bg-gray-800 shadow'
            >
              {editingTask?.id === task.id ? (
                <div>
                  <input
                    type='text'
                    value={editingTask.title}
                    onChange={(e) =>
                      setEditingTask({ ...editingTask, title: e.target.value })
                    }
                    className='w-full p-2 mb-2 border rounded text-gray-800 dark:bg-gray-700 dark:text-white'
                  />
                  <textarea
                    value={editingTask.description || ''}
                    onChange={(e) =>
                      setEditingTask({
                        ...editingTask,
                        description: e.target.value,
                      })
                    }
                    placeholder='Описание задачи (необязательно)'
                    className='w-full p-2 mb-2 border rounded text-gray-800 dark:bg-gray-700 dark:text-white'
                  />
                  <div className='flex gap-2'>
                    <button
                      onClick={() => handleEditTask(editingTask)}
                      disabled={!editingTask.title.trim()}
                      className='px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50'
                    >
                      Сохранить
                    </button>
                    <button
                      onClick={() => setEditingTask(null)}
                      className='px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded'
                    >
                      Отмена
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className='font-semibold'>{task.title}</h3>
                  <p className='text-sm text-gray-600 dark:text-gray-300'>
                    {task.description || 'Без описания'}
                  </p>
                  <p className='text-xs text-gray-500'>
                    Создано:{' '}
                    {new Date(task.createdAt).toLocaleDateString('ru-RU')}
                  </p>
                  <p className='text-xs text-gray-500'>
                    Приоритет: {task.priority}
                  </p>
                  <p className='text-xs text-gray-500'>
                    Статус: {task.completed ? 'Выполнена' : 'Невыполнена'}
                  </p>
                  <div className='flex gap-2 mt-2'>
                    <button
                      onClick={() => handleToggleComplete(task.id)}
                      className='px-4 py-1 bg-yellow-500 text-white rounded'
                    >
                      {task.completed ? 'Отменить' : 'Выполнить'}
                    </button>
                    <button
                      onClick={() => setEditingTask(task)}
                      className='px-4 py-1 bg-blue-500 text-white rounded'
                    >
                      Редактировать
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className='px-4 py-1 bg-red-500 text-white rounded'
                    >
                      Удалить
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TaskList;
