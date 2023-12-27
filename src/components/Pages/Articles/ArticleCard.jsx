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
        height: "30vh",
        margin: "20px",
        width: "30vw",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent
          sx={{ flex: "1 0 auto" }}
          style={{ boxSizing: "border-box", heigth: "100%", width: "20vw" }}
        >
          <Typography component="div" variant="h5">
            {props.name}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {props.description}
          </Typography>
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
        </CardContent>

        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
          {/* <Button>Download</Button> */}
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={props.image}
        alt={props.type}
        style={{ objectFit: "fill" }}
      />
    </Card>
  );
});

export default ArticleCard;
