import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Firebase
import { collection, getDocs, orderBy, query, limit } from "firebase/firestore";
import { firestore } from "../../../firebase";

// Background image
import BackgroundImage from "../../../assets/eventBg.jpg";

// ------------------ Main Component ------------------
const RecentEvents = () => {
  return (
    <>
      <Stack
        alignItems="center"
        sx={{
          bgcolor: "background.default",
          pt: { xs: 5, md: 10 },
          pb: { xs: 3, md: 6 },
        }}
      >
        <Typography
          variant="h3"
          component="h2"
          sx={{ fontWeight: "bold", textAlign: "center" }}
        >
          Recent Events
        </Typography>
      </Stack>

      <ParallaxContent />
    </>
  );
};

// ------------------ Parallax Section ------------------
const ParallaxContent = () => {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      gap={{ xs: 4, md: 8 }}
      sx={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.5)), url(${BackgroundImage})`,
        backgroundAttachment: { xs: "scroll", md: "fixed" },
        backgroundPosition: "center",
        backgroundSize: "cover",
        py: { xs: 5, md: 10 },
        color: "white",
      }}
    >
      <InitiativeSlider />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
        viewport={{ once: true }}
      >
        <Button
          component={Link}
          to="/events"
          variant="contained"
          size="large"
          sx={{
            py: 1.2,
            px: 4,
            fontSize: "1rem",
            fontWeight: "bold",
            borderRadius: "50px",
          }}
        >
          Explore more Events
          <ArrowForward sx={{ ml: 1 }} />
        </Button>
      </motion.div>
    </Stack>
  );
};

// ------------------ Slider Component ------------------
const InitiativeSlider = () => {
  const [events, setEvents] = useState([]);
  const [active, setActive] = useState(0);
  const [error, setError] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const q = query(
          collection(firestore, "events"),
          orderBy("created_at", "desc"),
          limit(4)
        );

        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setEvents(data.filter((e) => e.cover_image && e.name));
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to load events");
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    if (events.length === 0) return;
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % events.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [events]);

  if (error) {
    return <Typography sx={{ color: "white" }}>{error}</Typography>;
  }

  if (events.length === 0) {
    return <Typography sx={{ color: "white" }}>Loading events...</Typography>;
  }

  // ------------------ MOBILE VIEW ------------------
  if (isMobile) {
    const item = events[active];

    return (
      <Box sx={{ width: "100%", px: 2 }}>
        <Box
          sx={{
            width: "100%",
            maxWidth: 360,
            mx: "auto",
            borderRadius: 3,
            overflow: "hidden",
            boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
            position: "relative",
          }}
        >
          <img
            src={item.cover_image}
            alt={item.name}
            style={{ width: "100%", height: 260, objectFit: "cover" }}
          />

          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              p: 2,
              background:
                "linear-gradient(to top, rgba(0,0,0,0.9), transparent)",
              textAlign: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{ color: "white", fontWeight: "bold" }}
            >
              {item.name}
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  }

  // ------------------ DESKTOP 3D VIEW ------------------
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        maxWidth: "1000px",
        mx: "auto",
        perspective: "1000px",
        height: "500px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          position: "relative",
        }}
      >
        {events.map((item, i) => {
          let style = {
            position: "absolute",
            width: "420px",
            height: "420px",
            borderRadius: "15px",
            overflow: "hidden",
            boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
            transition: "all 0.6s ease",
            cursor: "pointer",
            background: "#000",
          };

          if (i === active) {
            style.transform = "translateX(0) scale(1) rotateY(0deg)";
            style.zIndex = 3;
            style.opacity = 1;
          } else if (i === (active - 1 + events.length) % events.length) {
            style.transform = "translateX(-300px) scale(0.8) rotateY(15deg)";
            style.zIndex = 2;
            style.opacity = 0.9;
          } else if (i === (active + 1) % events.length) {
            style.transform = "translateX(300px) scale(0.8) rotateY(-15deg)";
            style.zIndex = 2;
            style.opacity = 0.9;
          } else {
            style.transform = "scale(0.6)";
            style.zIndex = 1;
            style.opacity = 0.3;
          }

          return (
            <Box key={item.id} style={style} onClick={() => setActive(i)}>
              <img
                src={item.cover_image}
                alt={item.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  p: 2,
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.9), transparent)",
                  textAlign: "center",
                }}
              >
                <Typography sx={{ fontWeight: "bold", color: "white" }}>
                  {item.name}
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default RecentEvents;
