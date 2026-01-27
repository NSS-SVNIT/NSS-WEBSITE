import React from "react";
import Layout from "../Layout/Layout";
import DeveloperCard from "./DeveloperCard";
import { Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import "./underline.css";

function Developers() {
	const developers = [
		{
			id: 1,
			name: "Aditi Tapariya",
			github: "https://github.com/adititapariya",
			mail: "mailto:tapariyaaditi23@gmail.com",
			linkedin: "https://www.linkedin.com/in/aditi-tapariya/",
			imageLink:
				"https://res.cloudinary.com/dh0zqs0nw/image/upload/v1769454735/developers/aditi.jpg",
		},
		{
			id: 2,
			name: "Harshit Pathak",
			github: "https://github.com/Story27",
			mail: "mailto:pathakharshit281@gmail.com",
			linkedin: "https://www.linkedin.com/in/harshit-pathak-4ba6aa22a/",
			imageLink:
				"https://res.cloudinary.com/dh0zqs0nw/image/upload/v1769454737/developers/harshit.jpg",
		},
		{
			id: 3,
			name: "Jinhal Maheshwari",
			github: "https://github.com/Jinhal01",
			mail: "mailto:jinhalmaheshwari1256@gmail.com",
			linkedin: "linkedin.com/in/jinhal-maheshwari-71a217212/",
			imageLink:
				"https://res.cloudinary.com/dh0zqs0nw/image/upload/v1769454739/developers/jinhal.jpg",
		},
		{
			id: 4,
			name: "Param Shah",
			github: "https://github.com/paramshah1903",
			mail: "mailto:shahparam1903@gmail.com",
			linkedin: "https://www.linkedin.com/in/param-shah-716322227/",
			imageLink:
				"https://res.cloudinary.com/dh0zqs0nw/image/upload/v1769454741/developers/param.jpg",
		},
		{
			id: 5,
			name: "Pragnesh Barik",
			github: "https://github.com/pragneshbarik",
			mail: "mailto:barikpragnesh@gmail.com",
			linkedin: "https://www.linkedin.com/in/pragnesh-barik",
			imageLink:
				"https://res.cloudinary.com/dh0zqs0nw/image/upload/v1769454743/developers/pragnesh.jpg",
		},
		{
			id: 6,
			name: "Shreeya Dave",
			github: "https://github.com/shreeyadave",
			mail: "mailto:shreeyadave776@gmail.com",
			linkedin: "https://www.linkedin.com/in/shreeya-dave-444166232/",
			imageLink:
				"https://res.cloudinary.com/dh0zqs0nw/image/upload/v1769454745/developers/shreeya.jpg",
		},
		{
			id: 7,
			name: "Samarth Chaplot",
			github: "https://github.com/sam-arth07",
			mail: "mailto:samarthchaplot7@gmail.com",
			linkedin: "https://www.linkedin.com/in/samarth-chaplot-130b88256/",
			imageLink:
				"https://res.cloudinary.com/dh0zqs0nw/image/upload/v1769454748/developers/SAMARTH_CHAPLOT.jpg",
		},
	];

	const designers = [
		{
			id: 1,
			name: "Keval Kanpariya",
			github: "https://github.com/keval-kanp-1011",
			mail: "mailto:kevalkanpariya5051@gmail.com",
			linkedin: "http://linkedin.com/in/kevalkanpariya",
			imageLink:
				"https://res.cloudinary.com/dh0zqs0nw/image/upload/v1769454752/developers/keval.jpg",
		},
		{
			id: 2,
			name: "Namrata Rathod",
			github: "https://github.com/Namarata28",
			mail: "mailto:namrata.rathod028@gmail.com",
			linkedin: "www.linkedin.com/in/nr28",
			imageLink:
				"https://res.cloudinary.com/dh0zqs0nw/image/upload/v1769454756/developers/namrata.jpg",
		},
	];

	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	const row1 = developers.slice(0, 4);
	const row2 = developers.slice(4, developers.length);
	const row1Designers = designers.slice(0, 2);

	return (
		<div>
			<Layout>
				<div className="heading">
					<Typography variant={isMobile ? "h2" : "h1"} align="center">
						Developers
					</Typography>
				</div>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						gap: "10px", 
						margin:"30px",
					}}>
					{isMobile ? (
						// Mobile view: one card per row
						developers.map((developer) => (
							<div
								key={developer.id}
								style={{
									display: "flex",
									flexDirection: "column",
									alignItems: "center", 
									margin: "10px",
									width: "100%",
								}}>
								<DeveloperCard
									name={developer.name}
									github={developer.github}
									mail={developer.mail}
									linkedin={developer.linkedin}
									imageLink={developer.imageLink}
								/>
							</div>
						))
					) : (
						// Original layout for larger screens
						<>
							<div
								style={{
									display: "flex",
									gap: "20px", 
									margin: "20px",
									position: "relative",
								}}>
								{row1.map((developer) => (
									<DeveloperCard
										key={developer.id}
										name={developer.name}
										github={developer.github}
										mail={developer.mail}
										linkedin={developer.linkedin}
										imageLink={developer.imageLink}
									/>
								))}
							</div>
							<div
								style={{
									display: "flex",
									gap: "20px", 
									margin: "20px",
									position: "relative",
								}}>
								{row2.map((developer) => (
									<DeveloperCard
										key={developer.id}
										name={developer.name}
										github={developer.github}
										mail={developer.mail}
										linkedin={developer.linkedin}
										imageLink={developer.imageLink}
									/>
								))}
							</div>
						</>
					)}
				</div>

				<div className="heading">
					<Typography variant={isMobile ? "h2" : "h1"} align="center">
						Designers
					</Typography>
				</div>
				<div
					style={{
						display: "flex",
						flexDirection: isMobile ? "column" : "row",
						alignItems: "center",
						justifyContent: "center",
						position: "relative",
						gap: "10px",
						margin: "30px",
					}}>
					{isMobile ? (
						// Mobile view: one card per row
						designers.map((designer) => (
							<div
								key={designer.id}
								style={{
									display: "flex",
									flexDirection: "column",
									alignItems: "center", 
									margin: "10px",
									width: "100%",
								}}>
								<DeveloperCard
									name={designer.name}
									github={designer.github}
									mail={designer.mail}
									linkedin={designer.linkedin}
									imageLink={designer.imageLink}
								/>
							</div>
						))
					) : (
						// Desktop view: two cards side by side
						<div
							style={{
								display: "flex",
								gap: "20px", 
								margin: "20px",
								position: "relative",
							}}>
							{row1Designers.map((designer) => (
								<DeveloperCard
									key={designer.id}
									name={designer.name}
									github={designer.github}
									mail={designer.mail}
									linkedin={designer.linkedin}
									imageLink={designer.imageLink}
								/>
							))}
						</div>
					)}
				</div>
			</Layout>
		</div>
	);
}

export default Developers;