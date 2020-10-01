import React, { useContext } from "react";
import { useObserver } from "mobx-react";
import "./tasks.css";
import { TaskStoreContext } from "../index";
import Task from '../task';

const Tasks = () => {
  const taskStore = useContext(TaskStoreContext);

  return useObserver(() => (
    <div className="tasks">
      <h3 className="header">All Tasks</h3>
      <div className="list">
        {taskStore.tasks.map((task) => (
          <Task task={task} key={task.id}></Task>
        ))}
      </div>
    </div>
  ));
}

export default Tasks;
