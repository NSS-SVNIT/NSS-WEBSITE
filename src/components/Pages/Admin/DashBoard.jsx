import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Avatar, Stack } from "@mui/material";
import NewPost from "../NewPost";
import Profile from "./Profile";
import NewEvent from "./NewEvent";
import ImageUpload from "./ImageUpload";
import Updates from "./Updates";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, width: "calc(100vw - 150px)" }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function DashBoard() {
  const [value, setValue] = React.useState(0);

  const profilePic = localStorage.getItem("profilePic");
  const profileName = localStorage.getItem("name");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        display: "flex",
        height: "100vh",
      }}
    >
      <Stack alignItems={"center"} gap={2} sx={{ pt: 2 }}>
        <Stack alignItems={"center"}>
          <Avatar
            src={profilePic}
            sx={{ height: "80px", width: "80px" }}
          ></Avatar>
          <Box
            sx={{
              fontFamily: "Roboto",
              fontSize: "1.1rem",
              py: 2,
              textAlign: "CENTER",
            }}
          >
            {profileName}
          </Box>
        </Stack>
        <Tabs
          orientation="vertical"
          // variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 0, width: "150px", borderColor: "black" }}
        >
          <Tab label="PROFILE" {...a11yProps(0)} />
          <Tab label="EVENTS" {...a11yProps(3)} />
          {/* <Tab label="BLOG" {...a11yProps(0)} /> */}
          <Tab label="IMAGES" {...a11yProps(1)} />
          <Tab label="UPDATES" {...a11yProps(2)} />
          <Tab label="ARTICLES" {...a11yProps(3)} />
        </Tabs>
      </Stack>
      <TabPanel value={value} index={0}>
        <Profile />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <NewEvent />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ImageUpload />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Updates />
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item Five
      </TabPanel>
      <TabPanel value={value} index={5}>
        Item Six
      </TabPanel>
      <TabPanel value={value} index={6}>
        Item Seven
      </TabPanel>
    </Box>
  );
}
