import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import {
  Avatar,
  Box,
  Card,
  Chip,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import Carousel from "react-material-ui-carousel";
import { motion } from "framer-motion";

// --- Images ---
import photo2018 from "./2018.jpg";
import photo2019 from "./2019.jpg";
import photo2020 from "./2020.jpg";
import photo2021 from "./2021.jpg";
import photo2022 from "./2022.jpg";
import founder from "./founder.jpg";

// --- Data ---
const items = [
	{
		title: "Message From Our Founder",
		name: "Gulshan Rana",
		description:
			"Embrace every challenge as an opportunity to learn and grow. Our commitment to service is a powerful force for good, and it has the potential to create a lasting impact on the lives of those we serve. Each small act of kindness, every initiative we take, contributes to the greater good. Our team is our support system, and together, we can overcome any hurdle. Be open to new ideas, perspectives, and collaborations, for it is in diversity that we find our greatest strength. Stay motivated, stay passionate, and always keep the purpose of service at the forefront of our actions. Our dedication has the power to inspire others to follow in our footsteps and create a ripple effect of positive change. Carry the torch of service with pride and let it illuminate the path towards a better tomorrow.",
		imageUrl: founder,
		role: "Founder",
		year: "NSS SVNIT",
	},
	{
		title: "Message From Our Convenor Batch 2018",
		name: "Tushar Sanwarey",
		description:
			"To all the volunteers of NSS SVNIT always remember the cause you are working for i.e towards the betterment for our society and finding a better version of ourselves. Always aspire for Dreaming More! Learning More! Doing More! Becoming More",
		imageUrl: photo2018,
		role: "Convenor",
		year: "Batch 2018",
	},
	{
		title: "Message From Our Convenor Batch 2019",
		name: "Hiren Vaghela",
		description:
			"To the NSS volunteers, your commitment to service is a beacon of inspiration. In the tapestry of community, each stitch you weave contributes to a brighter, compassionate world. Embrace challenges as opportunities to sow seeds of positive change i.e the delta change as we know it. Your collective impact is immeasurable. Keep shining your light of selflessness; the world is brighter because of you.",
		imageUrl: photo2019,
		role: "Convenor",
		year: "Batch 2019",
	},
	{
		title: "Message From Our Convenor Batch 2020",
		name: "Saurav Singh",
		description:
			"To my dear family, continue to flourish and reach new pinnacles as you are currently doing. Looking at each of you dedicating yourselves to the betterment of society and those around you is truly inspiring and that's what we are always known for. Our journey from a small group to a dedicated force within a few years has been remarkable, yet there is a lot to do. Strive for transformative progress, and the outcomes will undoubtedly follow. Just Believe in yourself.",
		imageUrl: photo2020,
		role: "Convenor",
		year: "Batch 2020",
	},
	{
		title: "Message From Our Convenor Batch 2021",
		name: "Shubham Chandak",
		description:
			"Dear Readers, I hope this message finds you in the best of spirits. It is with immense gratitude that I reflect on my journey with the NSS Unit SVNIT, an organization that has truly become a second family to me. The NSS Unit SVNIT has consistently dedicated itself to community service, all while ensuring the holistic development of its volunteers. Our guiding motto, 'NOT ME BUT YOU' is a testament to the selflessness and commitment that each volunteer embodies.To the current batch of volunteers, I extend my heartfelt best wishes for your ongoing NSS activities. Your dedication and hard work continue to raise the bar and inspire all of us. Keep up the excellent work, and continue to make a difference in the community and yourselves.",
		imageUrl: photo2021,
		role: "Convenor",
		year: "Batch 2021",
	},
	{
		title: "Message From Our Convenor Batch 2022",
		name: "Shrishti Arya",
		description: `As I look back on our journey so far, I am filled with a sense of pride and appreciation for the incredible work we've done together. Each step we’ve taken, every challenge we’ve faced, and all the moments of success reflect our dedication and hard work. The NSS Unit SVNIT has been more than just an organization – it's a family that thrives on compassion, empathy, and service. Through our diverse activities and outreach programs, we've not only made a difference in the lives of many but also grown as individuals, learning leadership, teamwork, and community spirit. Our motto, "NOT ME BUT YOU," serves as a constant reminder of the selfless spirit that drives us. It’s not just a motto; it’s a way of life that we carry in every action, every programs, and every interaction. Dedication, devotion, and discipline are the three pillars on which our unit stands, together, these principles have empowered us to bring delta change, not just in the communities we serve, but also within ourselves. To the team, I offer my sincerest appreciation for the tireless efforts you all are putting to take NSS SVNIT beyond the limits. Keep Going, Keep Shining!!!`,
		imageUrl: photo2022,
		role: "Convenor",
		year: "Batch 2022",
	},
];
// --- Animations ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// --- Slide ---
const CarouselItem = ({ item }) => {
  const theme = useTheme();

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <Grid container spacing={3} alignItems="center">
        {/* Left */}
        <Grid item xs={12} md={4}>
          <motion.div variants={itemVariants}>
            <Stack alignItems="center" spacing={2}>
              <Avatar
                src={item.imageUrl}
                alt={item.name}
                sx={{
                  width: { xs: 120, md: 180 },
                  height: { xs: 120, md: 180 },
                  border: `3px solid ${theme.palette.primary.main}`,
                  boxShadow: `0 10px 30px ${alpha(theme.palette.primary.main, 0.3)}`,
                }}
              />
              <Typography fontWeight={700}>{item.name}</Typography>
              <Chip label={`${item.role} | ${item.year}`} />
            </Stack>
          </motion.div>
        </Grid>

        {/* Right */}
        <Grid item xs={12} md={8}>
          <motion.div variants={itemVariants} style={{ position: "relative" }}>
            <FormatQuoteIcon
              sx={{
                fontSize: 100,
                color: theme.palette.grey[200],
                position: "absolute",
                top: -40,
                left: -20,
                transform: "rotate(180deg)",
              }}
            />

            {/* ✅ FIXED HEIGHT + SCROLL */}
            <Box
              sx={{
                position: "relative",
                zIndex: 1,
                maxHeight: { xs: 260, sm: 280, md: 300 },
                minHeight: { xs: 220, md: 260 },
                overflowY: "auto",
                pr: 1,

                scrollbarWidth: "thin",
                "&::-webkit-scrollbar": { width: "6px" },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "rgba(0,0,0,0.3)",
                  borderRadius: "8px",
                },
              }}
            >
              <Typography
                sx={{
                  textAlign: "justify",
                  lineHeight: 1.7,
                  color: "text.secondary",
                  fontSize: { xs: "0.95rem", md: "1.05rem" },
                }}
              >
                {item.description}
              </Typography>
            </Box>
          </motion.div>
        </Grid>
      </Grid>
    </motion.div>
  );
};

// --- Main ---
export default function CarouselResponsive() {
  const theme = useTheme();
  const [autoPlay, setAutoPlay] = useState(true);

  return (
    <Box sx={{ py: { xs: 4, md: 8 }, bgcolor: alpha(theme.palette.primary.main, 0.03) }}>
      <Stack alignItems="center" spacing={1.5} mb={4}>
        <Typography variant="h4" fontWeight="bold">
          Words of Wisdom
        </Typography>
        <Typography color="text.secondary" textAlign="center">
          Inspiring messages from the leaders who shaped our journey.
        </Typography>
      </Stack>

      <Card
        sx={{
          mx: "auto",
          p: { xs: 2, md: 4 },
          width: { xs: "95%", md: "80%" },
          maxWidth: 1100,
          borderRadius: 4,
        }}
      >
        <Box sx={{ position: "absolute", top: 16, right: 16, zIndex: 10 }}>
          <Tooltip title={autoPlay ? "Pause" : "Play"}>
            <IconButton onClick={() => setAutoPlay(!autoPlay)}>
              {autoPlay ? <PauseIcon /> : <PlayArrowIcon />}
            </IconButton>
          </Tooltip>
        </Box>

        <Carousel
          autoPlay={autoPlay}
          animation="slide"
          duration={600}
          interval={8000}
          navButtonsAlwaysVisible
          cycleNavigation
        >
          {items.map((item, i) => (
            <CarouselItem key={i} item={item} />
          ))}
        </Carousel>
      </Card>
    </Box>
  );
}
