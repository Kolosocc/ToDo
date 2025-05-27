import { Task } from '@/app/types/task';

const STORAGE_KEY = process.env.NEXT_PUBLIC_STORAGE_KEY || 'todo_tasks';

export const loadTasks = (): Task[] => {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];

    const tasks: Task[] = JSON.parse(data);
    // Remove duplicates by keeping the last occurrence of each ID
    const uniqueTasks = Array.from(
      new Map(tasks.map((task) => [task.id, task])).values()
    );

    if (uniqueTasks.length < tasks.length) {
      console.warn(
        `Removed ${tasks.length - uniqueTasks.length} duplicate tasks`
      );
      // Save cleaned tasks back to localStorage
      saveTasks(uniqueTasks);
    }

    return uniqueTasks;
  } catch (error) {
    console.error('Failed to load tasks:', error);
    return [];
  }
};

export const saveTasks = (tasks: Task[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Failed to save tasks:', error);
  }
};
