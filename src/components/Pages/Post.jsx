import React, { memo, useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../firebase";
import { Button, Grid } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BlogPost from "./Post/BlogPost";

const Post = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [postData, setPostData] = useState({});

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }
    navigate("/events");
  };

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
      <Grid
        container
        justifyContent={"center"}
        sx={{ marginBottom: "40px", px: { xs: 2, md: 10 }, py: 2 }}
      >
        <Grid item xs={12} lg={6}>
          <Button
            onClick={handleBack}
            startIcon={<ArrowBackIcon />}
            sx={{ mb: 2 }}
          >
            Go Back
          </Button>
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
            image={postData.image}
          />
        </Grid>
      </Grid>
    </Layout>
  );
};

// Memoized BlogPost
const MemoizedBlogPost = memo(BlogPost);

export default Post;
