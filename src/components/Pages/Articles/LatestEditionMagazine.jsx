import React, {useState, useEffect} from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ArticleCard from './ArticleCard';
import { Card, Typography } from '@mui/material';
import { getDocs, collection, where, query } from "@firebase/firestore";
import { firestore } from "../../../firebase";
import { Await } from 'react-router-dom';




// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(2),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
// }));

export default function LatestEdition(props) {
  const [post, setPost] = useState([]);
  const fetchPosts = async  () => {
    const q = query(collection(firestore, 'articles'), where("Type", "==", 'Latest edition'));
    // const q = collection(firestore, 'articles');
    // console.log(q.data)
  return getDocs(q).then(posts => setPost(posts.docs) );
  }
  
  useEffect(() => {
    fetchPosts()
  }, []);

  // console.log(posts.data())
  return (
    
    <Box>
      
      <div style={{ fontFamily: "DM Sans", overflowX: "hidden" }}></div>
      <Box
          sx={{
            my: 2,
            px: 8,
            py: 4,
            fontSize: "3rem",
            backgroundColor: "black",
            display: "inline-block",
            fontFamily: "DM Sans",
            color: "grey",
          }}
         >
          Latest{" "}
          <span style={{ fontWeight: 400, color: 'white' }}>
            edition
          </span>
        </Box>
      <br />
    <Box style={{ paddingLeft:'80px', paddingRight:'80px', display:'flex',justifyContent:'center'}}>
     
      <br />
      <Box style={{paddingLeft:'80px'}}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} >
        
        {post.map((posts => <Grid item xs={2} sm={4} md={4} >
            <ArticleCard name = {posts.data().Title} description = {posts.data().Description} type = {posts.data().Type} image = {posts.data().Image} download = {posts.data().Download}></ArticleCard>
          </Grid>))}
      </Grid>
      </Box>
      {/* {post.map((posts => <ArticleCard name={posts.data().title}></ArticleCard>))} */}
    </Box>
    </Box>
  );
}