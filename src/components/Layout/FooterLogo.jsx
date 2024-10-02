import React from "react";
import { Stack, Divider, Typography } from "@mui/material";
import { useMediaQuery } from "@mui/material";

export default function FooterLogo() {
  const isMobile = useMediaQuery("(max-width:900px)");
  return (
    <Stack
      direction="column"
      justifyContent={"center"}
      alignItems="center"
      marginRight={isMobile ? "150px" : "500px"}
    >
      <Stack direction="row" gap={2} height={isMobile ? 55 : 75}>
        <img
          style={{
            height: `${isMobile ? "55px" : "75px"}`,
            marginLeft: `${isMobile ? "-40px" : "0px"}`,
            borderRadius: "50%",
          }}
          src="https://firebasestorage.googleapis.com/v0/b/nss-svnit.appspot.com/o/aboutImages%2Fnss_logo.jpg?alt=media&token=860074c2-3cf7-4e5d-86b4-f4bc61a37626"
        ></img>
        {!isMobile && <Divider orientation="vertical" flexItem />}
        <img
          style={{ height: `${isMobile ? "55px" : "75px"}` }}
          src="https://upload.wikimedia.org/wikipedia/en/thumb/1/1b/NIT_Surat_Logo.svg/300px-NIT_Surat_Logo.svg.png"
        ></img>
      </Stack>

      <Stack alignItems={"center"} sx={{ mt: isMobile ? 1 : 2 }}>
        <Typography
          sx={{
            fontFamily: "DM Sans",
            fontSize: { xs: "1.5rem", sm: "2rem" },
            fontWeight: "100",
            color: "white",
            ml: isMobile ? -5 : 0,
          }}
        >
          NSS SVNIT
        </Typography>
        <Typography
          sx={{
            fontFamily: "DM Sans",
            fontSize: { xs: "0.7rem", sm: "1rem" },
            fontWeight: "400",
            color: "white",
            ml: isMobile ? -4 : 0,
          }}
        >
          National Service Scheme
        </Typography>
      </Stack>
    </Stack>
  );
}
