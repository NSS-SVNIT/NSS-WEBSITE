import React, { useState, useEffect } from "react";
import Layout from "../Layout/Layout";
import { Box, Button, Grid, Stack, TextField } from "@mui/material";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import BlogPost from "./Post/BlogPost";
import { firestore } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

export default function NewPost() {
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

  const [postData, setPostData] = useState(initPostData);

  const handleSubmit = async () => {
    try {
      const uuid = uuidv4();
      postData["timestamp"] = today.getTime();
      await setDoc(doc(firestore, "posts", uuid), postData);
      // Reset form after successful submission
      setPostData(initPostData);
    } catch (error) {
      console.error("Error submitting post:", error.message);
      // Handle error and provide user feedback
    }
  };

  function handleChange(field) {
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
      ["content"]: newText.split("\n"),
    }));
  }

  const [text, setText] = useState("");

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <Grid container spacing={5}>
        <Grid item lg={6}>
          <Stack gap={2}>
            <TextField
              variant="standard"
              label="Author"
              size="small"
              onChange={handleChange("author")}
              fullWidth
              value={postData.author}
            />
            <TextField
              variant="standard"
              fullWidth
              label="Title"
              onChange={handleChange("title")}
              size="small"
              value={postData.title}
            />
            <TextField
              variant="standard"
              label="Reading time"
              onChange={handleChange("readingTime")}
              size="small"
              fullWidth
              value={postData.readingTime}
            />
            <TextField
              style={{ width: "100%" }}
              onChange={handleTextChange}
              value={text}
              label="Content"
              multiline
              variant="standard"
            />
            <Button variant="contained" onClick={handleSubmit}>
              SUBMIT
            </Button>
          </Stack>
        </Grid>
        <Grid item lg={6}>
          <BlogPost
            title={postData.title}
            author={postData.author}
            content={text}
            readingTime={postData.readingTime}
          />
        </Grid>
      </Grid>
    </Layout>
  );
}
