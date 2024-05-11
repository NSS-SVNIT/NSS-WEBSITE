import React from "react";
import Button from "@mui/material/Button";
import {
  Stack,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import NavButton from "../UI/NavButton";

export default function NavDialog({ openDialog, handleCloseDialog }) {
  return (
    <Dialog open={openDialog} onClose={handleCloseDialog}>
      <DialogTitle sx={{ textAlign: "center" }}>Menu</DialogTitle>
      <DialogContent>
        <Stack direction="column">
          <NavButton to="/about" color="inherit" onClick={handleCloseDialog}>
            About
          </NavButton>
          <NavButton to="/events" color="inherit" onClick={handleCloseDialog}>
            Events
          </NavButton>
          <NavButton to="/gallery" color="inherit" onClick={handleCloseDialog}>
                Gallery
          </NavButton>
          <NavButton to="/articles" color="inherit" onClick={handleCloseDialog}>
                Articles
          </NavButton>
          <NavButton to="/team" color="inherit" onClick={handleCloseDialog}>
            Team
          </NavButton>
          <NavButton to="/contact" color="inherit" onClick={handleCloseDialog}>
            Contact
          </NavButton>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Stack direction="column">
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}
