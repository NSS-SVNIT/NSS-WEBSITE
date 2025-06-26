// Articles.jsx

import React, { useState, useEffect } from "react";
import { Box, Tab, Container, Fade } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

// Import icons for the tabs
import AutoStoriesIcon from '@mui/icons-material/AutoStories'; // For Magazine
import CampaignIcon from '@mui/icons-material/Campaign';     // For Camp Reports
import SummarizeIcon from '@mui/icons-material/Summarize';   // For Annual Reports

import Layout from "../../Layout/Layout";
import PageHeader from "../../UI/PageHeader";
import ArticleGrid from "./ArticleGrid";

const Articles = React.memo(() => {
	const [value, setValue] = useState("1");

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<Layout>
			<PageHeader>
				The National Service Scheme (NSS) is a youth-focused voluntary
				organization in India that aims to develop the personality and
				character of students through community service.
			</PageHeader>
			<Container maxWidth="lg" sx={{ my: 4 }}>
				<TabContext value={value}>
					<Box sx={{ display: 'flex', justifyContent: 'center', borderBottom: 1, borderColor: "divider", mb: 4 }}>
						<TabList
							onChange={handleChange}
							variant="scrollable"
							scrollButtons
							allowScrollButtonsMobile
							aria-label="Article categories"
							sx={{
								'& .MuiTabs-indicator': {
									height: 4,
									borderRadius: '2px',
								},
								'& .MuiTab-root': {
									textTransform: 'none',
									fontSize: '1rem',
									fontWeight: 500,
									minHeight: 60,
									'&.Mui-selected': {
										color: 'primary.main',
									}
								}
							}}
						>
							<Tab icon={<AutoStoriesIcon />} iconPosition="start" label="Magazine" value="1" />
							<Tab icon={<CampaignIcon />} iconPosition="start" label="Camp Reports" value="2" />
							<Tab icon={<SummarizeIcon />} iconPosition="start" label="Annual Reports" value="3" />
						</TabList>
					</Box>

					{/* Each TabPanel now fades in its content */}
					<TabPanel value="1" sx={{ p: 0 }}>
						<Fade in={value === '1'} timeout={500}>
							<div>
								<ArticleGrid
									title={{ grey: "LATEST ", white: "EDITION" }}
									firestoreFilter={{ field: "Type", operator: "==", value: "Latest edition" }}
								/>
								<ArticleGrid
									title={{ grey: "MAGAZINE ", white: "ARCHIVES" }}
									firestoreFilter={{ field: "Type", operator: "==", value: "Magazine" }}
								/>
							</div>
						</Fade>
					</TabPanel>
					<TabPanel value="2" sx={{ p: 0 }}>
						<Fade in={value === '2'} timeout={500}>
							<div>
								<ArticleGrid
									title={{ grey: "CAMP ", white: "REPORTS" }}
									firestoreFilter={{ field: "Type", operator: "==", value: "Camp Report" }}
								/>
							</div>
						</Fade>
					</TabPanel>
					<TabPanel value="3" sx={{ p: 0 }}>
						<Fade in={value === '3'} timeout={500}>
							<div>
								<ArticleGrid
									title={{ grey: "ANNUAL ", white: "REPORTS" }}
									firestoreFilter={{ field: "Type", operator: "==", value: "Annual Report" }}
								/>
							</div>
						</Fade>
					</TabPanel>
				</TabContext>
			</Container>
		</Layout>
	);
});

export default Articles;