import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../Layout/Layout";
import BlogCard from "../UI/BlogCard";
import PageHeader from "../UI/PageHeader";
import firebase from "firebase/compat/app";
import { getDocs, collection } from "@firebase/firestore";
import { firestore } from "../../firebase";
import { Grid, Button } from "@mui/material";

const MemoizedBlogCard = React.memo(BlogCard);

export default function Events() {
  const [posts, setPosts] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const fetchPosts = async () => {
    await getDocs(collection(firestore, "posts")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setPosts(newData.reverse()); // Reverse the order of the posts
    });
  };

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);

    // Cleanup function to scroll to the top when the component unmounts
    return () => {
      window.scrollTo(0, 0);
    };
  }, []);

  useEffect(() => {
    fetchPosts();
  }, []);

  const displayedPosts = showAll ? posts.reverse() : posts.slice(0, 8);

  return (
    <Layout>
      <PageHeader >
        The National Service Scheme (NSS) is a youth-focused voluntary
        organization in India that aims to develop the personality and character
        of students through community service. NSS events are organized by
        educational institutions, particularly colleges and universities, that
        have NSS units.
      </PageHeader>
      <Grid container spacing={3} lg={12} sx={{ px: 10, py: 4 }}>
        {displayedPosts.map((post, index) => (
          <Grid item key={index} lg={3} md={6}>
            <BlogCard key={index} title={post.title} to={`/events/${post.id}`} image = {post.image}/>
          </Grid>
        ))}
      </Grid>
      {!showAll && posts.length > 8 && (
        <Button
          onClick={() => setShowAll(true)}
          sx={{
            mt: 1,
            marginLeft: 84,
            marginBottom: 3,
            fontSize: 20,
            backgroundColor: "black",
            color: "white",
            border: "2px white solid",
            borderColor: "black",
            "&:hover": {
              backgroundColor: "white",
              color: "black",
            },
          }}
        >
          Explore More
        </Button>
      )}
    </Layout>
  );
}
