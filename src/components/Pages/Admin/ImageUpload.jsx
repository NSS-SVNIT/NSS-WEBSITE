import React, { useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

export default function ImageUpload() {
  const folders = ["Camp 1", "Camp 2", "Camp 3"];
  const [folder, setFolder] = useState("");
  const [files, setFiles] = useState([]);

  const handleChange = (event) => {
    setFolder(event.target.value);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const uploadedFiles = event.dataTransfer.files;
    uploadedFiles;
    console.log(uploadedFiles);
    setFiles(uploadedFiles);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleUpload = () => {
    // Perform upload logic here using the 'files' state variable
    console.log(files);
  };

  return (
    <div>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{
          border: "1px dashed black",
          padding: "20px",
          marginBottom: "20px",
        }}
      >
        Drag and drop images here
        {/* {files[0].name ? files[0].name : "nine"} */}
      </div>

      <FormControl variant="filled" sx={{ m: 1, width: 240 }}>
        <InputLabel id="demo-simple-select-filled-label">Folders</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={folder}
          label="folders"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {folders.map((folder) => (
            <MenuItem key={folder}>{folder}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button onClick={handleUpload}>Make New Folder</Button>
    </div>
  );
}
