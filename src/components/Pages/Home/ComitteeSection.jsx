import React from "react";
import { Stack, Box, Grid } from "@mui/material";
import ComitteeCard from "./CommitteeCard";
import { motion } from "framer-motion";

const ComitteeSection = () => {
  const comittees = [
    {
      name: "Technical",
      description: "The NSS Technical Committee provides technical support, organizes projects, workshops, and industrial trips for students interested in engineering and technology. It aims to enhance technical skills, promote innovation, and address societal challenges through practical experiences and knowledge sharing.",
      url:"https://static.vecteezy.com/system/resources/thumbnails/006/298/276/small/gear-smart-eps-icon-digital-tech-business-logo-free-vector.jpg"
      
    },
    {
      name: "Sports",
      description: "NSS Sports Committee plays a vital role in maintaining volunteers' physical health with morning routines and organizing various sporting events. In charge of organising and training the volunteers for the NSS parade.Ensuring discipline at different NSS events is another role of this committee.",
      url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShUkmy4KvaHOCzTQ2FZPb7zR6RPdmaHwoS9w&usqp=CAU"
    },
    {
      name: "Social",
      description: "The Social Committee plays a crucial role in organizing various events, activities, and campaigns that promote social engagement, and personal development. From organizing community service projects to planning orphanage and old age home visits, group discussions, debates, and awareness campaigns. Apart from this we also handle Social Media and stay in touch with other NSS Units and NGOs.",
      url:"https://img-res.pitchero.com/?url=images.pitchero.com%2Fui%2F3557239%2Fimage_619ce661bd1b4.jpeg&w=1200&h=630&t=frame"
    },
    {
      name: "Finance",
      description: "The role of this committee is to handle all the finances. From handling all the bills to getting it approved from the admin section the finance committee plays very important role. The committee also plans on educating the volunteers about finance and money management.",
      url:"https://images.squarespace-cdn.com/content/v1/54495c98e4b09917e1edea9e/1586371440171-CJS743CR0DECIU2LKBB6/finance-committee.png?format=1000w"
    },
    {
      name: "Documentation",
      description: "The Documentation Committee of NSS SVNIT Unit is responsible for maintaining professional and detailed records of event planning, minutes of meetings, and creating reports for each event. Their meticulous documentation ensures proper communication with the faculty advisor, enabling transparency and effective decision-making within the unit.",
      url: "https://cdn-icons-png.flaticon.com/512/114/114793.png"
    },
    {
      name: "Creative",
      description: "Promotes creativity and artistic endeavors.Lorem ipsum dolor sit amet consectetur adipisicing elit. At laudantium eligendi reiciendis blanditiis aut cum! Iste laboriosam vero laborum qui? dgldsfc deidhsn dkhazocnsx djuskxsz rudhbkmf dbnd hjdb wyujwb w ",
      url: "https://m.economictimes.com/thumb/msid-71847583,width-1200,height-900,resizemode-4,imgsize-454592/shutterstock_375129304.jpg"
    },
    {
      name: "Cultural",
      description: "The NSS Cultural Committee organizes and manages diverse cultural events to promote and preserve cultural heritage. They encourage student participation, providing a platform for talent expression through music concerts, dance performances, art exhibitions, and more, fostering a celebration of culture.",
      url:"https://i.pinimg.com/originals/67/88/25/6788254d74a06bfc3d3167fdd74b201e.png"
    }
  ];
  return (
    <Stack>
      <Box
        sx={{
          fontFamily: "DM Sans",
          fontSize: "4rem",
          px: 8,
          textAlign:'center',
          m:5,
          pl: "15px",
          pr: "40px",
        }}

      >
        About Our  Comittees
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
                <ComitteeCard title={title.name} about={title.description} url = {title.url}/>
              </motion.div>
            </Grid>
          );
        })}
      </Grid>
    </Stack>
  );
};

export default ComitteeSection;
