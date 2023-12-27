import React from "react";
import { Stack, Divider } from "@mui/material";

export default function FooterLogo() {
  return (
    <Stack
      direction="column"
      justifyContent={"center"}
      alignItems="center"
      marginRight="500px"
    >
      <Stack direction="row" gap={2} height={75}>
        <img
          style={{ height: "75px" }}
          src="https://seeklogo.com/images/N/new-nss-logo-F8180B4F6C-seeklogo.com.png"
        ></img>
        <Divider orientation="vertical" flexItem />
        <img
          style={{ height: "75px" }}
          src="https://www.svnit.ac.in/conference/frsm2023/hit/svnit_logo.png"
        ></img>
      </Stack>

      <Stack alignItems={"center"} sx={{ mt: 2 }}>
        <div
          style={{
            fontFamily: "DM Sans",
            fontSize: "2rem",
            fontWeight: "100",
            color: "white",
          }}
        >
          NSS SVNIT
        </div>
        <div
          style={{
            fontFamily: "DM Sans",
            fontSize: "1rem",
            fontWeight: "400",
            color: "white",
          }}
        >
          National Service Scheme
        </div>
      </Stack>
    </Stack>
  );
}
