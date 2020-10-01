using System;
using System.Collections.Generic;
using TaskModel = TaskManagerSelfHost.Models.Task;

namespace TaskManagerSelfHost.Models
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
