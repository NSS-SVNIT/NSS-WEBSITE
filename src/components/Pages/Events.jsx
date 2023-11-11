import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import BlogCard from "../UI/BlogCard";
import PageHeader from "../UI/PageHeader";
import firebase from "firebase/compat/app";
import { getDocs, collection } from "@firebase/firestore";
import { firestore } from "../../firebase";
import { Grid } from "@mui/material";
export default function Events() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    await getDocs(collection(firestore, "posts")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setPosts(newData);
      console.log(posts, newData);
    });
  };
  useEffect(() => {
    fetchPosts();
  }, []);
  console.log();
  // const posts = ["1", "2", "3"];
  return (
    <Layout>
      <PageHeader title="Events">
        The National Service Scheme (NSS) is a youth-focused voluntary
        organization in India that aims to develop the personality and character
        of students through community service. NSS events are organized by
        educational institutions, particularly colleges and universities, that
        have NSS units.
      </PageHeader>
      <Grid container spacing={3} lg={12} sx={{ px: 10, py: 4 }}>
        {posts.map((post, index) => (
          <Grid item key={index} lg={3} md={6}>
            <BlogCard
              key={index}
              title={post.title}
              to={`/events/${post.id}`}
            />
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
}
