import React from "react";
import { Stack, Box, Grid } from "@mui/material";
import ComitteeCard from "./CommitteeCard";
import { motion } from "framer-motion";

const ComitteeSection = () => {
  const comittees = [
    "Technical",
    "Sports",
    "Social",
    "Finance",
    "Documentation",
    "Creative",
    "Cultural",
  ];
  return (
    <Stack>
      <Box
        sx={{
          fontFamily: "DM Sans",
          fontSize: "4rem",
          px: 8,
        }}
      >
        Our Comittees
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
                <ComitteeCard title={title} />
              </motion.div>
            </Grid>
          );
        })}
      </Grid>
    </Stack>
  );
};

export default ComitteeSection;
