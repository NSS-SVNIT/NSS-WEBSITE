import { Box, Card, CardActionArea, TextField } from "@mui/material";
import React from "react";
import SortableList from "./SortableList";

export default function Updates() {
  const updates = ["Update 1", "Update 2", "Update 3", "Update 4"];

  return (
    <Box sx={{ fontFamily: "DM Sans" }}>
      <SortableList />
      {/* <TextField variant="filled" fullWidth label="New Update" /> */}
    </Box>
  );
}
