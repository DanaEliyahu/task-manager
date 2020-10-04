using System;
using TaskModel = TaskManagerApi.Models.Task;

namespace TaskManagerApi.ViewModels
{
    public class TaskViewModel
    {
        public Guid Id { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
        public Guid SessionId { get; set; }

        public TaskViewModel()
        {

        }

        public TaskViewModel(TaskModel task)
        {
            Id = task.Id;
            Description = task.Description;
            Image = task.Image;
            SessionId = task.SessionId;
        }
    }
}
