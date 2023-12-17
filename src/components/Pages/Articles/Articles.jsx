import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Layout from "../../Layout/Layout";
import LatestEdition from "./LatestEditionMagazine";
import OtherMagazines from "./OtherMagazines";
import PageHeader from "../../UI/PageHeader";

export default function Articles() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box
            sx={{ borderBottom: 1, borderColor: "divider" }}
            style={{ paddingLeft: "80px" }}
          >
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Magazine" value="1" />
              <Tab label="Camp Report" value="2" />
              <Tab label="Annual Report" value="3" />
            </TabList>
          </Box>
          <PageHeader title="Articles">
            The National Service Scheme (NSS) is a youth-focused voluntary
            organization in India that aims to develop the personality and
            character of students through community service. NSS events are
            organized by educational institutions, particularly colleges and
            universities, that have NSS units.
          </PageHeader>
          <TabPanel value="1" style={{ paddingLeft: "0px" }}>
            <LatestEdition />
            <br />
            <br />
            <OtherMagazines
              nameGrey="Magazine "
              nameWhite="Archives"
              type="Magazine"
            />
          </TabPanel>
          <TabPanel value="2" style={{ paddingLeft: "0px" }}>
            <OtherMagazines
              nameGrey="Camp "
              nameWhite="Report"
              type="Camp Report"
            />
          </TabPanel>
          <TabPanel value="3" style={{ paddingLeft: "0px" }}>
            <OtherMagazines
              nameGrey="Annual "
              nameWhite="Report"
              type="Annual Report"
            />
          </TabPanel>
        </TabContext>
      </Box>
    </Layout>
  );
}
