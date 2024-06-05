import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./ArticleCard.css";

const url =
  "https://firebasestorage.googleapis.com/v0/b/nss-svnit.appspot.com/o/articleImages%2FReport%2FCamp%20Report1.pdf?alt=media&token=f04dc8ff-2bed-41ee-a5ee-98473afb3e98";

const ArticleCard = React.memo((props) => {
  const theme = useTheme();

  const download = (url) => {
    const newTab = window.open(url, "_blank");
    if (newTab) {
      newTab.focus();
    } else {
      alert("Please allow popups for this website");
    }
  };
  return (
    <Card
      sx={{
        display: "flex",
        borderRadius: 4,
        boxShadow: "0 10px 16px rgba(0, 0, 0, 0.2)",
        backgroundColor: "#f5f5f5",
        height: props.type==='Camp Report'?'30vh':"25vh",
        margin: "20px",
        width: "30vw",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent
          sx={{ flex: "1 0 auto" }}
          style={{ boxSizing: "border-box", heigth: "100%", width: "20vw" }}
        >
          <Typography component="div" variant="h5" textAlign={"center"}>
            {props.name}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
            align="center"
          >
            {props.description}
          </Typography>
          <div style={{ display: "flex", justifyContent: "center" ,flexDirection:'column'}}>
          <Button
            onClick={() => {
              download(props.download);
            }}
          >
            <button class="button" type="button">
              <span class="button__text">Download</span>
              <span class="button__icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 35 35"
                  id="bdd05811-e15d-428c-bb53-8661459f9307"
                  data-name="Layer 2"
                  class="svg"
                >
                  <path d="M17.5,22.131a1.249,1.249,0,0,1-1.25-1.25V2.187a1.25,1.25,0,0,1,2.5,0V20.881A1.25,1.25,0,0,1,17.5,22.131Z"></path>
                  <path d="M17.5,22.693a3.189,3.189,0,0,1-2.262-.936L8.487,15.006a1.249,1.249,0,0,1,1.767-1.767l6.751,6.751a.7.7,0,0,0,.99,0l6.751-6.751a1.25,1.25,0,0,1,1.768,1.767l-6.752,6.751A3.191,3.191,0,0,1,17.5,22.693Z"></path>
                  <path d="M31.436,34.063H3.564A3.318,3.318,0,0,1,.25,30.749V22.011a1.25,1.25,0,0,1,2.5,0v8.738a.815.815,0,0,0,.814.814H31.436a.815.815,0,0,0,.814-.814V22.011a1.25,1.25,0,1,1,2.5,0v8.738A3.318,3.318,0,0,1,31.436,34.063Z"></path>
                </svg>
              </span>
            </button>
          </Button>
          <Button
            onClick={() => {
              download(props.flipbook);
            }}
          >
            <button class="button" type="button">
              <span class="button__text">E-Book</span>
              <span class="button__icon">
              <svg xmlns="http://www.w3.org/2000/svg" height="20" width="22.5" viewBox="0 0 576 512"><path fill="#ffffff" d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/></svg>
              </span>
            </button>
          </Button>
          </div>
        </CardContent>

        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
          {/* <Button>Download</Button> */}
        </Box>
      </Box>
      <a href={props.flipbook} target="_blank">
      <CardMedia
        component="img"
        sx={{ width: 151,height:props.type==='Camp Report'?'30vh':'auto' }}
        image={props.image}
        alt={props.type}
      />
      </a>
    </Card>
  );
});

export default ArticleCard;
