using Microsoft.AspNetCore.Mvc;
using Taller.Api.Models;
using Taller.Api.Requests;
using Taller.Api.Services;

namespace Taller.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase
{
    private readonly ITaskService _taskService;
    private readonly ILogger<TasksController> _logger;

    public TasksController(ITaskService taskService, ILogger<TasksController> logger)
    {
        _taskService = taskService;
        _logger = logger;
    }

    [HttpGet]
    public async Task<ActionResult<List<TaskItem>>> GetAll()
    {
        try
        {
            var tasks = await _taskService.GetAllAsync();
            return Ok(tasks);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting tasks");
            return StatusCode(500, new { message = "An unexpected error occurred" });
        }
    }

    [HttpPost]
    public async Task<ActionResult<TaskItem>> Create([FromBody] CreateTaskRequest request)
    {
        try
        {
            var task = await _taskService.CreateAsync(request.Title.Trim());
            return CreatedAtAction(nameof(GetAll), task);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating task");
            return StatusCode(500, new { message = "An unexpected error occurred" });
        }
    }

    [HttpPut("{id:guid}")]
    public async Task<ActionResult<TaskItem>> Update(Guid id, [FromBody] UpdateTaskRequest request)
    {
        try
        {
            var existingTask = await _taskService.GetByIdAsync(id);
            
            if (existingTask == null)
                return NotFound(new { message = $"Task with id {id} not found" });

            var task = await _taskService.UpdateAsync(id, request.Completed!.Value);
            return Ok(task);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating task {TaskId}", id);
            return StatusCode(500, new { message = "An unexpected error occurred" });
        }
    }
}