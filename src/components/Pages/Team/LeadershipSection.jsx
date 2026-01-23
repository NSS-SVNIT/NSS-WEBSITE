// LeadershipSection.js

import React from 'react';
import { Box, Typography, Grid, Container, Divider, Fade, Slide } from '@mui/material';
import TeamCard from './TeamCard';

// This is the special "Hero" layout for the Faculty Advisor
const FacultyAdvisorLayout = ({ member }) => (
	<Box sx={{ position: 'relative', py: { xs: 6, md: 10 }, overflow: 'hidden' }}>
		{/* Background decorative blobs */}
		<Box sx={{ position: 'absolute', top: '50%', left: '10%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(0, 180, 216, 0.08) 0%, rgba(0, 180, 216, 0) 70%)', transform: 'translate(-50%, -50%)', zIndex: -1, filter: 'blur(80px)' }} />
		<Box sx={{ position: 'absolute', bottom: 0, right: 0, width: 400, height: 400, background: 'radial-gradient(circle, rgba(0, 119, 182, 0.08) 0%, rgba(0, 119, 182, 0) 70%)', transform: 'translate(50%, 50%)', zIndex: -1, filter: 'blur(80px)' }} />

		<Container maxWidth="lg">
			<Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
				<Grid item xs={12} md={6}>
					<Slide direction="right" in timeout={800}>
						<Box>
							<Typography variant="h6" color="primary.main" sx={{ fontWeight: 'bold', mb: 1 }}>Faculty Advisor</Typography>
							<Typography variant="h2" sx={{ fontWeight: 700, mb: 2 }}>{member.name}</Typography>
							<Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
								{/* You can add a specific description for the advisor here or fetch it from data */}
								Guiding our efforts with wisdom and experience, our Faculty Advisor is the cornerstone of our organization's success and integrity. Their mentorship inspires us to reach new heights and make a meaningful impact.
							</Typography>
						</Box>
					</Slide>
				</Grid>
				<Grid item xs={12} md={6}>
					<Slide direction="left" in timeout={800}>
						<Box sx={{
							p: 1,
							bgcolor: 'rgba(0,0,0,0.04)',
							borderRadius: '30px',
							height: { xs: 400, sm: 500, md: 600 },
							width: '100%',
						}}>
							<Box
								component="img"
								src={member.firebase}
								alt={member.name}
								sx={{
									width: '100%',
									height: '100%',
									objectFit: 'cover',
									borderRadius: '24px',
									boxShadow: '0 20px 40px -10px rgba(0, 119, 182, 0.3)',
								}}
							/>
						</Box>
					</Slide>
				</Grid>
			</Grid>
		</Container>
	</Box>
);

// This is the standard grid layout for other leadership roles
const DefaultLeadershipLayout = ({ title, members }) => (
	<Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
		<Box sx={{ textAlign: 'center', mb: 5 }}>
			<Typography variant="h3" sx={{ fontWeight: 600 }}>{title}</Typography>
			<Divider sx={{ width: '80px', mx: 'auto', mt: 2, height: '2px' }} />
		</Box>
		<Grid container spacing={4} justifyContent="center">
			{members.map((member, index) => (
				<Fade in key={member.id || member.name} timeout={500 + index * 150}>
					<Grid item xs={12} sm={6} md={4} lg={3} display="flex" justifyContent="center">
						<TeamCard {...member} />
					</Grid>
				</Fade>
			))}
		</Grid>
	</Container>
);

// This is the main component that decides which layout to render
const LeadershipSection = ({ title, members = [] }) => {
	if (!members.length) return null;

	// Use the special layout for the Faculty Advisor
	if (title === "Faculty Advisor" ) {
		return <FacultyAdvisorLayout member={members[0]} />;
	}

	// Use the default grid layout for all other roles
	return <DefaultLeadershipLayout title={title} members={members} />;
};

export default LeadershipSection;