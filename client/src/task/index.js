import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "./task.css";

const Task = props => {
  const {task} = props;

  return (
    <Card className="card">
      <CardContent className="card-content">
        <Typography component="h6" variant="h6" className="task-text">
          {task.description}
        </Typography>
        <img src={task.image} alt="" width="100" height="100"/>
      </CardContent>
    </Card>
  );
}

export default Task;
