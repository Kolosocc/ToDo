'use client';

import {
  Droppable,
  Draggable,
  DragDropContext,
  DropResult,
} from '@hello-pangea/dnd';
import TaskCard from './TaskCard';
import { TaskListAllProps } from '@/app/types';

export const TaskListAll: React.FC<TaskListAllProps> = ({
  tasks,
  sortType,
  status,
  onToggleComplete,
  onEdit,
  onDelete,
  onUpdateTasks,
}) => {
  console.log(
    'TaskListAll tasks:',
    tasks.map((t) => ({ id: t.id, title: t.title, priority: t.priority }))
  );

  const handleDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    if (
      source.droppableId !== 'task-list' ||
      destination.droppableId !== 'task-list'
    )
      return;
    if (source.index === destination.index) return;

    const reordered = [...tasks];
    const fromIndex = reordered.findIndex((t) => t.id === draggableId);
    if (fromIndex === -1) return;

    const [movedTask] = reordered.splice(fromIndex, 1);
    reordered.splice(destination.index, 0, movedTask);

    const updatedTasks = reordered.map((task, index) => ({
      ...task,
      priority: index + 1,
    }));

    console.log(
      'Updated tasks:',
      updatedTasks.map((t) => ({
        id: t.id,
        title: t.title,
        priority: t.priority,
      }))
    );

    onUpdateTasks(updatedTasks);
  };

  if (sortType === 'date' || status !== 'all') {
    return (
      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 h-full flex flex-col'>
        <h2 className='text-lg font-semibold mb-2'>Все задачи</h2>
        <ul className='flex-1 overflow-y-auto min-h-[200px]'>
          {tasks.map((task, index) => (
            <TaskCard
              key={task.id}
              task={task}
              index={index}
              onToggleComplete={onToggleComplete}
              onEdit={onEdit}
              onDelete={onDelete}
              draggable={false}
            />
          ))}
          {tasks.length === 0 && (
            <p className='text-gray-500 dark:text-gray-400'>Нет задач</p>
          )}
        </ul>
      </div>
    );
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 h-full flex flex-col'>
        <h2 className='text-lg font-semibold mb-2'>Все задачи</h2>
        <Droppable droppableId='task-list'>
          {(provided, snapshot) => (
            <ul
              className={`flex-1 overflow-y-auto min-h-[200px] ${
                snapshot.isDraggingOver ? 'bg-gray-100 dark:bg-gray-700' : ''
              }`}
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{ touchAction: 'none' }}
            >
              {tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided, snapshot) => (
                    <TaskCard
                      task={task}
                      index={index}
                      onToggleComplete={onToggleComplete}
                      onEdit={onEdit}
                      onDelete={onDelete}
                      draggable={true}
                      innerRef={provided.innerRef}
                      draggableProps={provided.draggableProps}
                      dragHandleProps={provided.dragHandleProps}
                      isDragging={snapshot.isDragging}
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              {tasks.length === 0 && (
                <p className='text-gray-500 dark:text-gray-400'>Нет задач</p>
              )}
            </ul>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

export default TaskListAll;
