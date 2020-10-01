using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskModel = TaskManagerSelfHost.Models.Task;

namespace TaskManagerSelfHost.ViewModels
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
