﻿using System;
using System.Collections.Generic;
using TaskModel = TaskManagerApi.Models.Task;

// Since there is no db, this is a singleton representing the Db.
namespace TaskManagerApi
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
