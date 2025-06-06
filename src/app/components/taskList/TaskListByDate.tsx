'use client';
import TaskCard from './TaskCard';
import { TaskListByDateProps } from '@/app/types';

export const TaskListByDate: React.FC<TaskListByDateProps> = ({
  tasks,
  date,
  onToggleComplete,
  onEdit,
  onDelete,
}) => {
  const filteredTasks = date
    ? tasks
        .filter(
          (task) =>
            new Date(task.createdAt).toDateString() === date.toDateString()
        )
        .sort((a, b) => a.priority - b.priority)
    : tasks;

  console.log(
    'TaskListByDate tasks:',
    filteredTasks.map((t) => ({ id: t.id, title: t.title }))
  );

  return (
    <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 h-full'>
      <h2 className='text-lg font-semibold mb-2'>
        {date
          ? `Задачи на ${date.toLocaleDateString('ru-RU', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}`
          : 'Все задачи'}
      </h2>
      <div className='h-full'>
        <ul className='overflow-y-auto'>
          {filteredTasks.map((task, index) => (
            <TaskCard
              key={task.id}
              task={task}
              index={index}
              onToggleComplete={onToggleComplete}
              onEdit={onEdit}
              onDelete={onDelete}
            />
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
    </div>
  );
};

export default TaskListByDate;
