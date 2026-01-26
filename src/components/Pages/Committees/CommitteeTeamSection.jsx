import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Stack,
  Divider,
} from "@mui/material";

const CommitteeTeamSection = React.memo(() => {
  const batch2023 = [
    "Name 1",
    "Name 2",
    "Name 3",
    "Name 4",
    "Name 5",
    "Name 6",
  ];

  const batch2024 = [
    "Name 1",
    "Name 2",
    "Name 3",
    "Name 4",
    "Name 5",
    "Name 6",
  ];

  const renderBatch = (title, names) => (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        borderRadius: 3,
        border: "1px solid rgba(90, 42, 122, 0.12)",
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(245,250,255,0.9) 100%)",
      }}
    >
      <CardContent sx={{ p: { xs: 2, md: 2.5 } }}>
        <Typography
          variant="h5"
          sx={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 800,
            color: "#5A2A7A",
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            mt: 0.25,
            color: "text.secondary",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          Team members
        </Typography>

        <Divider sx={{ my: 1.5 }} />

        <Stack
          direction="column"
          useFlexGap
          sx={{
            gap: 1,
            pb: 0.25,
            maxHeight: { xs: 170, sm: 210, md: 250 },
            minHeight: { xs: 170, sm: 210, md: 250 },
            overflowY: "auto",
            pr: 0.5,
            scrollbarGutter: "stable",
            "&::-webkit-scrollbar": { width: 8 },
            "&::-webkit-scrollbar-track": { background: "transparent" },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(90, 42, 122, 0.25)",
              borderRadius: 8,
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "rgba(90, 42, 122, 0.35)",
            },
          }}
        >
            {names.map((name) => (
              <Chip
                key={name}
                label={name}
                size="small"
                variant="outlined"
                sx={{
                  borderRadius: 999,
                  fontFamily: "'DM Sans', sans-serif",
                  borderColor: "rgba(90, 42, 122, 0.2)",
                  "&:hover": {
                    borderColor: "rgba(90, 42, 122, 0.35)",
                    backgroundColor: "rgba(90, 42, 122, 0.06)",
                  },
                }}
              />
            ))}
          </Stack>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ mt: { xs: 5, md: 6 } }}>
      <Box sx={{ textAlign: "center", mb: { xs: 2.5, md: 3 } }}>
        <Typography
          variant="h3"
          sx={{
            fontFamily: "'Inria Sans', serif",
            fontWeight: 800,
            color: "#5A2A7A",
          }}
        >
          Team
        </Typography>
      </Box>

      <Grid container spacing={{ xs: 2, md: 3 }}>
        <Grid item xs={12} md={6}>
          {renderBatch("Batch 2023", batch2023)}
        </Grid>
        <Grid item xs={12} md={6}>
          {renderBatch("Batch 2024", batch2024)}
        </Grid>
      </Grid>
    </Box>
  );
});

export default CommitteeTeamSection;
