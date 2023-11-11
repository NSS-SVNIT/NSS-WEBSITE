import { Grid, Stack, Box, Divider } from "@mui/material";
import React from "react";
import { motion } from "framer-motion";
import NssTimeline from "./NssTimeline";

export default function AboutSection() {
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
          whileInView={{ opacity: 1, x: 0, transition: { duration: 1 } }}
          whileHover={{ scale: 1.1, transition: { duration: 0.5 } }}
        >
          <img
            style={{ width: "90%", borderRadius: 4 }}
            src="https://images.news18.com/ibnlive/uploads/2021/09/nss-163241541916x9.jpg"
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
              Celebrating our motto...
              <Box
                sx={{ fontFamily: "Nothing You Could Do", fontSize: "4rem" }}
              >
                Not me, but you !
              </Box>
            </Box>
            <Divider
              flexItem
              sx={{ bgcolor: "rgba(255,255,255,0.3)", width: "65%" }}
            />

            <Box sx={{ fontFamily: "DM Sans", fontSize: "1.5rem" }}>
              The Motto of NSS <b>"Not Me But You"</b>, reflects the essence of
              democratic living and upholds the need for self-less service. NSS
              helps the students development & appreciation to other person's
              point of view and also show consideration towards other living
              beings.
            </Box>
          </Stack>
        </motion.div>
      </Grid>
      {/* <Grid item lg={6} sx={12}>
        <Stack gap={4}>
          <Box sx={{ fontFamily: "Nothing You Could Do", fontSize: "4rem" }}>
            Our History
          </Box>

          <Box sx={{ fontFamily: "DM Sans", fontSize: "1.5rem" }}>
            TNSS Unit SVNIT started its journey in 2018 as a Self Financing Unit
            (SFU). Our volunteers worked dedicatedly for the betterment of the
            society. And our work was recognised by the Ministry of Youth
            Affairs and Sports by upgrading us to a Government Financed Unit. We
            received our first funding from the government in September 2022. As
            of the same date, NSS Unit SVNIT had over 200 volunteers who
            continue to work tirelessly for social growth and environmental
            wellness. NSS Unit SVNIT organises various on-campus and off-campus
            activities aimed at the integration of the community and generating
            widespread awareness about prevailing social issues.We live by our
            motto ‘Not Me But You.’ Our volunteers regulary visit nearby
            villages to educate people
          </Box>
        </Stack>
      </Grid> */}
      {/* <Grid item lg={6} sx={12}>
        <NssTimeline />
      </Grid> */}
    </Grid>
  );
}
