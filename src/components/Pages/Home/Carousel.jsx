import React from "react";
import Carousel from "react-material-ui-carousel";

import {
  Card,
  Typography,
  Avatar,
  useMediaQuery
} from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import photo2018 from "./2018.jpg";
import photo2019 from "./2019.jpg";
import photo2020 from "./2020.jpg";
import founder from "./founder.jpg";

export default function Example(props) {
  const isMobile = useMediaQuery('(max-width:600px)');
  var items = [
    {
      title: "Message From Our Founder",
      name: "Gulshan Rana",
      description:
      "Embrace every challenge as an opportunity to learn and grow. Our commitment to service is a powerful force for good, and it has the potential to create a lasting impact on the lives of those we serve. Each small act of kindness, every initiative we take, contributes to the greater good. Our team is our support system, and together, we can overcome any hurdle. Be open to new ideas, perspectives, and collaborations, for it is in diversity that we find our greatest strength. Stay motivated, stay passionate, and always keep the purpose of service at the forefront of our actions. Our dedication has the power to inspire others to follow in our footsteps and create a ripple effect of positive change. Carry the torch of service with pride and let it illuminate the path towards a better tomorrow.",
      imageUrl: founder,
    },
    {
      title: "Message From Our Convenor Batch 2018",
      name: "Tushar Sanwarey",
      description:
      "To all the volunteers of NSS SVNIT always remember the cause you are working for i.e towards the betterment for our society and finding a better version of ourselves. Always aspire for Dreaming More! Learning More! Doing More! Becoming More",
      imageUrl: photo2018,
    },
    {
      title: "Message From Our Convenor Batch 2019",
      name: "Hiren Vaghela",
      description:
      "To the NSS volunteers, your commitment to service is a beacon of inspiration. In the tapestry of community, each stitch you weave contributes to a brighter, compassionate world. Embrace challenges as opportunities to sow seeds of positive change i.e the delta change as we know it. Your collective impact is immeasurable. Keep shining your light of selflessness; the world is brighter because of you.",
      imageUrl: photo2019,
    },
    {
      title: "Message From Our Convenor Batch 2020",
      name: "Saurav Singh",
      description:
      "To my dear family, continue to flourish and reach new pinnacles as you are currently doing. Looking at each of you dedicating yourselves to the betterment of society and those around you is truly inspiring and that's what we are always known for. Our journey from a small group to a dedicated force within a few years has been remarkable, yet there is a lot to do. Strive for transformative progress, and the outcomes will undoubtedly follow. Just Believe in yourself.",
      imageUrl: photo2020,
    },
    {
      title: "Message From Our Convenor Batch 2021",
      name: "Shubham Chandak",
      description:
      "Dear Readers, I hope this message finds you in the best of spirits. It is with immense gratitude that I reflect on my journey with the NSS Unit SVNIT, an organization that has truly become a second family to me. The NSS Unit SVNIT has consistently dedicated itself to community service, all while ensuring the holistic development of its volunteers. Our guiding motto, 'NOT ME BUT YOU' is a testament to the selflessness and commitment that each volunteer embodies.To the current batch of volunteers, I extend my heartfelt best wishes for your ongoing NSS activities. Your dedication and hard work continue to raise the bar and inspire all of us. Keep up the excellent work, and continue to make a difference in the community and yourselves.",
      imageUrl: "https://firebasestorage.googleapis.com/v0/b/nss-svnit.appspot.com/o/team%20page%2F2021%2FShubham.jpg?alt=media&token=162ebe8b-3068-46ba-861a-f98823c12647",
    },
    
  ];
  
  const indicatorButtonStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    color: "black",
    borderRadius: "50%",
    width: "30px",
    height: "30px",
  };
  
  return (
    <Card
    sx={{
      p:3,
      bgcolor: "beige",
      m: isMobile?"10px auto":"30px auto",
      width: isMobile?"90%":"80%",
      borderRadius: "15px",
      height: isMobile?"80vh":"55vh",
    }}
    >
      <Carousel
        // next={(next, active) =>
          //   console.log(`we left ${active}, and are now at ${next}`)
        // }
        // prev={(prev, active) =>
          //   console.log(`we left ${active}, and are now at ${prev}`)
        // }
        
        autoplay={true}
        timeout={5000}
        navButtonsAlwaysVisible={isMobile?false:true}
        NextIcon={!isMobile&&<NavigateNextIcon />}
        PrevIcon={!isMobile&&<NavigateBeforeIcon />}
        >
        {items.map((item, i) => (
          <MemoizedItem key={i} item={item} />
        ))}
      </Carousel>
    </Card>
  );
}

function Item(props) {
  const isMobile = useMediaQuery('(max-width:600px)');
  return (
    <div
      style={{
        width: "80%",
        margin: "auto",
        height: isMobile?"700px":"400px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h1 style={{ textAlign: "center" }}>
        <Typography variant={isMobile?"h6":"h3"}>{props.item.title}</Typography>
      </h1>

      <div style={{ display: "flex",flexDirection:isMobile?'column':'row',alignItems:'center',textAlign:'justify'}}>
        <div>
          <h2>
            <Typography
              variant={isMobile?"h6":"h4"}
              style={{
                marginBottom: isMobile?"0":"1rem",
                marginTop: isMobile?"0.1rem":"1rem",
                textAlign: "center",
                fontWeight: isMobile?400:600,
              }}
            >
              {props.item.name}
            </Typography>
          </h2>
          <Typography fontSize={isMobile?props.item.name==="Gulshan Rana"?"9px":"11px":"16px"}>{props.item.description}</Typography>
        </div>
          {props.item.name==="Gulshan Rana" && (
            <div style={{ flexShrink: 0, marginLeft: "3%" }}>
              {props.item.imageUrl && (
                <Avatar
                  alt="Profile Image"
                  src={props.item.imageUrl}
                  sx={{ width: 200, height: 200 }}
                />
              )}
            </div>
          )}
          {props.item.name!=="Gulshan Rana" && (
            <div style={{ margin: "5% 0 0 3%", flexShrink: 0 }}>
            {props.item.imageUrl && (
              <Avatar
                alt="Profile Image"
                src={props.item.imageUrl}
                sx={{ width: 200, height: 200 }}
              />
            )}
        </div>
          )}
      </div>
    </div>
  );
}

const MemoizedItem = React.memo(Item);
