import { Avatar, Box, Card, LinearProgress, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";

export default function Profile({ profilePic, profileName }) {  return (
    <>
       <Stack>
        <Stack direction="row">
          <Avatar src={profilePic} sx={{ height: "4rem", width: "4rem" }}>
            {profileName.charAt(0)}
          </Avatar>
          <Stack sx={{ pl: 2 }}>
            <Box sx={{ fontFamily: "DM Sans", fontSize: "1.5rem" }}>
              {profileName}
            </Box>
          </Stack>
        </Stack>
      </Stack>
      <Stack>
        <Card sx={{ fontFamily: "DM Sans", p: 1, mt: 2 }}>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Box sx={{ fontSize: "1.3rem" }}>
              Hours
              <br /> Completed
            </Box>
            <Box fontFamily={"Poppins"}>
              <span
                style={{
                  fontSize: "3rem",
                  fontWeight: 100,
                }}
              >
                23
              </span>
              /120
            </Box>
          </Stack>
          <LinearProgress sx={{ mt: 1 }} variant="determinate" value={30} />
        </Card>
        <Card sx={{ fontFamily: "DM Sans", p: 1, mt: 2 }}>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            spacing={4}
          >
            <Box sx={{ fontSize: "1.3rem" }}>
              Morning
              <br /> Routine Attendance
            </Box>
            <Box fontFamily={"Poppins"}>
              <span
                style={{
                  fontSize: "3rem",
                  fontWeight: 100,
                }}
              >
                23
              </span>
              /120
            </Box>
          </Stack>
          <LinearProgress sx={{ mt: 1 }} variant="determinate" value={30} />
        </Card>
      </Stack>
    </>
  );
}
