'use client';

import { Task } from '@/app/types/task';
import TaskList from './TaskList';
import { Droppable } from '@hello-pangea/dnd';

interface TaskListAllProps {
  tasks: Task[];
  onToggleComplete: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export const TaskListAll: React.FC<TaskListAllProps> = ({
  tasks,
  onToggleComplete,
  onEdit,
  onDelete,
}) => {
  console.log(
    'TaskListAll tasks:',
    tasks.map((t) => ({ id: t.id, title: t.title }))
  );

  return (
    <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 h-full'>
      <h2 className='text-lg font-semibold mb-2'>Все задачи</h2>
      <Droppable droppableId='task-list'>
        {(provided, snapshot) => (
          <ul
            className={`overflow-y-auto ${
              snapshot.isDraggingOver ? 'bg-gray-100 dark:bg-gray-700' : ''
            }`}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {tasks.map((task, index) => (
              <TaskList
                key={task.id}
                task={task}
                index={index}
                onToggleComplete={onToggleComplete}
                onEdit={onEdit}
                onDelete={onDelete}
                draggable={true} // Enable drag-and-drop
              />
            ))}
            {provided.placeholder}
            {tasks.length === 0 && (
              <p className='text-gray-500 dark:text-gray-400'>Нет задач</p>
            )}
          </ul>
        )}
      </Droppable>
    </div>
  );
};

export default TaskListAll;
