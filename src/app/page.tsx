'use client';

import { useState, useEffect, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import FilterBar from './components/FilterBar';
import Calendar from './components/calendar/Calendar';
import ThemeToggle from './components/ThemeToggle';
import TaskForm from './components/TaskForm';
import { loadTasks, saveTasks } from '@/lib/task';
import { Task, FilterStatus, SortType } from '@/app/types';
import TaskListAll from './components/taskList/TaskListAll';
import TaskListByDate from './components/taskList/TaskListByDate';
import { useIsDesktop } from './hooks/useIsDesktop';

export default function Home() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [search, setSearch] = useState<string>('');
  const [status, setStatus] = useState<FilterStatus>('all');
  const [sortType, setSortType] = useState<SortType>('priority');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [taskTitle, setTaskTitle] = useState<string>('');
  const [taskDescription, setTaskDescription] = useState<string>('');
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    const loadedTasks = loadTasks();
    console.log('Loaded tasks:', loadedTasks);
    setTasks(loadedTasks);
  }, []);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const handleMonthChange = (offset: number): void => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + offset);
    setCurrentMonth(newMonth);
  };

  const handleCreateTask = (): void => {
    if (!taskTitle.trim()) return;
    const newId = uuidv4();
    if (tasks.some((task) => task.id === newId)) {
      console.error('Duplicate task ID:', newId);
      return;
    }
    const maxPriority =
      tasks.length > 0 ? Math.max(...tasks.map((task) => task.priority)) : 0;
    const newTask: Task = {
      id: newId,
      title: taskTitle,
      description: taskDescription || undefined,
      completed: false,
      createdAt: new Date().toISOString(),
      priority: maxPriority + 1,
    };
    setTasks([...tasks, newTask]);
    setTaskTitle('');
    setTaskDescription('');
    setIsFormOpen(false);
  };

  const handleEditTask = (): void => {
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

  const handleToggleComplete = (id: string): void => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id: string): void => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleOpenEdit = (task: Task): void => {
    setEditingTask(task);
    setTaskTitle(task.title);
    setTaskDescription(task.description || '');
    setIsFormOpen(true);
  };

  const filteredTasks = useMemo<Task[]>(() => {
    let result = tasks
      .filter((task) => task.title.toLowerCase().includes(search.toLowerCase()))
      .filter((task) =>
        status === 'all'
          ? true
          : status === 'completed'
          ? task.completed
          : !task.completed
      );

    result = result.sort((a, b) => {
      if (sortType === 'priority') {
        return a.priority - b.priority;
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return result;
  }, [tasks, search, status, sortType]);

  const isDesktop = useIsDesktop();

  return (
    <div className='min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300'>
      <div className='container mx-auto p-4'>
        <div className='flex justify-between items-center mb-6 gap-4'>
          <FilterBar
            search={search}
            status={status}
            sortType={sortType}
            onSearchChange={setSearch}
            onStatusChange={setStatus}
            onSortChange={setSortType}
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

        <div className='flex flex-col lg:flex-row gap-4 h-full'>
          <div className='lg:w-1/3 h-full overflow-y-auto'>
            {isDesktop || !selectedDate ? (
              <TaskListAll
                tasks={filteredTasks}
                sortType={sortType}
                status={status}
                onToggleComplete={handleToggleComplete}
                onEdit={handleOpenEdit}
                onDelete={handleDeleteTask}
                onUpdateTasks={setTasks}
              />
            ) : (
              <TaskListByDate
                tasks={filteredTasks}
                date={selectedDate}
                onToggleComplete={handleToggleComplete}
                onEdit={handleOpenEdit}
                onDelete={handleDeleteTask}
              />
            )}
          </div>
          <div className='flex lg:flex-col lg:w-2/3 h-full'>
            <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex-1 mb-4'>
              <Calendar
                selectedDate={selectedDate}
                onDateSelect={setSelectedDate}
                currentMonth={currentMonth}
                onMonthChange={handleMonthChange}
                tasks={filteredTasks}
              />
            </div>
            <div className='hidden lg:block'>
              <TaskListByDate
                tasks={filteredTasks}
                date={selectedDate}
                onToggleComplete={handleToggleComplete}
                onEdit={handleOpenEdit}
                onDelete={handleDeleteTask}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
