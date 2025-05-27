export interface TaskFormProps {
  isOpen: boolean;
  taskTitle: string;
  taskDescription: string;
  setTaskTitle: React.Dispatch<React.SetStateAction<string>>;
  setTaskDescription: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: () => void;
  onCancel: () => void;
  isEditing?: boolean;
}
