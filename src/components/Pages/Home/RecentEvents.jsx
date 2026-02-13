import React, { useEffect, useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Firebase (same pattern as Gallery.jsx)
import { collection, getDocs, orderBy, query, limit } from "firebase/firestore";
import { firestore } from "../../../firebase"; // ⚠️ adjust path if needed

// Background image
import BackgroundImage from "../../../assets/eventBg.jpg";

// ------------------ Main Component ------------------
const RecentEvents = () => {
  return (
    <React.Fragment>
      <Stack
        alignItems="center"
        sx={{
          bgcolor: "background.default",
          pt: { xs: 6, md: 10 },
          pb: { xs: 4, md: 6 },
        }}
      >
        <Typography variant="h2" component="h2" sx={{ fontWeight: "bold" }}>
          Recent Events
        </Typography>
      </Stack>

      <ParallaxContent />
    </React.Fragment>
  );
};

// ------------------ Parallax Section ------------------
const ParallaxContent = () => {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      gap={{ xs: 6, md: 8 }}
      sx={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.5)), url(${BackgroundImage})`,
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        backgroundSize: "cover",
        py: { xs: 6, md: 10 },
        color: "white",
      }}
    >
      <InitiativeSlider />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } }}
        viewport={{ once: true }}
      >
        <Button
          component={Link}
          to="/events"
          variant="contained"
          size="large"
          sx={{
            py: 1.5,
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

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const q = query(
          collection(firestore, "events"),
          orderBy("created_at", "desc"), // or "event_timestamp"
          limit(4)
        );

        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Only keep valid items
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

  return (
    <div style={{ position: "relative", width: "100%", maxWidth: "1000px", margin: "0 auto", perspective: "1000px" }}>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "500px", position: "relative" }}>
        {events.map((item, i) => {
          let style = {
            position: "absolute",
            width: "500px",
            height: "500px",
            borderRadius: "15px",
            overflow: "hidden",
            boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
            transition: "all 0.6s ease",
            cursor: "pointer",
          };

          if (i === active) {
            style.transform = "translateX(0) scale(1) rotateY(0deg)";
            style.zIndex = 3;
            style.opacity = 1;
          } else if (i === (active - 1 + events.length) % events.length) {
            style.transform = "translateX(-350px) scale(0.8) rotateY(15deg)";
            style.zIndex = 2;
            style.opacity = 0.9;
          } else if (i === (active + 1) % events.length) {
            style.transform = "translateX(350px) scale(0.8) rotateY(-15deg)";
            style.zIndex = 2;
            style.opacity = 0.9;
          } else {
            style.transform = "translateX(0) scale(0.6) rotateY(0deg)";
            style.zIndex = 1;
            style.opacity = 0.3;
          }

          return (
            <div key={item.id} style={style} onClick={() => setActive(i)}>
              <img
                src={item.cover_image}
                alt={item.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "0",
                  left: "0",
                  right: "0",
                  background: "linear-gradient(to top, rgba(0,0,0,0.9), transparent)",
                  color: "white",
                  padding: "20px",
                  textAlign: "center",
                }}
              >
                <span
                  style={{
                    background: "rgba(0,0,0,0.8)",
                    color: "white",
                    padding: "8px 16px",
                    borderRadius: "20px",
                    border: "1px solid rgba(255,255,255,0.3)",
                    fontSize: "16px",
                    fontWeight: "bold",
                    display: "inline-block",
                  }}
                >
                  {item.name}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentEvents;
