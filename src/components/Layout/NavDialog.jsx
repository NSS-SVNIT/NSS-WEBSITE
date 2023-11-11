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

export default function NavDialog({ openDialog, handleCloseDialog }) {
  return (
    <Dialog open={openDialog} onClose={handleCloseDialog}>
      <DialogTitle sx={{ textAlign: "center" }}>Menu</DialogTitle>
      <DialogContent>
        <Stack direction="column">
          <Button color="inherit" onClick={handleCloseDialog}>
            About
          </Button>
          <Button color="inherit" onClick={handleCloseDialog}>
            Events
          </Button>
          <Button color="inherit" onClick={handleCloseDialog}>
            Team
          </Button>
          <Button color="inherit" onClick={handleCloseDialog}>
            Contacts
          </Button>
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
