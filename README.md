# Task Manager

A fullstack Task Manager application built with .NET and React.

## Tech Stack

### Backend
- .NET 10
- ASP.NET Core Web API
- FluentValidation
- Swagger/OpenAPI

### Frontend
- React 19
- TypeScript
- Tailwind CSS v4
- Vite

## Getting Started

### Prerequisites

- [.NET 10 SDK](https://dotnet.microsoft.com/download)
- [Node.js](https://nodejs.org/) (v18 or higher)

### Installation

1. Clone the repository
```bash
git clone <https://github.com/sebastiangcuello/tallertechnologies>
cd Taller
```

2. Setup Backend
```bash
cd Taller.Api
dotnet restore
dotnet run
```

The API will be available at `http://localhost:5000`

3. Setup Frontend (in a new terminal)
```bash
cd Taller.Web
npm install
npm run dev
```

The app will be available at `http://localhost:5173`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Returns all tasks |
| POST | `/api/tasks` | Creates a new task |
| PUT | `/api/tasks/{id}` | Updates task completion status |

### Request/Response Examples

#### GET /api/tasks

**Response 200 OK**
```json
[
  {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "title": "Buy groceries",
    "completed": false
  }
]
```

#### POST /api/tasks

**Request Body**
```json
{
  "title": "New task"
}
```

**Response 201 Created**
```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "title": "New task",
  "completed": false
}
```

#### PUT /api/tasks/{id}

**Request Body**
```json
{
  "completed": true
}
```

**Response 200 OK**
```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "title": "New task",
  "completed": true
}
```

## Project Structure
```
Taller/
├── Taller.sln
├── README.md
├── Taller.Api/
│   ├── Controllers/
│   │   └── TasksController.cs
│   ├── Entities/
│   │   └── TaskItem.cs
│   ├── Requests/
│   │   ├── CreateTaskRequest.cs
│   │   └── UpdateTaskRequest.cs
│   ├── Services/
│   │   └── TaskService.cs
│   ├── Validators/
│   │   ├── CreateTaskRequestValidator.cs
│   │   └── UpdateTaskRequestValidator.cs
│   └── Program.cs
└── Taller.Web/
    ├── src/
    │   ├── components/
    │   │   ├── TaskForm.tsx
    │   │   ├── TaskItem.tsx
    │   │   └── TaskList.tsx
    │   ├── reducers/
    │   │   └── taskReducer.ts
    │   ├── services/
    │   │   └── taskService.ts
    │   ├── types/
    │   │   └── Task.ts
    │   ├── App.tsx
    │   └── main.tsx
    ├── package.json
    └── tailwind.config.js
```

## Features

- ✅ Display list of tasks from API
- ✅ Add new tasks
- ✅ Toggle task completion status
- ✅ Loading states
- ✅ Error handling
- ✅ Responsive design (mobile-friendly)
- ✅ Input validation (frontend + backend)

## Design Decisions

### Backend

1. **In-Memory Storage**: Tasks are stored in a `ConcurrentDictionary` to handle concurrent requests safely. Data persists during application lifetime but resets on restart.

2. **FluentValidation**: Clean, maintainable input validation separated from controller logic.

3. **Async/Await Pattern**: All service methods are async for future scalability.

4. **CORS Configuration**: Configured to allow requests from React development server.

### Frontend

1. **useReducer**: Centralized state management for tasks with clear action types (GET_TASKS, ADD_TASK, TOGGLE_TASK).

2. **Service Layer**: API calls abstracted into a service for separation of concerns.

3. **Tailwind CSS**: Utility-first CSS for rapid UI development with built-in responsive design.

4. **TypeScript**: Type safety across components, services, and state management.

## Trade-offs

- **No persistence**: Data is lost when the API restarts. 
- **No authentication**: API is publicly accessible.
- **Simple error handling**: Basic try-catch pattern.

## Error Handling

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 201 | Resource created |
| 400 | Validation error |
| 404 | Resource not found |
| 500 | Internal server error |