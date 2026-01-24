// src/components/sections/CounterSection.js

import { Box, Button, Stack, Typography } from "@mui/material"; // Import Button
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import { motion } from "framer-motion"; // Import motion for animation

// Import icons and background image...
import BackgroundImage from "../../../assets/44.jpg";

// Import photos for initiatives
import Awareness from './photos/Awareness.jpg';
import Camp from './photos/Camp.jpg';
import Cleanliness from './photos/Cleanliness.jpg';
import Cultural from './photos/Cultural.jpg';



// Data remains the same

// The internal component for the parallax section
const ParallaxContent = () => {
    const [indices, setIndices] = useState([0, 0, 0, 0]);
    
    useEffect(() => {
        const interval = setInterval(() => {
            setIndices(prev => prev.map(i => (i + 1) % 3));
        }, 3000);
        return () => clearInterval(interval);
    }, []);
    return (
        <Stack
            justifyContent="center"
            alignItems="center"
            // --- The main change is here: increase the gap to space out the new button ---
            gap={{ xs: 6, md: 8 }} 
            sx={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.5)), url(${BackgroundImage})`,
                backgroundAttachment: "fixed",
                backgroundPosition: "center",
                backgroundSize: "cover",
                py: { xs: 10, md: 16 }, // Adjusted padding for more space
                color: 'white',
            }}
        >
            {/* The Stack for the counters */}
            

            {/* --- NEW BUTTON ADDED HERE --- */}
            
            <motion.div
                initial={{ opacity:0, y: 20 }}
                whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } }}
                viewport={{ once: true }}
            >
                
                <Button
                    component={Link}
                    to="/events"
                    variant="contained" // Solid, attention-grabbing style
                    size="large"
                    sx={{
                        // Style the button to stand out
                        py: 1.5,
                        px: 4,
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        borderRadius: '50px', // Pill-shaped button
                    }}
                >
                    Explore our Events
                </Button>
            </motion.div>

            <InitiativeSlider />
        </Stack>
    );
};

const initiatives = [
    {
        title: "Awareness Campaign",
        image: Awareness,
    },
    {
        title: "NSS Camp",
        image: Camp,
    },
    {
        title: "Cleanliness Drive",
        image: Cleanliness,
    },
    {
        title: "Cultural Event",
        image: Cultural,
    },
];

function InitiativeSlider() {
    const [active, setActive] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActive((prev) => (prev + 1) % initiatives.length);
        }, 3500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ position: 'relative', width: '100%', maxWidth: '1000px', margin: '0 auto', perspective: '1000px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '500px', position: 'relative' }}>
                {initiatives.map((item, i) => {
                    let style = {
                        position: 'absolute',
                        width: '300px',
                        height: '400px',
                        borderRadius: '15px',
                        overflow: 'hidden',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                        transition: 'all 0.6s ease',
                        cursor: 'pointer',
                    };

                    if (i === active) {
                        style.transform = 'translateX(0) scale(1) rotateY(0deg)';
                        style.zIndex = 3;
                    } else if (i === (active - 1 + initiatives.length) % initiatives.length) {
                        style.transform = 'translateX(-350px) scale(0.8) rotateY(15deg)';
                        style.zIndex = 2;
                        style.opacity = 0.7;
                    } else if (i === (active + 1) % initiatives.length) {
                        style.transform = 'translateX(350px) scale(0.8) rotateY(-15deg)';
                        style.zIndex = 2;
                        style.opacity = 0.7;
                    } else {
                        style.transform = 'translateX(0) scale(0.6) rotateY(0deg)';
                        style.zIndex = 1;
                        style.opacity = 0.3;
                    }

                    return (
                        <div key={i} style={style} onClick={() => setActive(i)}>
                            <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <div style={{
                                position: 'absolute',
                                bottom: '0',
                                left: '0',
                                right: '0',
                                background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                                color: 'white',
                                padding: '20px',
                                fontSize: '18px',
                                fontWeight: 'bold',
                                textAlign: 'center'
                            }}>{item.title}</div>
                        </div>
                    );
                })}
            </div>

            <div style={{ textAlign: 'center', marginTop: '30px' }}>
                {initiatives.map((_, i) => (
                    <span
                        key={i}
                        style={{
                            display: 'inline-block',
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            background: i === active ? '#007bff' : '#ddd',
                            margin: '0 8px',
                            cursor: 'pointer',
                            transition: 'background 0.3s',
                        }}
                        onClick={() => setActive(i)}
                    />
                ))}
            </div>
        </div>
    );
}

// The main component that frames the parallax content
const CounterSection = React.memo(() => {
    // ... (This part remains unchanged)
    return (
        <React.Fragment>
            <Stack 
                alignItems="center"
                sx={{ 
                    bgcolor: 'background.default', 
                    pt: { xs: 6, md: 10 },
                    pb: { xs: 4, md: 6 },
                }} 
            >
                <Typography
                    variant="h2"
                    component="h2"
                    sx={{ fontWeight: 'bold' }} 
                >
                    Recent Events
                </Typography>
            </Stack>
            <ParallaxContent />
        </React.Fragment>
    );
});

export default CounterSection;