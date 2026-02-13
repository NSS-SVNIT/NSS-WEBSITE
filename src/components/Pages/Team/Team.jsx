import React, { useEffect, useState, useMemo } from "react";
import { Box, Typography, Grid, Fade, Skeleton, Button, Container, Card, CardMedia, CardContent, Link, Slide, IconButton, Tooltip, Divider } from "@mui/material";
import { collection, getDocs, query, where } from "firebase/firestore";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { LinkedIn, GitHub, Email } from '@mui/icons-material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link as RouterLink } from 'react-router-dom';

import { firestore as db } from "../../../firebase";
import * as TeamData from "./TeamData";

// --- FIX: The placeholder Layout has been removed. ---
// --- We now import your actual Layout component. ---
// --- IMPORTANT: Make sure this path is correct for your project structure ---
import Layout from "../../Layout/Layout"; 

// A placeholder for your static data file if needed for fallback
const StaticData = {
  Sir: TeamData.Sir || [],
  Founder: TeamData.Founder || [],
  CoFounder: TeamData.CoFounder || [],
  ProgramCoordinators: TeamData.ProgramCoordinators || [],
  Team2019: TeamData.Team2019 || [],
  Team2020: TeamData.Team2020 || [],
  Team2021: TeamData.Team2021 || [],
  Team2022: TeamData.Team2022 || [],
  Team2023: TeamData.Team2023 || [],  // 👈 THIS makes Batch 2023 appear
};


// =====================================================================================
// --- SECTION 1: CORE UI COMPONENTS ---
// =====================================================================================

// --- Component: TeamCard --- 
const TeamCard = React.memo(({ name, position, linkedin, github, gmail, firebase }) => {
	const iconStyle = {
		fontSize: '24px',
		transition: 'transform 0.2s ease-in-out',
		'&:hover': { transform: 'scale(1.25)' },
	};
	return (
		<Card sx={{
			display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '250px',
			borderRadius: '20px', overflow: 'hidden', transition: 'transform 0.4s ease, box-shadow 0.4s ease',
			boxShadow: '0 8px 16px rgba(0,0,0,0.08)',
			'&:hover': {
				transform: 'translateY(-10px)', boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
				'.card-media': { transform: 'scale(1.1)' },
				'.social-icons': { transform: 'translateY(0)', opacity: 1, height: 'auto', marginTop: '16px' },
			},
		}}>
			<Box sx={{ width: '100%', aspectRatio: '4 / 5', overflow: 'hidden', position: 'relative' }}>
				<CardMedia className="card-media" component="img" loading="lazy" image={firebase} alt={name}
					sx={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', transform: 'scale(1)', transition: 'transform 0.5s ease-in-out' }}/>
				<Box sx={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to top, rgba(0, 0, 0, 0.6) 0%, transparent 50%)', pointerEvents: 'none' }}/>
			</Box>
			<CardContent sx={{ textAlign: 'center', p: 2.5, backgroundColor: 'background.paper' }}>
				<Typography variant="h6" sx={{ fontWeight: '600', lineHeight: 1.2 }}>{name}</Typography>
				<Typography variant="body2" color="text.secondary">{position}</Typography>
				<Box className="social-icons" sx={{ display: 'flex', justifyContent: 'center', gap: 2.5, opacity: 0, height: 0, transform: 'translateY(10px)', transition: 'all 0.4s ease' }}>
					{linkedin && <Link href={linkedin} target="_blank" color="inherit"><LinkedIn sx={{ ...iconStyle, '&:hover': { ...iconStyle['&:hover'], color: '#0077B5' } }} /></Link>}
					{github && <Link href={github} target="_blank" color="inherit"><GitHub sx={{ ...iconStyle, '&:hover': { ...iconStyle['&:hover'], color: '#333' } }} /></Link>}
					{gmail && <Link href={`mailto:${gmail}`} color="inherit"><Email sx={{ ...iconStyle, '&:hover': { ...iconStyle['&:hover'], color: '#EA4335' } }} /></Link>}
				</Box>
			</CardContent>
		</Card>
	);
});

// --- Component: HeadingSection ---
const HeadingSection = React.memo(() => (
	<Box sx={{ position: 'relative', overflow: 'hidden', py: { xs: 6, md: 10 } }}>
		<Box sx={{ position: 'absolute', top: '50%', left: '25%', width: { xs: 300, md: 700 }, height: { xs: 300, md: 700 }, background: 'radial-gradient(circle, rgba(0, 180, 216, 0.1) 0%, rgba(0, 180, 216, 0) 70%)', transform: 'translate(-50%, -50%)', zIndex: -1, filter: 'blur(80px)' }}/>
		<Grid container spacing={{ xs: 2, md: 4 }} alignItems="center" justifyContent="center">
			<Grid item xs={12} md={6} sx={{ order: { xs: 2, md: 1 }, textAlign: { xs: 'center', md: 'left' } }}>
				<Box sx={{ px: { xs: 2, md: 0 }, pl: { md: 8 } }}>
					<Slide direction="right" in timeout={500}><Typography variant="h2" sx={{ fontSize: { xs: "2.5rem", sm: "3rem", md: "4rem" }, fontWeight: 300, color: 'text.secondary' }}>Meet Our</Typography></Slide>
					<Slide direction="right" in timeout={700}><Typography variant="h1" sx={{ fontSize: { xs: "5rem", sm: "7rem", md: "9rem" }, fontWeight: 700, lineHeight: 1, background: 'linear-gradient(45deg, #0077B6 30%, #00B4D8 90%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', mb: 3 }}>Team</Typography></Slide>
					<Fade in timeout={1200}><Typography variant="body1" sx={{ textAlign: "justify", fontFamily: "DM Sans, sans-serif", fontSize: { xs: '1rem', md: '1.125rem' }, lineHeight: 1.7, maxWidth: '500px', mx: { xs: 'auto', md: 0 } }}>Embark on a transformative journey with the extraordinary team at NSS SVNIT. Dedicated to making a delta change every day, we combine passion, expertise, and unwavering commitment to create a better tomorrow, one impactful step at a time.</Typography></Fade>
				</Box>
			</Grid>
			<Grid item xs={20} sm={18} md={5} sx={{ order: { xs: 1, md: 2 } }}>
				<Slide direction="left" in timeout={1000}><div><Box component="img" src="https://res.cloudinary.com/dh0zqs0nw/image/upload/v1769454758/developers/team.jpg" alt="NSS Team" sx={{ width: '100%', height: 'auto', borderRadius: '16px', objectFit: 'cover', maxHeight: { xs: 350, md: 550 }, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}/></div></Slide>
			</Grid>
		</Grid>
	</Box>
));

// =====================================================================================
// --- SECTION 2: PAGE-SPECIFIC LAYOUT COMPONENTS ---
// =====================================================================================

// --- Component: LeadershipSection ---
const LeadershipSection = React.memo(({ title, members = [] }) => {
	if (!members.length) return null;
	const FacultyAdvisorLayout = ({ member }) => (
		<Box sx={{ position: 'relative', py: { xs: 6, md: 10 }, overflow: 'hidden' }}>
			<Box sx={{ position: 'absolute', top: '50%', left: '10%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(0, 180, 216, 0.08) 0%, rgba(0, 180, 216, 0) 70%)', transform: 'translate(-50%, -50%)', zIndex: -1, filter: 'blur(80px)' }} />
			<Container maxWidth="lg">
				<Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
					<Grid item xs={12} md={6}>
						<Slide direction="right" in timeout={800}><Box><Typography variant="h6" color="primary.main" sx={{ fontWeight: 'bold', mb: 1 }}>Faculty Advisor</Typography><Typography variant="h2" sx={{ fontWeight: 700, mb: 2 }}>{member.name}</Typography><Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>Guiding our efforts with wisdom and experience, our Faculty Advisor is the cornerstone of our organization's success and integrity. Their mentorship inspires us to reach new heights and make a meaningful impact.</Typography></Box></Slide>
					</Grid>
					<Grid item xs={12} md={6}>
						<Slide direction="left" in timeout={800}><Box sx={{ p: 1, bgcolor: 'rgba(0,0,0,0.04)', borderRadius: '30px', height: { xs: 400, sm: 500, md: 600 }, width: '100%' }}><Box component="img" src={member.firebase} alt={member.name} sx={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '24px', boxShadow: '0 20px 40px -10px rgba(0, 119, 182, 0.3)' }}/></Box></Slide>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
	const DefaultLayout = ({ title, members }) => (
		<Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
			<Box sx={{ textAlign: 'center', mb: 5 }}><Typography variant="h3" sx={{ fontWeight: 600 }}>{title}</Typography><Divider sx={{ width: '80px', mx: 'auto', mt: 2, height: '2px' }} /></Box>
			<Grid container spacing={4} justifyContent="center">{members.map((member, index) => (<Fade in key={member.id || member.name} timeout={500 + index * 150}><Grid item xs={12} sm={6} md={4} lg={3} display="flex" justifyContent="center"><TeamCard {...member} /></Grid></Fade>))}</Grid>
		</Container>
	);
	if (title === "Faculty Advisor") return <FacultyAdvisorLayout member={members[0]} />;
	return <DefaultLayout title={title} members={members} />;
});

// --- Component: TeamBatch (Carousel) ---
const TeamBatch = React.memo(({ year, TeamList = [] }) => {
	if (TeamList.length === 0) return null;
	return (
		<Fade in timeout={1000}>
			<Box sx={{ mb: { xs: 6, md: 8 } }}>
				<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
					<Typography variant="h4" sx={{ fontWeight: 600 }}>Batch of {year}</Typography>
					<Button component={RouterLink} to={`/team/${year}`} variant="text" endIcon={<ArrowForwardIcon />} sx={{ color: 'text.secondary', '&:hover': { backgroundColor: 'action.selected' } }}>View All</Button>
				</Box>
				<Box sx={{
					display: 'flex', overflowX: 'auto', scrollSnapType: 'x mandatory',
					gap: { xs: 2, sm: 3 },
					py: 2,
					'&::-webkit-scrollbar': { height: '8px' }, '&::-webkit-scrollbar-track': { backgroundColor: 'transparent' },
					'&::-webkit-scrollbar-thumb': { backgroundColor: 'rgba(0, 0, 0, 0.2)', borderRadius: '4px' },
					'&::-webkit-scrollbar-thumb:hover': { backgroundColor: 'rgba(0, 0, 0, 0.4)' },
				}}>
					{TeamList.map((member) => (
						<Box key={member.id || member.name} sx={{
							scrollSnapAlign: 'start', flex: '0 0 auto',
							width: { xs: '240px', sm: '220px' },
						}}>
							<TeamCard {...member} />
						</Box>
					))}
				</Box>
			</Box>
		</Fade>
	);
});


// =====================================================================================
// --- SECTION 3: MAIN PAGE COMPONENT (Data Fetching, Layout, and State) ---
// =====================================================================================

const Team = React.memo(() => {
	const [advisor, setAdvisor] = useState(null);
	const [foundingTeam, setFoundingTeam] = useState([]);
	const [coordinators, setCoordinators] = useState([]);
	const [batchData, setBatchData] = useState({});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchAndProcessData = async () => {
		try {
			setLoading(true); setError(null);
			const volunteersQuery = query(collection(db, "volunteers"), where("approved", "==", true));
			const querySnapshot = await getDocs(volunteersQuery);
			const firestoreData = {};
			querySnapshot.forEach((doc) => {
				const volunteer = { ...doc.data(), id: doc.id };
				const key = volunteer.category || `Team${volunteer.batch}`;
				if (!firestoreData[key]) firestoreData[key] = [];
				firestoreData[key].push(volunteer);
			});
			const finalData = { ...StaticData, ...firestoreData };
			const combinedFounders = [...(finalData.Founder || []), ...(finalData.CoFounder || [])];
			setAdvisor(finalData.Sir || []);
			setFoundingTeam(combinedFounders);
			setCoordinators(finalData.ProgramCoordinators || []);
			const finalBatchData = Object.keys(finalData).filter(key => key.startsWith("Team")).reduce((acc, key) => {
				const year = key.replace("Team", "");
				acc[year] = finalData[key];
				return acc;
			}, {});
			setBatchData(finalBatchData);
			console.log(finalBatchData);

		} catch (err) {
			console.error("Error fetching team data:", err);
			setError("Failed to load team data. Please check your connection and try again.");
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => { fetchAndProcessData() }, []);
	const sortedYears = useMemo(() => Object.keys(batchData).sort((a, b) => b - a), [batchData]);

	if (loading) return (
		<Layout>
			<HeadingSection />
			<Container maxWidth="lg" sx={{ py: 6 }}>
				<Grid container spacing={4} alignItems="center" sx={{ mb: 6 }}><Grid item xs={12} md={6}><Skeleton variant="text" width="40%" height={40} /><Skeleton variant="text" width="80%" height={80} /><Skeleton variant="text" /><Skeleton variant="text" /></Grid><Grid item xs={12} md={6}><Skeleton variant="rectangular" sx={{ width: '100%', height: 500, borderRadius: '24px' }} /></Grid></Grid>
				<Grid container spacing={4} justifyContent="center">{[...Array(4)].map((_, i) => (<Grid item key={i} xs={12} sm={6} md={3}><Skeleton variant="rectangular" sx={{ width: '100%', aspectRatio: '4 / 5', borderRadius: '20px' }} /></Grid>))}</Grid>
			</Container>
		</Layout>
	);
	if (error) return (
		<Layout>
			<HeadingSection />
			<Container maxWidth="sm" sx={{ textAlign: "center", py: 8 }}>
				<ErrorOutlineIcon color="error" sx={{ fontSize: '4rem', mb: 2 }} /><Typography variant="h5" gutterBottom>Something went wrong</Typography>
				<Typography color="text.secondary" sx={{ mb: 3 }}>{error}</Typography><Button variant="contained" onClick={fetchAndProcessData}>Retry</Button>
			</Container>
		</Layout>
	);

	return (
		<Layout>
			<HeadingSection />
			<Fade in={!loading} timeout={800}>
				<Box>
					<LeadershipSection title="Faculty Advisor" members={advisor} />
					<LeadershipSection title="Founding Team" members={foundingTeam} />
					<LeadershipSection title="Program Coordinators" members={coordinators} />

					{sortedYears.length > 0 && (
						<Box sx={{
							py: { xs: 6, md: 8 },
							bgcolor: 'background.default',
							backgroundImage: `radial-gradient(circle at top left, rgba(0, 119, 182, 0.04), transparent 40%), radial-gradient(circle at bottom right, rgba(0, 119, 182, 0.04), transparent 40%)`,
						}}>
							<Container maxWidth="lg">
								<Box sx={{ textAlign: 'center', mb: 5 }}>
									<Typography variant="h2" sx={{ fontWeight: 600, mb: 1 }}>Our Legacy</Typography>
									<Typography color="text.secondary">The dedicated teams carrying the torch forward</Typography>
								</Box>
								{sortedYears.map((year) => (<TeamBatch key={year} year={year} TeamList={batchData[year]}/>))}
							</Container>
						</Box>
					)}
				</Box>
			</Fade>
		</Layout>
	);
});

export default Team;