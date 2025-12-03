import type { Task } from '../types/Task';
import { TaskItem } from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string, completed: boolean) => void;
  updating: string | null;
}

export function TaskList({ tasks, onToggle, updating }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-8 sm:py-12">
        <p className="text-gray-400 text-sm sm:text-base">No tasks yet</p>
        <p className="text-gray-300 text-xs sm:text-sm mt-1">Add your first task!</p>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-gray-100">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          disabled={updating === task.id}
        />
      ))}
    </ul>
  );
}