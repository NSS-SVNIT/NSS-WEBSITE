import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../../utils/auth";
import Layout from "../../Layout/Layout";
import PageHeader from "../../UI/PageHeader";
import AdminApproval from "./AdminApproval";

const AdminPage = () => {
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			await logoutUser();
			navigate("/admin-login");
		} catch (error) {
			console.error("Logout error:", error);
		}
	};

	return (
		<Layout>
			<Box sx={{ py: 4 }}>
				<PageHeader
					title="Admin Dashboard"
					subtitle="Manage Team Volunteers"
				/>
				<Container maxWidth="lg" sx={{ mt: 4 }}>
					<Box
						sx={{
							display: "flex",
							justifyContent: "flex-end",
							mb: 2,
						}}>
						<Button
							variant="contained"
							color="primary"
							onClick={handleLogout}>
							Logout
						</Button>
					</Box>
					<Typography variant="body1" align="center" sx={{ mb: 4 }}>
						Review and approve new volunteer submissions. Only
						approved volunteers will be displayed on the team page.
					</Typography>
					<AdminApproval />
				</Container>
			</Box>
		</Layout>
	);
};

export default AdminPage;
