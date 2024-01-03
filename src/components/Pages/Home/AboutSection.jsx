import { Grid, Stack, Box, Divider } from "@mui/material";
import React from "react";
import { motion } from "framer-motion";
import NssTimeline from "./NssTimeline";

const AboutSection = React.memo(() => {
  return (
    <Grid
      container
      sx={{
        bgcolor: "black",
        color: "white",
        py: 10,
        px: 8,
        overflow: "hidden",
      }}
      alignItems={"center"}
    >
      <Grid item lg={6} sx={12}>
        <motion.div
          initial={{ opacity: 0, x: -200 }}
          whileInView={{ opacity: 1, x: 0, scale: 1.1, transition: { duration: 0.5 } }}
          whileHover={{ scale: 1.13, transition: { duration: 0.5 } }}
        >
          <img
            style={{ width: "90%", borderRadius: 4 }}
            src="https://firebasestorage.googleapis.com/v0/b/nss-svnit.appspot.com/o/Not%20Me%20But%20You.jpg?alt=media&token=cd079525-7886-4bee-bd64-e7cd21920b51"
            alt="NSS Event"
          ></img>
        </motion.div>
      </Grid>
      <Grid item lg={6} sx={12}>
        <motion.div
          initial={{ opacity: 0, x: 200 }}
          whileInView={{ opacity: 1, x: 0, transition: { duration: 1 } }}
        >
          <Stack gap={4}>
            <Box
              sx={{
                fontFamily: "Poppins",
                fontWeight: "100",
                fontSize: "3rem",
              }}
            >
              Celebrating our Motto...
              <Box
                sx={{ fontFamily: "Nothing You Could Do", fontSize: "4rem" }}
              >
                Not Me, But You !
              </Box>
            </Box>
            <Divider
              flexItem
              sx={{ bgcolor: "rgba(255,255,255,0.3)", width: "65%" }}
            />

            <Box sx={{ fontFamily: "DM Sans", fontSize: "1.5rem", textAlign: "justify" }}>
              The Motto of NSS <b>"Not Me But You"</b>, reflects the essence of
              democratic living and upholds the need for self-less service. NSS
              helps the students development & appreciation to other person's
              point of view and also show consideration towards other living
              beings.
            </Box>
          </Stack>
        </motion.div>
      </Grid>
    </Grid>
  );
});

export default AboutSection;
