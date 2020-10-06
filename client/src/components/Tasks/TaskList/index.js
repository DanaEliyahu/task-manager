import React from 'react';
import Task from './Task';

import './index.scss';
import { Button, CircularProgress } from "@material-ui/core";

const TaskList = ({loading, loadBySession, setLoadBySession, tasks = []}) => {
  if (loading) {
    return <CircularProgress size={48} />;
  }

  return (
    <>
      <div className="header">
        {
          !tasks.length 
          ? <h2>No Tasks Yet...</h2>
          : <h2>All Tasks</h2>
        }
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={() => setLoadBySession(!loadBySession)}>
          {loadBySession ? "Show All Tasks" : "Show Only Your Tasks"}
        </Button>
      </div>
      <div className="list">
        {tasks.map((task) => (
          <Task task={task} key={task.id} />
        ))}
      </div>
    </>
  );
}

export default TaskList;