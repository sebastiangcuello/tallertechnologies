import { useReducer, useEffect, useState } from 'react';
import { taskService } from './services/taskService';
import { taskReducer, initialState } from './reducers/taskReducer';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';

function App() {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    try {
      setLoading(true);
      setError(null);
      const data = await taskService.getAll();
      dispatch({ type: 'GET_TASKS', payload: data });
    } catch {
      setError('Failed to load tasks. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate(title: string) {
    try {
      setCreating(true);
      setError(null);
      const newTask = await taskService.create({ title });
      dispatch({ type: 'ADD_TASK', payload: newTask });
    } catch {
      setError('Failed to create task. Please try again.');
    } finally {
      setCreating(false);
    }
  }

  async function handleToggle(id: string, completed: boolean) {
    try {
      setUpdating(id);
      setError(null);
      const updatedTask = await taskService.updateStatus(id, { completed });
      dispatch({ type: 'TOGGLE_TASK', payload: updatedTask });
    } catch {
      setError('Failed to update task. Please try again.');
    } finally {
      setUpdating(null);
    }
  }

  const completedCount = state.tasks.filter(t => t.completed).length;
  const totalCount = state.tasks.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-6 px-4 sm:py-10">
      <div className="max-w-xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
          <h1 className="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-4 sm:mb-6">
            Task Manager
          </h1>

          <TaskForm onSubmit={handleCreate} disabled={creating} />

          {error && (
            <div className="bg-red-50 text-red-600 px-3 py-2 sm:px-4 sm:py-3 rounded-lg mb-4 text-center text-sm sm:text-base">
              {error}
            </div>
          )}

          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <>
              {totalCount > 0 && (
                <p className="text-xs sm:text-sm text-gray-500 mb-3">
                  {completedCount} of {totalCount} tasks completed
                </p>
              )}
              <TaskList tasks={state.tasks} onToggle={handleToggle} updating={updating} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;