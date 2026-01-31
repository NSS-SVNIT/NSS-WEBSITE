// ComitteeSection.js
import React from "react";
import { Box, Grid, Container, Typography } from "@mui/material";
import { motion } from "framer-motion";
import CommitteeCard from "./CommitteeCard"; // We will use the new card

// Import your GIFs here
import coin from "./coin.gif";
import document from "./document.gif";
import social from "./social.gif";
import technical from "./technical.gif";
import sports from "./sports.gif";
import creative from "./creative.gif";
import culture from "./culture.gif";

// --- Data Configuration ---
// It's cleaner to keep the data in the parent component.
const committeesData = [
  { id: 1, name: "Technical", icon: technical, description: "The NSS Technical Committee facilitates student engagement in engineering and technology by organizing projects, workshops, and industrial trips, promoting practical experiences to enhance technical skills and address societal challenges.", route: "/committee/technical" },
  { id: 2, name: "Sports", icon: sports, description: "The NSS Sports Committee prioritizes volunteers' physical health through morning routines and organizes sporting events. It manages discipline at NSS events and trains volunteers for the NSS parade, ensuring their overall well-being.", route: "/committee/sports" },
  { id: 3, name: "Social", icon: social, description: "The Social Committee organizes diverse events and campaigns, promoting social engagement, personal development, and community service. From orphanage visits to awareness campaigns, the committee fosters connections with other NSS units and NGOs, utilizing social media for effective communication.", route: "/committee/social" },
  { id: 4, name: "Finance", icon: coin, description: "The Finance Committee handles all financial aspects, managing bills and obtaining admin approval. It educates volunteers on finance and money management, playing a crucial role in ensuring financial transparency within the NSS SVNIT Unit.", route: "/committee/finance" },
  { id: 5, name: "Documentation", icon: document, description: "The Documentation Committee maintains detailed records of event planning, meeting minutes, and creates reports. Their meticulous documentation fosters effective communication with the faculty advisor, promoting transparency and informed decision-making within the unit.", route: "/committee/documentation" },
  { id: 6, name: "Creative", icon: creative, description: "The NSS Creative Committee utilizes creative abilities for the greater good, engaging in tasks from designing posters to video editing. It channels creativity to effectively promote welfare initiatives and spread messages that resonate with the audience.", route: "/committee/creative" },
  { id: 7, name: "Cultural", icon: culture, description: "The NSS Cultural Committee organizes diverse cultural events, providing a platform for talent expression in music, dance, and art. It promotes and preserves cultural heritage, encouraging student participation in celebrations that showcase their cultural identity.", route: "/committee/cultural" },
];

// --- Framer Motion Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const ComitteeSection = React.memo(() => {
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, background: ' linear-gradient(180deg, #f5faff 0%, #eef6ff 100%)' }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="h2"
            component="h2"
            textAlign="center"
            sx={{
              fontFamily: "'Inria Sans', serif",
              fontWeight: 700,
              color: "#5A2A7A",
              mb: { xs: 6, md: 8 },
              fontSize: { xs: "2.5rem", md: "4rem" }
            }}
          >
            Our Committees
          </Typography>
        </motion.div>
        <Grid
          container
          spacing={{ xs: 2, md: 4 }}
          justifyContent="center"
          component={motion.div}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {committeesData.map((committee, index) => (
            <Grid
              item
              xs={6}
              sm={6}
              md={4}
              key={committee.id}
              sx={{ display: 'flex' }}
            >
              <CommitteeCard
                title={committee.name}
                icon={committee.icon}
                about={committee.description}
                route={committee.route}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
});

export default ComitteeSection;