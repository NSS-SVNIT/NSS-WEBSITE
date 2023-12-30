import React from "react";
import { Stack, Box } from "@mui/material";
import { motion } from "framer-motion";
import GalleryView from "./GalleryView";
import Memories from "../../MemoriesText";

const GallerySection = React.memo(() => {
  return (
    <Stack
      direction={"row"}
      gap={5}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <Box sx={{ pl: 10 }}>
          <Memories />
        </Box>
      </motion.div>
      <GalleryView />
    </Stack>
  );
});

export default GallerySection;
