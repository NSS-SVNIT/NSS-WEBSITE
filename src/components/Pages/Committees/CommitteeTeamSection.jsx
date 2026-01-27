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

const CommitteeTeamSection = React.memo(({ committeeKey }) => {

  // 🔹 ALL COMMITTEE DATA INSIDE COMPONENT
  const committeeData = {
    Cultural: {
      title: "Cultural Committee",
      batch2023: [
        "Priyanshu",
  "Pradnya Pagare",
  "Sanidhya Mandliya",
  "Aarti Narwade",
  "Hinal Parikh",
  "Keya Kuniya",
  "Raghvendra Singh",
  "Pawar Sai Teja",
  "Anand Sonage",
  "Aniket Bhandari",
  "Dhairya",
  "Kanishk",
  "Parv",
  "Priyanshi",
      ],
      batch2024: [
        "Abhishek Kumar",
        "Shreya Patel",
        "Keshav Raj",
        "Abhishek Bhagat",
        "Priyanshi Purohit",
        "Greeshma Kasina",
        "Vedansh Bhargav",
        "Khushi Sariya",
        "Ayush Jain",
        "Harshitha",
        "Kalpit Nagar"
      ],
    },

    Social: {
      title: "Social Committee",
      batch2023: ["Prasanthi Kannuru",
  "Kajal",
  "Niyal Patidar",
  "Rashmi",
  "Sonali Rathore",
  "Rohan Zaveri",
  "Aditi Bhushan",
  "Palak",
  "Priti",
  "B Varshini",
  "Shivansh",
  "Shubham Kumar",
  "Sri Harshita",
        
      ],
      batch2024: [
        "AAviral Singh",
        "Sapna",
        "Vidhi Patel",
        "Abhinav Singh",
        "Ayush Sharma",
        "Vedant Chanawala",
        "Rajeev Kumar",
        "Anjli Sharma",
        "Dhyani Patel",
        "Uppunnutala Saidulu",
        "Manav Sahu"
      ],
    },

    Finance: {
      title: "Finance Committee",
      batch2023: ["Prathmesh Kode",
  "Koustubh Choudhary",
  "Harsh Indorwala",
  "Ashish Maurya",
  "Manya Pahwa",
  "Rohan Raj Singh",
  "Vansh Patel",
        
      ],
      batch2024: [
        "Priyanshi Gupta",
        "Diya Baldania",
        "Yash Variya",
        "Thanuja Annumula",
        "Dipsu Patel",
        "Garima Nilesh Lad",
        "Puppala Venkata Sai",
        "Mahanish Punj",
        "Pratik Lalwani",
        "Kaushik Vaniya",
        "Loka Sai Sriyuth Reddy"
      ],
    },

    Documentation: {
      title: "Documentation Committee",
      batch2023: ["Hare Krishna Tiwari",
  "Budda Pallavi",
  "Ayush Manth",
  "Harsh Sarwate",
  "Renuka Choudhary",
  "Swati Srivas",
  "Nikhil",
        
      ],
      batch2024: [
        "Nikhil Upadhyay",
        "Hinesh Kumar",
        "Ankit Mishra",
        "Avanthika Andoju",
        "Navya Kumari",
        "Venkata Sai",
        "Sachin",
        "Aryan Kulkarni",
        "Rohit Chaudhary",
        "Arun Rajput",
        "Khushi Patel",
        "Siddhant Sharma",
        "Bandari Srujan",
        "Rohit Saini",
        "Manasvi Vyas",
      ],
    },

    Sports: {
      title: "Sports Committee",
      batch2023: ["Aryan",
  "Ayush Singh",
  "Ashish Shukla",
  "Aditya",
  "Abhinav Upadhyay",
  "Aman Kapoor",
  "Anand Choudhary",
  "Anisha Patel",
  "Ankush Yadav",
  "Arpita Gupta",
  "Aryan Zala",
  "Sudipta Bala",
  "Bhavesh Pandey",
  "Bhavya Purohit",
  "Bhuvana Bolla",
  "Herry Patel",
  "Manya Sinha",
  "Mohit Singh",
  "Ruchita Parmar",
  "Tanish Makawana",
  "Vidhi Agarwal",
  "Vijay Srivas",
  "Utkarsh Saxena",
        
      ],
      batch2024: [
        "Aryan",
        "Pratham Saini",
        "Prachi Choudhary",
        "Rishita Jain",
        "Sumit Rathore",
        "Priyanshu Varun",
        "Krishna Keerthish",
        "Yug Dipak Shankhala",
        "Somil Vyas",
        "Dhirendra Singh",
        "Prajwal Pandey",
        "Yogesh Dhakad",
        "Ayush Nitin",
        "Kshitij Pandey",
        "Sachin",
        "Arti jangid",
        "Sri Akshaya Thurpati",
        "Kamuni Akshaya",
      ],
    },

    technical: {
      title: "Technical Committee",
      batch2023: [
        "Somu Yadav",
        "Kumari Samyuktha",
        "Abhishek Kumar",
        "Astha Mishra",
        "Gupta Dharmendra",
        "Dhrumil Panchal",
        "Harsh Bhadani",
        "Gadasanda Niharika",
        "Mahaveer Regar",
      ],
      batch2024: [
        "Mohit Kumar Soni",
        "Kislay Gupta",
        "Akash Panjiyar",
        "Vedant Thakkar",
        "Jignasa Palakala",
        "Vasishali Dak",
        "Bolisetty Samanvitha",
        "Vyomini Joshi",
        "Drashti Singh",
        "Rimmalapudi Jaswanth Vinay",
        "M. Devi Sree Prasad",
        "Aryan Divyang Shah"
      ],
    },

    Creative: {
      title: "Creative Committee",
      batch2023: ["Narendra",
  "Mansha Maulee",
  "Moksh",
  "Ritik Sharma",
  "Maheswar",
  "Ridhi Soni",
  "Abhinav Singh",
  "Namrata Patil",
  "Abhishek",
       
      ],
      batch2024: [
        "Dipendra singh",
        "Anwesha Chowdhery",
        "Navneet Yadav",
        "Ajay Kumar Meena",
        "Disha Patil",
        "Uttkarsh Kumar Rao",
        "Akshita Jain",
        "Lokesh Chandra",
        "Krish Patel",
        "Nidhi Ravindran",
        "Megha Jain",
        "Palthya Shashank",
        "M Harsha Vardhan Reddy"
      ],
    },
  };

  const committee = committeeData[committeeKey];

  if (!committee) return null;

  const renderBatch = (title, names) => (
  <Box
    sx={{
      position: "relative",
      height: "100%",
      borderRadius: 4,
      overflow: "hidden",
      background: "#fff",
      border: "1px solid rgba(90,42,122,0.15)",
      boxShadow: "0 10px 30px rgba(90,42,122,0.12)",
    }}
  >
    {/* Accent bar */}
    <Box
      sx={{
        position: "absolute",
        left: 0,
        top: 0,
        height: "100%",
        width: 6,
        background: "linear-gradient(180deg,#5A2A7A,#8E44AD)",
      }}
    />

    <Box sx={{ p: 3, pl: 4 }}>
      {/* Batch Header */}
      <Typography
        variant="h6"
        sx={{
          fontWeight: 900,
          color: "#5A2A7A",
          letterSpacing: 1,
          mb: 1,
        }}
      >
        {title.toUpperCase()}
      </Typography>

      <Divider sx={{ mb: 2 }} />

      {/* Member Grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 1.2,
          maxHeight: 250,
          overflowY: "auto",
          pr: 1,
          "&::-webkit-scrollbar": { width: 6 },
          "&::-webkit-scrollbar-thumb": {
            background: "rgba(90,42,122,0.3)",
            borderRadius: 6,
          },
        }}
      >
        {names.map((name, index) => (
          <Box
            key={index}
            sx={{
              px: 1.5,
              py: 0.7,
              borderRadius: 2,
              fontSize: 14,
              fontWeight: 500,
              background: "rgba(90,42,122,0.06)",
              border: "1px solid rgba(90,42,122,0.2)",
              transition: "all .2s ease",
              "&:hover": {
                background: "rgba(90,42,122,0.15)",
                transform: "translateY(-2px)",
              },
            }}
          >
            {name}
          </Box>
        ))}
      </Box>
    </Box>
  </Box>
);


  return (
    <Box sx={{ mt: { xs: 5, md: 6 } }}>
      <Box sx={{ textAlign: "center", mb: { xs: 2.5, md: 3 } }}>
       <Typography
  variant="h3"
  sx={{
    fontWeight: 900,
    textAlign: "center",
    mb: 4,
    color: "#5A2A7A",
    letterSpacing: "1.5px",
    textTransform: "uppercase",
  }}
>
  {committee.title}
</Typography>
      </Box>

      <Grid container spacing={{ xs: 2, md: 3 }}>
        <Grid item xs={12} md={6}>
          {renderBatch("Batch 2023", committee.batch2023)}
        </Grid>
        <Grid item xs={12} md={6}>
          {renderBatch("Batch 2024", committee.batch2024)}
        </Grid>
      </Grid>
    </Box>
  );
});

export default CommitteeTeamSection;
