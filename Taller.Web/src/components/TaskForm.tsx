import { useState } from 'react';

interface TaskFormProps {
  onSubmit: (title: string) => void;
  disabled: boolean;
}

export function TaskForm({ onSubmit, disabled }: TaskFormProps) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSubmit(title.trim());
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-4 sm:mb-6">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter a new task..."
        disabled={disabled}
        maxLength={200}
        className="flex-1 px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg text-sm sm:text-base
                   focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200
                   disabled:bg-gray-100 disabled:cursor-not-allowed transition-all"
      />
      <button
        type="submit"
        disabled={disabled || !title.trim()}
        className="px-4 py-2 sm:px-6 sm:py-3 bg-blue-600 text-white rounded-lg text-sm sm:text-base font-medium
                   hover:bg-blue-700 active:bg-blue-800 transition-colors
                   disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        {disabled ? 'Adding...' : 'Add Task'}
      </button>
    </form>
  );
}