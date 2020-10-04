using System;
using System.Collections.Generic;
using TaskModel = TaskManagerApi.Models.Task;

// There is no db so this is 'db' for the app
namespace TaskManagerApi.Models
{
    public sealed class Data
    {
        public List<TaskModel> Tasks { get; } = new List<TaskModel>();

        static Data()
        {
        }
        private Data()
        {
        }
        public static Data Instance { get; } = new Data();
    }
}
