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
          {names.map((name, index) => (
            <Chip
              key={index}
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
