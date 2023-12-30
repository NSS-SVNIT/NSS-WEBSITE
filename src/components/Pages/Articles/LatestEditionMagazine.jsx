import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ArticleCard from "./ArticleCard";
import { getDocs, collection, where, query } from "@firebase/firestore";
import { firestore } from "../../../firebase";

const LatestEdition = React.memo((props) => {
  const [post, setPost] = useState([]);
  const fetchPosts = async () => {
    const q = query(
      collection(firestore, "articles"),
      where("Type", "==", "Latest edition")
    );
    return getDocs(q).then((posts) => setPost(posts.docs));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Box>
      <div style={{ fontFamily: "DM Sans", overflowX: "hidden" }}></div>
      <Box
        sx={{
          margin: "20px auto",
          px: 8,
          py: 4,
          fontSize: "3rem",
          backgroundColor: "black",
          fontFamily: "DM Sans",
          color: "grey",
          width: "35%",
        }}
      >
        LATEST <span style={{ fontWeight: 400, color: "white" }}>EDITION</span>
      </Box>

      <br />
      <Box
        style={{
          paddingLeft: "80px",
          paddingRight: "80px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <br />
        <Box style={{ paddingLeft: "0px" }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {post.map((posts) => (
              <Grid item xs={2} sm={4} md={4} key={posts.id}>
                <ArticleCard
                  name={posts.data().Title}
                  description={posts.data().Description}
                  type={posts.data().Type}
                  image={posts.data().Image}
                  download={posts.data().Download}
                ></ArticleCard>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
});

export default LatestEdition;
