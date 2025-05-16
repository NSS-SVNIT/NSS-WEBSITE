import { Box, Container, Typography } from "@mui/material";
import Layout from "../../Layout/Layout";
import PageHeader from "../../UI/PageHeader";
import VolunteerForm from "./VolunteerForm";

const VolunteerPage = () => {
	return (
		<Layout>
			<Box sx={{ py: 4 }}>
				<PageHeader
					title="Join Our Team"
					subtitle="Register as an NSS Volunteer"
				/>
				<Container maxWidth="md" sx={{ mt: 4 }}>
					<Typography variant="body1" align="center" sx={{ mb: 4 }}>
						Fill out the form below to register as an NSS volunteer.
						Your information will be reviewed and added to our team
						page upon approval.
					</Typography>
					<VolunteerForm />
				</Container>
			</Box>
		</Layout>
	);
};

export default VolunteerPage;
