import React, { memo, useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../firebase";
import { Grid } from "@mui/material";
import BlogPost from "./Post/BlogPost";

const Post = () => {
  const { id } = useParams();
  const [postData, setPostData] = useState({});

  useEffect(() => {
    getPost();
  }, []);

  const getPost = async () => {
    const docRef = doc(firestore, "posts", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setPostData(docSnap.data());
      setPostData((prev) => ({
        ...prev,
        ["content"]: prev.content.join("\n"),
      }));
    } else {
      console.log("No such document!");
    }
  };

  return (
    <Layout>
      <Grid container justifyContent={"center"} sx={{ marginBottom: "40px" }}>
        <Grid item lg={6}>
          {/* Memoized BlogPost */}
          <MemoizedBlogPost
            author={postData.author}
            readingTime={postData.readingTime}
            title={postData.title}
            content={postData.content}
            date={postData.date}
            venue = {postData.Venue}
            eventDate={postData.Eventdate}
            description={postData.description}
          />
        </Grid>
      </Grid>
    </Layout>
  );
};

// Memoized BlogPost
const MemoizedBlogPost = memo(BlogPost);

export default Post;
