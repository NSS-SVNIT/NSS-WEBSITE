import React, { useEffect, useState } from "react";

import Layout from "../Layout/Layout";
import BlogCard from "../UI/BlogCard";
import PageHeader from "../UI/PageHeader";
import { getDocs, collection, orderBy, query } from "firebase/firestore";
import { firestore } from "../../firebase";
import { Grid, Button, useMediaQuery } from "@mui/material";

const MemoizedBlogCard = React.memo(BlogCard);

export default function Events() {
  const [posts, setPosts] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const isMobile = useMediaQuery("(max-width:900px)");
  const fetchPosts = async () => {
    try {
      const q = query(
        collection(firestore, "posts"),
        orderBy("timestamp", "desc")
      );
      const querySnapshot = await getDocs(q);
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setPosts(newData);
    } catch (err) {
      console.error("Error fetching posts (ordered):", err);

      const querySnapshot = await getDocs(collection(firestore, "posts"));
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      newData.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
      setPosts(newData);
    }
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

  const displayedPosts = showAll ? posts : posts.slice(0, 8);

  return (
    <Layout>
      <PageHeader >
        The National Service Scheme (NSS) is a youth-focused voluntary
        organization in India that aims to develop the personality and character
        of students through community service. NSS events are organized by
        educational institutions, particularly colleges and universities, that
        have NSS units.
      </PageHeader>
      <Grid container spacing={2} lg={12} sx={{ px: { xs: 2, md: 10 }, py: 4 }}>
        {displayedPosts.map((post, index) => (
          <Grid item key={index} lg={3} md={6} xs={6}>
            <BlogCard key={index} title={post.title} to={`/events/${post.id}`} image={post.image} />
          </Grid>
        ))}
      </Grid>
      {!showAll && posts.length > 8 && (
        <Button
          onClick={() => setShowAll(true)}
          sx={{
            mt: 1,
            marginLeft: isMobile ? '10%' : '80%',
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
      )}{showAll && (
        <Button
          onClick={() => setShowAll(false)}
          sx={{
            mt: 1,
            marginLeft: isMobile ? '10%' : '80%',
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
          Show Less
        </Button>
      )}
    </Layout>
  );
}
