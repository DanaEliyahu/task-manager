import React, { useContext, useState, useEffect } from "react";
import { useObserver } from "mobx-react";
import { TaskStoreContext } from "../index";
import Task from '../task';
import "./tasks.css";
import { Button, Paper } from "@material-ui/core";

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
    <Paper className="tasks">
      <div className="headers">
        <h2>All Tasks</h2>
        <Button type="submit" variant="contained" color="primary" onClick={() => setLoadBySession(!loadBySession)}>
          { loadBySession ? "Show All Tasks" : "Show Only Your Tasks"} 
        </Button>
      </div>
      <div>
        {taskStore.tasks.map((task) => (
          <Task task={task} key={task.id}></Task>
        ))}
      </div>
    </Paper>
  ));
}

export default Tasks;
