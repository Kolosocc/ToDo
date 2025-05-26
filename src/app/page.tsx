'use client';

import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FiTrash2, FiCheck, FiX, FiEdit } from 'react-icons/fi';
import FilterBar from './components/FilterBar';
import Calendar from './components/calendar/Calendar';
import ThemeToggle from './components/ThemeToggle';
import TaskForm from './components/TaskForm';

import { Task } from '@/app/types/task';
import { loadTasks, saveTasks } from '@/lib/task';

type FilterStatus = 'all' | 'completed' | 'pending';

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<FilterStatus>('all');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Load tasks from localStorage on mount
  useEffect(() => {
    setTasks(loadTasks());
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  // Handle month change
  const handleMonthChange = (offset: number) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + offset);
    setCurrentMonth(newMonth);
  };

  // Handle task creation
  const handleCreateTask = () => {
    if (!taskTitle.trim()) return; // Prevent empty tasks
    const maxPriority =
      tasks.length > 0 ? Math.max(...tasks.map((task) => task.priority)) : 0;
    const newTask: Task = {
      id: uuidv4(),
      title: taskTitle,
      description: taskDescription || undefined,
      completed: false,
      createdAt: selectedDate.toISOString(), // Use selected date from calendar
      priority: maxPriority + 1,
    };
    setTasks([...tasks, newTask]);
    setTaskTitle('');
    setTaskDescription('');
    setIsFormOpen(false);
  };

  // Handle task editing
  const handleEditTask = () => {
    if (!taskTitle.trim() || !editingTask) return;
    setTasks(
      tasks.map((task) =>
        task.id === editingTask.id
          ? {
              ...task,
              title: taskTitle,
              description: taskDescription || undefined,
            }
          : task
      )
    );
    setTaskTitle('');
    setTaskDescription('');
    setEditingTask(null);
    setIsFormOpen(false);
  };

  // Handle task completion toggle
  const handleToggleComplete = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Handle task deletion
  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Open edit form
  const handleOpenEdit = (task: Task) => {
    setEditingTask(task);
    setTaskTitle(task.title);
    setTaskDescription(task.description || '');
    setIsFormOpen(true);
  };

  // Filter tasks for the calendar and today section
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
    <div className='min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300'>
      <div className='container mx-auto p-4'>
        <div className='flex  justify-between md:items-center mb-6 gap-4'>
          <FilterBar
            search={search}
            status={status}
            onSearchChange={setSearch}
            onStatusChange={setStatus}
            onCreateTask={() => {
              setEditingTask(null);
              setTaskTitle('');
              setTaskDescription('');
              setIsFormOpen(true);
            }}
          />
          <ThemeToggle />
        </div>

        <TaskForm
          isOpen={isFormOpen}
          taskTitle={taskTitle}
          taskDescription={taskDescription}
          setTaskTitle={setTaskTitle}
          setTaskDescription={setTaskDescription}
          onSubmit={editingTask ? handleEditTask : handleCreateTask}
          onCancel={() => {
            setTaskTitle('');
            setTaskDescription('');
            setEditingTask(null);
            setIsFormOpen(false);
          }}
          isEditing={!!editingTask}
        />

        <div className='flex flex-col  lg:flex-row gap-4'>
          <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 lg:w-1/3'>
            <h2 className='text-lg font-semibold mb-2'>Сегодня</h2>
            <ul>
              {filteredTasks
                .filter(
                  (task) =>
                    new Date(task.createdAt).toDateString() ===
                    new Date().toDateString()
                )
                .map((task) => (
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
                          onClick={() => handleToggleComplete(task.id)}
                          className={`p-2  text-white rounded  transition ${
                            task.completed
                              ? 'bg-yellow-500 hover:bg-yellow-600'
                              : 'bg-green-500 hover:bg-green-600'
                          } `}
                          title={
                            task.completed ? 'Отменить выполнение' : 'Выполнить'
                          }
                        >
                          {task.completed ? (
                            <FiX size={16} />
                          ) : (
                            <FiCheck size={16} />
                          )}
                        </button>
                        <button
                          onClick={() => handleOpenEdit(task)}
                          className='p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition'
                          title='Редактировать'
                        >
                          <FiEdit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          className='p-2 bg-red-500 text-white rounded hover:bg-red-600 transition'
                          title='Удалить'
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              {filteredTasks.filter(
                (task) =>
                  new Date(task.createdAt).toDateString() ===
                  new Date().toDateString()
              ).length === 0 && (
                <p className='text-gray-500 dark:text-gray-400'>
                  Нет задач на сегодня
                </p>
              )}
            </ul>
          </div>

          <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 lg:w-2/3'>
            <Calendar
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
              currentMonth={currentMonth}
              onMonthChange={handleMonthChange}
              tasks={filteredTasks}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
