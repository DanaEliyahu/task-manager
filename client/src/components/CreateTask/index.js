import React, { useState, useContext } from "react";
import { TaskStoreContext } from "../../index";
import ImageInput from './ImageInput';
import ErrorBar from '../ErrorBar';
import generalError from '../../consts/general-error';

import "./index.scss";
import { Button, TextField, Paper } from "@material-ui/core";

const CreateTask = () => {
  const taskStore = useContext(TaskStoreContext);
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState(false);
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState("");
  const [openErrorBar, setOpenErrorBar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // This function is specifically made for the first loading of the page when the input is not dirty
  // material ui prompts the error even in the first loading
  const onDescriptionChanged = (e) => {
    setDescriptionError(!e.target.value);
    setDescription(e.target.value);
  };

  const emptyFields = () => {
    setDescription("");
    setImage(null);
    setImageName("");
  };

  const handleSubmit =  async e => {
    e.preventDefault();
    
    try {
      await taskStore.addTask({ description, image });
      emptyFields();
    }
    catch (error) {
      setErrorMessage(error.response?.data?.message || generalError);
      setOpenErrorBar(true);
    }
  };

  return (
    <>
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
        <ImageInput setImage={setImage} imageName={imageName} setImageName={setImageName}/>
        <Button type="submit" variant="contained" color="primary" disabled={!description || !image}>
          Add Task
        </Button>
      </form>
    </Paper>
    <ErrorBar openErrorBar={openErrorBar} 
              setOpenErrorBar={setOpenErrorBar} 
              errorMessage={errorMessage}
    />
    </>
  );
};

export default CreateTask;
