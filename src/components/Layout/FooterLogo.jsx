import React from "react";
import { Stack, Divider } from "@mui/material";

export default function FooterLogo() {
  return (
    <Stack direction="column" justifyContent={"center"} alignItems="center">
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
            fontSize: "3rem",
            fontWeight: "100",
          }}
        >
          NSS SVNIT
        </div>
        <div
          style={{
            fontFamily: "DM Sans",
            fontSize: "1.2rem",
            fontWeight: "400",
          }}
        >
          National Service Scheme
        </div>
      </Stack>
    </Stack>
  );
}
