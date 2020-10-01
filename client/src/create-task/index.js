import React, { useState, useContext } from "react";
import { TaskStoreContext } from "../index";

import "./create-task.css";
import { Button, TextField, Paper } from "@material-ui/core";

const CreateTask = () => {
  const taskStore = useContext(TaskStoreContext);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState({});
  const imageInputRef = React.useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    taskStore.addTask({ description, image });
    setDescription("");
    setImage(null);
    imageInputRef.current.value = "";
  };

  const handleChangeImage = (e) => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
          setImage(e.target.result);
      }
      reader.readAsDataURL(file);
    }
  };

  return (
    <Paper className="create-task">
      <h2>Create Task</h2>
      <form className="form" onSubmit={handleSubmit} autoComplete="off">
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          required
          error={!description}
        />
        <input
          type="file"
          accept="image/*"
          multiple={false}
          onChange={handleChangeImage}
          ref={imageInputRef}
        />
        <Button type="submit" variant="contained" color="primary">
          Add
        </Button>
        <h2>Fix Validation!</h2>
      </form>
    </Paper>
  );
}

export default CreateTask;
