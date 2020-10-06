import React, { useContext, useState, useEffect } from "react";
import { useObserver } from "mobx-react";
import { TaskStoreContext } from "../../index";
import ErrorBar from "../ErrorBar";
import generalError from "../../consts/general-error";
import TaskList from './TaskList';

import "./index.scss";
import { Paper } from "@material-ui/core";

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
      } catch (error) {
        setErrorMessage(error.response?.data?.message || generalError);
        setOpenErrorBar(true);
      }

      setLoading(false);
    };
    loadTasks();
  }, [loadBySession, taskStore]);

  return useObserver(() => (
    <>
      <Paper className={loading || !taskStore.tasks.length ? "empty-list" : "tasks"}>
        <TaskList 
          tasks={taskStore.tasks} 
          loading={loading}
          loadBySession={loadBySession}
          setLoadBySession={setLoadBySession}
        />
      </Paper>
      <ErrorBar
        openErrorBar={openErrorBar}
        setOpenErrorBar={setOpenErrorBar}
        errorMessage={errorMessage}
      />
    </>
  ));
};

export default Tasks;
