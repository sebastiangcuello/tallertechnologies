import type { Task } from '../types/Task';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string, completed: boolean) => void;
  disabled: boolean;
}

export function TaskItem({ task, onToggle, disabled }: TaskItemProps) {
  return (
    <li className={`py-3 px-2 sm:py-4 border-b border-gray-100 last:border-b-0 
                    transition-all duration-200 hover:bg-gray-50 rounded-lg
                    ${disabled ? 'opacity-50' : ''}`}>
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id, !task.completed)}
          disabled={disabled}
          className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer accent-blue-600 
                     disabled:cursor-not-allowed rounded"
        />
        <span
          className={`text-sm sm:text-base transition-all duration-200 ${
            task.completed 
              ? 'line-through text-gray-400' 
              : 'text-gray-800'
          }`}
        >
          {task.title}
        </span>
        {disabled && (
          <span className="ml-auto text-xs text-gray-400">Updating...</span>
        )}
      </label>
    </li>
  );
}