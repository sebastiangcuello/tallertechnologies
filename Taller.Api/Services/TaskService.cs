using System.Collections.Concurrent;
using Taller.Api.Models;

namespace Taller.Api.Services;

public interface ITaskService
{
    Task<List<TaskItem>> GetAllAsync();
    Task<TaskItem?> GetByIdAsync(Guid id);
    Task<TaskItem> CreateAsync(string title);
    Task<TaskItem> UpdateAsync(Guid id, bool completed);
}

public class TaskService : ITaskService
{
    private readonly ConcurrentDictionary<Guid, TaskItem> _tasks = new();

    public TaskService()
    {
        var task1 = new TaskItem { Id = Guid.NewGuid(), Title = "Buy groceries", Completed = false };
        var task2 = new TaskItem { Id = Guid.NewGuid(), Title = "Finish project report", Completed = true };
        var task3 = new TaskItem { Id = Guid.NewGuid(), Title = "Schedule dentist appointment", Completed = false };
        
        _tasks.TryAdd(task1.Id, task1);
        _tasks.TryAdd(task2.Id, task2);
        _tasks.TryAdd(task3.Id, task3);
    }

    public Task<List<TaskItem>> GetAllAsync()
    {
        return Task.FromResult(_tasks.Values.ToList());
    }

    public Task<TaskItem?> GetByIdAsync(Guid id)
    {
        _tasks.TryGetValue(id, out var task);
        return Task.FromResult(task);
    }

    public Task<TaskItem> CreateAsync(string title)
    {
        var task = new TaskItem
        {
            Id = Guid.NewGuid(),
            Title = title,
            Completed = false
        };
        
        _tasks.TryAdd(task.Id, task);
        return Task.FromResult(task);
    }

    public Task<TaskItem> UpdateAsync(Guid id, bool completed)
    {
        var task = _tasks[id];
        task.Completed = completed;
        return Task.FromResult(task);
    }
}