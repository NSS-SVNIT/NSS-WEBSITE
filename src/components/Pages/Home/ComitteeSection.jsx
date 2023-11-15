import React from "react";
import { Stack, Box, Grid } from "@mui/material";
import ComitteeCard from "./CommitteeCard";
import { motion } from "framer-motion";

const ComitteeSection = () => {
  const comittees = [
    {
      name: "Technical",
      description:
        "The NSS Technical Committee facilitates student engagement in engineering and technology by organizing projects, workshops, and industrial trips, promoting practical experiences to enhance technical skills and address societal challenges.",
      url: "https://static.vecteezy.com/system/resources/thumbnails/006/298/276/small/gear-smart-eps-icon-digital-tech-business-logo-free-vector.jpg",
    },
    {
      name: "Sports",
      description:
        "The NSS Sports Committee prioritizes volunteers' physical health through morning routines and organizes sporting events. It manages discipline at NSS events and trains volunteers for the NSS parade, ensuring their overall well-being.",

      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShUkmy4KvaHOCzTQ2FZPb7zR6RPdmaHwoS9w&usqp=CAU",
    },
    {
      name: "Social",
      description:
        "The Social Committee organizes diverse events and campaigns, promoting social engagement, personal development, and community service. From orphanage visits to awareness campaigns, the committee fosters connections with other NSS units and NGOs, utilizing social media for effective communication.",
      url: "https://img-res.pitchero.com/?url=images.pitchero.com%2Fui%2F3557239%2Fimage_619ce661bd1b4.jpeg&w=1200&h=630&t=frame",
    },
    {
      name: "Finance",
      description:
        "The Finance Committee handles all financial aspects, managing bills and obtaining admin approval. It educates volunteers on finance and money management, playing a crucial role in ensuring financial transparency within the NSS SVNIT Unit.",
      url: "https://images.squarespace-cdn.com/content/v1/54495c98e4b09917e1edea9e/1586371440171-CJS743CR0DECIU2LKBB6/finance-committee.png?format=1000w",
    },
    {
      name: "Documentation",
      description:
        "The Documentation Committee maintains detailed records of event planning, meeting minutes, and creates reports. Their meticulous documentation fosters effective communication with the faculty advisor, promoting transparency and informed decision-making within the unit.",
      url: "https://cdn-icons-png.flaticon.com/512/114/114793.png",
    },
    {
      name: "Creative",
      description:
        "The NSS Cultural Committee organizes diverse cultural events, providing a platform for talent expression in music, dance, and art. It promotes and preserves cultural heritage, encouraging student participation in celebrations that showcase their cultural identity.",
      url: "https://m.economictimes.com/thumb/msid-71847583,width-1200,height-900,resizemode-4,imgsize-454592/shutterstock_375129304.jpg",
    },
    {
      name: "Cultural",
      description:
        "The NSS Creative Committee utilizes creative abilities for the greater good, engaging in tasks from designing posters to video editing. It channels creativity to effectively promote welfare initiatives and spread messages that resonate with the audience.",
      url: "https://i.pinimg.com/originals/67/88/25/6788254d74a06bfc3d3167fdd74b201e.png",
    },
  ];
  return (
    <Stack>
      <Box
        sx={{
          fontFamily: "DM Sans",
          fontSize: "4rem",
          px: 8,
          textAlign: "center",
          m: 5,
          pl: "15px",
          pr: "40px",
        }}
      >
        About Our Comittees
      </Box>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{ px: 8, py: 6 }}
      >
        {comittees.map((title, index) => {
          return (
            <Grid item xs={6} lg={3} key={index}>
              <motion.div
                initial={{ opacity: 0, y: (index + 1) * 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
              >
                <ComitteeCard
                  title={title.name}
                  about={title.description}
                  url={title.url}
                />
              </motion.div>
            </Grid>
          );
        })}
      </Grid>
    </Stack>
  );
};

export default ComitteeSection;
