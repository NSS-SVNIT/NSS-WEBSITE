import React, { useEffect } from "react";
import Layout from "../Layout/Layout";
import LightGalleryView from "./LightGalleryView";
import PageHeader from "../UI/PageHeader";
import { getDocs, collection } from "@firebase/firestore";
import { firestore } from "../../firebase";
import { useState } from "react";
import {
  Stack,
  Tabs,
  Tab,
  Box,
  Typography,
  useMediaQuery,
} from "@mui/material";

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

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const MemoizedTabPanel = React.memo(TabPanel);

const Gallery = () => {
  const [value, setValue] = React.useState(0);
  const [foldersList, setFoldersList] = useState([]);
  const isMobile = useMediaQuery("(max-width:900px)");

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);

    // Cleanup function to scroll to the top when the component unmounts
    return () => {
      window.scrollTo(0, 0);
    };
  }, []);

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
      <PageHeader>
        Welcome to our stunning photo gallery! Each photograph has been
        carefully curated to that has captured some unique emotions, inspire
        wanderlust, and celebrate the joy of community service.
      </PageHeader>
      <Stack
        direction={isMobile ? "column" : "row"}
        sx={{
          flexGrow: 1,
          pl: 8,
          display: "flex",
          height: "100%",
        }}
      >
        <Tabs
          orientation={isMobile ? "horizontal" : "vertical"}
          variant="scrollable"
          scrollButtons="auto"
          // centered
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{
            borderRight: 0,
            minWidth: "150px",
            fontFamily: "DM Sans",
          }}
        >
          {foldersList.map((items, i) => (
            <Tab
              key={i}
              sx={{ fontFamily: "DM Sans" }}
              label={items.name}
              {...a11yProps(i)}
            />
          ))}
        </Tabs>

        {foldersList.map((folder, i) => (
          <MemoizedTabPanel value={value} key={i} index={i}>
            <LightGalleryView images={folder.image_links} />
          </MemoizedTabPanel>
        ))}
      </Stack>
    </Layout>
  );
};

export default React.memo(Gallery);
