import React, { useState } from "react";
import { Box, Button, Grid, Stack, TextField } from "@mui/material";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import BlogPost from "../Post/BlogPost";
import { firestore } from "../../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

export default function NewEvent() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1; // Note: months are zero-based
  const day = today.getDate();

  const date = `${day}/${month}/${year}`;
  const initPostData = {
    date: date,
    author: "",
    readingTime: "",
    title: "",
    timestamp: 0,
    content: [],
  };

  const handleSubmit = async () => {
    const uuid = uuidv4();
    // console.log(uuid);
    postData["timestamp"] = today.getTime();
    await setDoc(doc(firestore, "posts", uuid), postData);
  };
  const [postData, setPostData] = useState(initPostData);

  function handleChange(field) {
    // console.log(postData);
    return (event) => {
      setPostData((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };
  }

  function handleTextChange(e) {
    const newText = e.target.value;
    setText(newText);
    setPostData((prev) => ({
      ...prev,
      content: newText.split("\n"),
    }));
  }

  const [text, setText] = useState(``);

  return (
    // <Layout>
    <Stack direction={"row"}>
      {/* <Grid item lg={6}> */}
      <Stack gap={2} sx={{ width: "50%" }}>
        <TextField
          variant="standard"
          label="Author"
          size="small"
          onChange={handleChange("author")}
          fullWidth
        ></TextField>
        <TextField
          variant="standard"
          fullWidth
          label="Title"
          onChange={handleChange("title")}
          size="small"
        ></TextField>
        {/* <TextField
          margin="normal"
          multiline
          rows={5}
          required
          fullWidth
          onChange={handleChange("title")}
          id="message"
          label="Message"
          name="message"
          autoFocus
          sx={{ width: "100%" }}
        /> */}
        <TextField
          variant="standard"
          label="Reading time"
          onChange={handleChange("readingTime")}
          size="small"
          fullWidth
        ></TextField>

        {/* <TextField
          style={{ width: "100%", minWidth: "300px" }}
          onChange={handleTextChange}
          value={text}
          label="Content"
          multiline
          variant="standard"
        /> */}
        <TextField
          margin="normal"
          multiline
          onChange={handleTextChange}
          rows={5}
          required
          fullWidth
          // id="message"
          value={text}
          label="Content"
          name="content"
          autoFocus
          sx={{ width: "100%" }}
        />
        <Button variant="contained" onClick={handleSubmit}>
          SUBMIT
        </Button>
      </Stack>
      {/* </Grid> */}
      {/* <Grid item lg={6}> */}
      <BlogPost
        title={postData.title}
        author={postData.author}
        content={text}
        readingTime={postData.readingTime}
      ></BlogPost>
      {/* </Grid> */}
      {/* </Grid> */}
    </Stack>
    // </Layout>
  );
}
