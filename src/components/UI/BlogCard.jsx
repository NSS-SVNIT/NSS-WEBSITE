import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Avatar,
  Box,
  Button,
  CardActionArea,
  CardActions,
  Rating,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function BlogCard(props) {
  return (
    <Card sx={{ display: "flex", boxShadow: 0}} disableRipple>
      <CardActionArea disableRipple>
        <Stack direction="column" sx={{objectFit: "cover"}}>
          <CardMedia
            component="img"
            sx={{ fontFamily: "DM Sans", width: "100%", height: "35vh", objectFit: "cover" }}
            // image="https://media.nomadicmatt.com/2023/oaxitinerary2.jpeg"
            image= {props.image}
            alt="green iguana"
          />
          <CardContent>
            <Stack direction="column" gap={0}>
              <Stack direction="row" gap={2} justifyContent={"space-between"}>
                <Typography
                  gutterBottom
                  sx={{ fontFamily: "DM Sans", fontSize: "2rem" }}
                  variant="h5"
                  component="div"
                >
                  {props.title}
                </Typography>
                {/* <Avatar>P</Avatar> */}
              </Stack>
              {/* <Rating
                value={4.5}
                precision={0.5}
                readOnly
                sx={{ pb: 2 }}
              ></Rating> */}
              {/* <Typography
                variant="body"
                sx={{ fontFamily: "Poppins", fontSize: "1.1rem" }}
                color="text.secondary"
              >
                Step into a world of wonder and adventure as we invite you to
                join our enchanting Winter Camp. Embrace the magic of the winter
                season and create lifelong memories in a cozy and vibrant
                atmosphere. Our Winter Camp offers an unforgettable experience
                filled with exciting activities, heartwarming moments, and
                opportunities for personal growth.
              </Typography> */}
              <Link to={props.to}>
                <Button
                  color="primary"
                  style={{
                    borderRadius: 0,
                    height: "40px",
                    marginTop: "1rem",
                    color: "black",
                    width: "150px",
                    border: "2px black solid",
                    fontSize: "1.1rem",
                    fontFamily: "DM Sans",
                  }}
                >
                  READ MORE
                </Button>
              </Link>
            </Stack>
          </CardContent>
        </Stack>
      </CardActionArea>
    </Card>
  );
}
