import React from "react";
import './image-input.scss';
import { Button } from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

const ImageInput = ({setImage, imageName, setImageName}) => {

  const handleChangeImage = (e) => {
    const [file] = e.target.files;
    if (file) {
      setImageName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="image-upload-input">
        <input
          style={{ display: "none" }}
          id="upload-photo"
          name="upload-photo"
          type="file"
          accept="image/*"
          multiple={false}
          onChange={handleChangeImage}
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
    </>
  );
};

export default ImageInput;
