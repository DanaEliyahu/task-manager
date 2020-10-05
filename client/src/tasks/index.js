import React, { useContext, useState, useEffect } from "react";
import { useObserver } from "mobx-react";
import { TaskStoreContext } from "../index";
import Task from "./task";

import "./tasks.scss";
import { Paper, Button, CircularProgress } from "@material-ui/core";
import ErrorBar from '../error-bar';

const Tasks = () => {
  const taskStore = useContext(TaskStoreContext);
  const [loadBySession, setLoadBySession] = useState(true);
  const [loading, setLoading] = React.useState(true);
  const [openErrorBar, setOpenErrorBar] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  useEffect(() => {
    const loadTasks = async () => {
      setLoading(true);
      try {
        if (loadBySession) {
          await taskStore.initTasksBySession();
        } else {
          await taskStore.initAllTasks();
        }
      }
      catch (error) {
        setErrorMessage(error?.response?.data?.message || "An Error Has Occured");
        setOpenErrorBar(true);
      }
      
      setLoading(false);
    };
    loadTasks();
  }, [loadBySession, taskStore]);

  const renderHeader = () => {
    return !taskStore.tasks.length ? 
      <h2>No Tasks Yet...</h2> : 
      <h2>All Tasks</h2>
  }

  const renderTasks = () => {
    if (loading) {
      return <CircularProgress size={48} />;
    }

    return (
      <>
        <div className="headers">
          {renderHeader()}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={() => setLoadBySession(!loadBySession)}
          >
            {loadBySession ? "Show All Tasks" : "Show Only Your Tasks"}
          </Button>
        </div>
        <div className="list">
          {taskStore.tasks.map((task) => (
            <Task task={task} key={task.id} />
          ))}
        </div>
      </>
    );
  };

  return useObserver(() => (
    <>
    <Paper className={taskStore.tasks.length && !loading ? "tasks" : "empty-list"}>
      {renderTasks()}
    </Paper>
    <ErrorBar openErrorBar={openErrorBar} 
              setOpenErrorBar={setOpenErrorBar}
              errorMessage={errorMessage}/>
  </>
  ));
};

export default Tasks;
