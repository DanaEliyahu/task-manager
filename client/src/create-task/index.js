import React, { useState, useContext } from "react";
import { TaskStoreContext } from "../index";

import "./create-task.scss";
import { Button, TextField, Paper } from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

const CreateTask = () => {
  const taskStore = useContext(TaskStoreContext);
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState(false);
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState("");
  const imageInputRef = React.useRef();

  const onDescriptionChanged = (e) => {
    if (!e.target.value) {
      setDescriptionError(true);
    } else {
      setDescriptionError(false);
    }
    setDescription(e.target.value);
  };

  const emptyFields = () => {
    setDescription("");
    setImage(null);
    setImageName("");
    imageInputRef.current.value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    taskStore.addTask({ description, image });
    emptyFields();
  };

  const handleChangeImage = (e) => {
    const [file] = e.target.files;
    setImageName(file.name);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
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
          onChange={onDescriptionChanged}
          multiline
          required
          error={descriptionError}
        />
        <div className="image-upload-input">
          <input
            style={{ display: "none" }}
            id="upload-photo"
            name="upload-photo"
            type="file"
            accept="image/*"
            multiple={false}
            onChange={handleChangeImage}
            ref={imageInputRef}
            required
          />
          <label htmlFor="upload-photo">
            <Button
              color="secondary"
              variant="contained"
              component="span"
              startIcon={<CloudUploadIcon />}
            >
              Upload Image
            </Button>
          </label>
          <div className="image-name">{imageName}</div>
        </div>
        <Button type="submit" variant="contained" color="primary" disabled={!description || !image}>
          Add Task
        </Button>
      </form>
    </Paper>
  );
};

export default CreateTask;
