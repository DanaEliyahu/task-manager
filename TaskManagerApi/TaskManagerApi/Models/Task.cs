using System;

namespace TaskManagerApi.Models
{
    public class Task
    {
        public Guid Id { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
        public Guid SessionId { get; set; }
    }
}
