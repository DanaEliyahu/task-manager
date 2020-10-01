import React, { useContext, useState, useEffect } from "react";
import { useObserver } from "mobx-react";
import "./tasks.css";
import { TaskStoreContext } from "../index";
import Task from '../task';
import { Button } from "@material-ui/core";

const Tasks = () => {
  const taskStore = useContext(TaskStoreContext);
  const [loadBySession, setLoadBySession] = useState(true);

  useEffect(() => {
    if (!loadBySession) {
      taskStore.initAllTasks();
    }
    else {
      taskStore.initTasksBySession();
    }
  }, [loadBySession]);

  return useObserver(() => (
    <div className="tasks">
      <h3 className="header">All Tasks</h3>
      <Button type="submit" variant="contained" color="primary" onClick={() => setLoadBySession(!loadBySession)}>
         { loadBySession ? "Show All Tasks" : "Show Only Your Tasks"} 
      </Button>
      <div className="list">
        {taskStore.tasks.map((task) => (
          <Task task={task} key={task.id}></Task>
        ))}
      </div>
    </div>
  ));
}

export default Tasks;
