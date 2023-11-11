import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Layout from "../Layout/Layout";
import GalleryView from "./Home/GalleryView";
import { Divider, Stack } from "@mui/material";
import LightGalleryView from "./LightGalleryView";
import PageHeader from "../UI/PageHeader";
import { useEffect } from "react";
import { getDocs, collection, doc } from "@firebase/firestore";
import { firestore } from "../../firebase";
import { useState } from "react";

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
        <Box sx={{ p: 3 }}>
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

export default function Gallery() {
  const [value, setValue] = React.useState(0);
  const categories = [];

  for (let i = 0; i < 10; i++) {
    categories.push("EVENT " + (i + 1));
  }

  const [foldersList, setFoldersList] = useState([]);

  useEffect(() => {
    fetchFolders();
  }, []);

  const fetchFolders = async () => {
    const querySnapshot = await getDocs(collection(firestore, "images"));
    const newData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setFoldersList(newData);
    console.log(newData);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Layout>
      <PageHeader title="Gallery">
        Welcome to our stunning photo gallery! Each photograph has been
        carefully curated to that has captured some unique emotions, inspire
        wanderlust, and celebrate the joy of community service.
      </PageHeader>
      <Stack
        direction="row"
        sx={{
          flexGrow: 1,
          pl: 8,
          display: "flex",
          height: "100%",
          // alignItems: "center",
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          centered
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{
            borderRight: 0,
            minWidth: "150px",
            // borderColor: "divider",
            fontFamily: "DM Sans",
          }}
        >
          {foldersList.map((items, i) => {
            return (
              <Tab
                key={i}
                sx={{ fontFamily: "DM Sans" }}
                label={items.name}
                {...a11yProps(i)}
              />
            );
          })}
        </Tabs>

        {foldersList.map((folder, i) => {
          return (
            <TabPanel value={value} key={i} index={i}>
              <LightGalleryView images={folder.image_links} />
            </TabPanel>
          );
        })}

        {/* <TabPanel value={value} index={0}>
          <Stack direction={"row"}>
            <GalleryView />
            <GalleryView />
          </Stack>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <LightGalleryView />
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
        <TabPanel value={value} index={3}>
          Item Four
        </TabPanel>
        <TabPanel value={value} index={4}>
          Item Five
        </TabPanel>
        <TabPanel value={value} index={5}>
          Item Six
        </TabPanel>
        <TabPanel value={value} index={6}>
          Item Seven
        </TabPanel> */}
      </Stack>
    </Layout>
  );
}
