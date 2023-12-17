import React from "react";
import Carousel from "react-material-ui-carousel";
import {
  Paper,
  Button,
  Card,
  Box,
  Grid,
  Typography,
  Avatar,
} from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import photo2018 from "./2018.jpg";
import photo2019 from "./2019.jpg";
import photo2020 from "./2020.jpg";
import founder from "./founder.jpg";

export default function Example(props) {
  var items = [
    {
      title: "Message From Our Founder",
      name: "Gulshan Rana",
      description:
        "Embrace every challenge as an opportunity to learn and grow. Our commitment to service is a powerful force for good, and it has the potential to create a lasting impact on the lives of those we serve. Each small act of kindness, every initiative we take, contributes to the greater good. Our team is our support system, and together, we can overcome any hurdle. Be open to new ideas, perspectives, and collaborations, for it is in diversity that we find our greatest strength. Stay motivated, stay passionate, and always keep the purpose of service at the forefront of our actions. Our dedication has the power to inspire others to follow in our footsteps and create a ripple effect of positive change. Carry the torch of service with pride and let it illuminate the path towards a better tomorrow.",
      // url: "https://www.clipartmax.com/png/small/0-884_big-image-man-and-woman-animated.png"
      imageUrl: founder,
    },
    {
      title: "Message From Our Convenor Batch 2018",
      name: "Tushar Sanwarey",
      description:
        "To all the volunteers of NSS SVNIT always remember the cause you are working for i.e towards the betterment for our  society and finding a better version of ourself. Always aspire for  Dreaming More! Learning More! Doing More! Becoming More",
      //   url: "",
      imageUrl: photo2018,
    },
    {
      title: "Message From Our Convenor Batch 2019",
      name: "Hiren Vaghela",
      description:
        "To the NSS volunteers, your commitment to service is a beacon of inspiration. In the tapestry of community, each stitch you weave contributes to a brighter, compassionate world. Embrace challenges as opportunities to sow seeds of positive change i.e the delta change as we know it. Your collective impact is immeasurable. Keep shining your light of selflessness; the world is brighter because of you.",
      imageUrl: photo2019,
    },
    {
      title: "Message From Our Convenor Batch 2020",
      name: "Saurav Singh",
      description:
        "To my dear family, continue to flourish and reach new pinnacles as you are currently doing. Looking at each of you dedicating yourselves to the betterment of society and those around you is truly inspiring and that's what we are always known for. Our journey from a small group to a dedicated force within a few years has been remarkable, yet there is lot to do. Strive for transformative progress , and the outcomes will undoubtedly follow. Just Believe in yourself.",
      imageUrl: photo2020,
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
        m: "30px auto",
        width: "80%",
        borderRadius: "15px",
        height: "400px",
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
        // indicators={false}
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
    <div
      style={{
        width: "80%",
        margin: "auto",
        height: "400px",
        overflow: "hidden",
      }}
    >
      <h1 style={{ textAlign: "center" }}>
        <Typography variant="h3">{props.item.title}</Typography>
      </h1>

      <div style={{ display: "flex", alignItems: "center" }}>
        <div>
          <h2>
            <Typography
              variant="h4"
              style={{
                marginBottom: "1rem",
                marginTop: "1rem",
                textAlign: "center",
                fontWeight: 600,
              }}
            >
              {props.item.name}
            </Typography>
          </h2>

          <Typography>{props.item.description}</Typography>
        </div>

        <div style={{ marginLeft: "auto", flexShrink: 0 }}>
          {props.item.imageUrl && (
            <Avatar
              alt="Profile Image"
              src={props.item.imageUrl}
              sx={{ width: 200, height: 200 }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
