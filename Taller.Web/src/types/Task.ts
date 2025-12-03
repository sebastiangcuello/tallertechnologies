export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export interface CreateTaskRequest {
  title: string;
}

export interface UpdateTaskRequest {
  completed: boolean;
}