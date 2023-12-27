import React, { memo } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Button, CardActionArea, Stack } from "@mui/material";
import { Link } from "react-router-dom";

const BlogCard = memo((props) => {
  const { title, to, image } = props;

  return (
    <Card sx={{ display: "flex", boxShadow: 0 }} disableRipple>
      <CardActionArea disableRipple>
        <Stack direction="column">
          <CardMedia
            component="img"
            sx={{ fontFamily: "DM Sans", width: "100%" }}
            image={image}
            alt={title}
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
                  {title}
                </Typography>
              </Stack>
              <Link to={to}>
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
});

export default BlogCard;
