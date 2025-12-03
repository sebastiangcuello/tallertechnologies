import type { Task } from '../types/Task';

export interface TaskState {
  tasks: Task[];
}

export type TaskAction =
  | { type: 'GET_TASKS'; payload: Task[] }
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'TOGGLE_TASK'; payload: Task };

export const initialState: TaskState = {
  tasks: [],
};

export function taskReducer(state: TaskState, action: TaskAction): TaskState {
  switch (action.type) {
    case 'GET_TASKS':
      return { tasks: action.payload };

    case 'ADD_TASK':
      return { tasks: [...state.tasks, action.payload] };

    case 'TOGGLE_TASK':
      return {
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
      };

    default:
      return state;
  }
}