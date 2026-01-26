import React, { memo } from "react";
import { Stack, Typography, Box, useTheme } from "@mui/material";

const PageHeader = memo((props) => {
  const theme = useTheme();
  return (
    <Stack
      direction="column"
      sx={{
        pl: { xs: 2, sm: 4, md: 8, lg: 10 },
        pr: { xs: 2, sm: 4, md: 8, lg: 9 },
        fontFamily: "DM Sans",
        pt: { xs: 4, md: 6 },
        pb: { xs: 3, md: 4 },
        background: "linear-gradient(135deg, rgba(13, 71, 161, 0.05) 0%, rgba(25, 118, 210, 0.03) 100%)",
        borderRadius: "8px",
        backdropFilter: "blur(10px)",
      }}
    >
      <Typography 
        variant="h1" 
        sx={{ 
          fontWeight: 600,
          fontSize: { xs: "1.5rem", sm: "1.8rem", md: "2.2rem", lg: "2.5rem" },
          background: "linear-gradient(135deg, #0d47a1 0%, #1976d2 100%)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          mb: 2,
          letterSpacing: "-0.5px",
        }}
      >
        {props.title}
      </Typography>
      <Box 
        sx={{ 
          fontSize: { xs: "0.85rem", sm: "0.95rem", md: "1.05rem", lg: "1.1rem" },
          py: 1,
          color: "#333",
          lineHeight: 1.8,
          letterSpacing: "0.3px",
          fontWeight: 400,
          textAlign: "justify",
          "::first-letter": {
            fontSize: { xs: "1.1rem", sm: "1.3rem", md: "1.4rem", lg: "1.5rem" },
            fontWeight: 700,
            color: "#0d47a1",
            marginRight: "2px",
          }
        }}
      >
        {props.children}
      </Box>
    </Stack>
  );
});

export default PageHeader;
