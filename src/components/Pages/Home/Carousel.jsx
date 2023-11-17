import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Button, Card, Box, Grid, Typography } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

export default function Example(props) {
  var items = [
    {
      title: "Message From Our Convenor Batch 2019",
      name: "Saurav Singh",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita dolorum, numquam doloremque porro laboriosam quas autem sit quis ex illum soluta id enim facilis temporibus voluptatem laborum beatae dolorem libero debitis vitae doloribus officia sequi distinctio cum! Voluptatum, corporis aperiam!",
      // url: "https://www.clipartmax.com/png/small/0-884_big-image-man-and-woman-animated.png"
    },
    {
      title: "Message From Our Convenor Batch 2020",
      name: "Saurav Singh",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita dolorum, numquam doloremque porro laboriosam quas autem sit quis ex illum soluta id enim facilis temporibus voluptatem laborum beatae dolorem libero debitis vitae doloribus officia sequi distinctio cum! Voluptatum, corporis aperiam!",
      //   url: "",
    },
    {
      title: "Message From Our Convenor Batch 2021",
      name: "Shubham Chandak",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex, harum quibusdam animi sunt perspiciatis eius, ducimus aliquid neque sit, quisquam sapiente. Nihil, quam! Incidunt magnam sunt minus fugit, ipsum quidem.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam ipsa esse libero numquam consequuntur nam perferendis nesciunt, explicabo illo fugiat. Quidem ipsum voluptas dicta fuga quasi? Ex officiis dolores excepturi?",
    },
    {
      title: "Message From Our Convenor Batch 2022",
      name: "Shubham Chandak",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex, harum quibusdam animi sunt perspiciatis eius, ducimus aliquid neque sit, quisquam sapiente. Nihil, quam! Incidunt magnam sunt minus fugit, ipsum quidem.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam ipsa esse libero numquam consequuntur nam perferendis nesciunt, explicabo illo fugiat. Quidem ipsum voluptas dicta fuga quasi? Ex officiis dolores excepturi?",
    },
  ];

  const indicatorButtonStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.5)", // Adjust the background color
    color: "black", // Adjust the text color
    borderRadius: "50%", // Make it circular
    width: "30px", // Set the width
    height: "30px", // Set the height
  };

  return (
    <Card
      sx={{
        p: 5,
        bgcolor: "beige",
        m: "20px auto",
        width: "80%",
        borderRadius: "15px",
      }}
    >
      <Carousel
        next={(next, active) =>
          console.log(`we left ${active}, and are now at ${next}`)
        }
        prev={(prev, active) =>
          console.log(`we left ${active}, and are now at ${prev}`)
        }
        autoplay={true} // Enable autoplay
        timeout={5000}
        navButtonsAlwaysVisible={true}
        NextIcon={<NavigateNextIcon />}
        PrevIcon={<NavigateBeforeIcon />}
      >
        {items.map((item, i) => (
          <Item key={i} item={item} />
        ))}
      </Carousel>
    </Card>
  );
}

function Item(props) {
  return (
    <Grid width="80%" sx={{ margin: "auto" }}>
      <h1>
        <Typography fontSize="45px">{props.item.title}</Typography>
      </h1>

      <Box
        color="black"
        column={6}
        display="flex"
        // width="70%"
        // sx={{ margin: "auto" }}
      >
        <Grid>
          <h2>
            <Typography sx={{ mb: 1 }} fontSize="40px" fontWeight={600}>
              {props.item.name}
            </Typography>
          </h2>

          <Typography sx={{}}>{props.item.description}</Typography>
        </Grid>
        <Grid>
          {props.item.url && (
            <img src={props.item.url} alt="Item" height="300px" />
          )}
        </Grid>
      </Box>
    </Grid>
  );
}
