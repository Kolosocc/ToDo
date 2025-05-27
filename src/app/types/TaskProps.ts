import { Task } from './task';
import {
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps,
} from '@hello-pangea/dnd';

export interface TaskProps {
  task: Task;
  index: number;
  onToggleComplete: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  draggable?: boolean;
  innerRef?: (element: HTMLElement | null) => void;
  draggableProps?: DraggableProvidedDraggableProps;
  dragHandleProps?: DraggableProvidedDragHandleProps | null;
  isDragging?: boolean;
}
