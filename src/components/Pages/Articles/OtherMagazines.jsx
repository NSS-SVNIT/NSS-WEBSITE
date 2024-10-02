import React, { useState, useEffect } from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import ArticleCard from "./ArticleCard";
import { Card, Typography, useMediaQuery } from "@mui/material";
import { getDocs, collection, where, query } from "@firebase/firestore";
import { firestore } from "../../../firebase";
import { Await } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const OtherMagazines = React.memo((props) => {
  const isMobile = useMediaQuery("(max-width:900px)");
  const [post, setPost] = useState([]);
  const fetchPosts = async () => {
    const q = query(
      collection(firestore, "articles"),
      where("Type", "==", props.type)
    );

    return getDocs(q).then((posts) => setPost(posts.docs));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box
        sx={{
          margin: "20px auto",
          px: isMobile?0:8,
          py: isMobile?2:4,
          fontSize: isMobile?"1.7rem":"3rem",
          backgroundColor: "black",
          fontFamily: "DM Sans",
          color: "grey",
          width: isMobile?"100%":"41%",
          textAlign: "center",
        }}
      >
        {props.nameGrey}
        <span
          style={{
            fontWeight: 400,
            color: "white",
          }}
        >
          {props.nameWhite}
        </span>
      </Box>
      {!isMobile&&<br />}
      <Box
        style={{
          paddingLeft: isMobile?"0":"30px",
          paddingRight: "30px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          justifyContent={post.length < 3 ? "center" : "flex-start"}
          columns={{ xs: 12, sm: 12, md: 12 }}
        >
          {post.map((posts) => (
            <Grid item xs={12} sm={6} md={4} key={posts.id}>
              <ArticleCard
                name={posts.data().Title}
                description={posts.data().Description}
                type={posts.data().Type}
                image={posts.data().Image}
                download={posts.data().Download}
                flipbook = {posts.data().flipbook}
              ></ArticleCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
});

export default OtherMagazines;
