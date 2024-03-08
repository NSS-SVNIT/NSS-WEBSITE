import React from "react";
import Layout from "../Layout/Layout";
import DeveloperCard from "./DeveloperCard";
import { Typography } from "@mui/material";
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
				"https://firebasestorage.googleapis.com/v0/b/nss-svnit.appspot.com/o/Developers%20and%20Designers%2Faditi.jpg?alt=media&token=381119fd-7f69-4480-a05c-940560ecac2a",
		},
		{
			id: 2,
			name: "Harshit Pathak",
			github: "https://github.com/Story27",
			mail: "mailto:pathakharshit281@gmail.com",
			linkedin: "https://www.linkedin.com/in/harshit-pathak-4ba6aa22a/",
			imageLink:
				"https://firebasestorage.googleapis.com/v0/b/nss-svnit.appspot.com/o/Developers%20and%20Designers%2Fharshit.jpg?alt=media&token=cf30f119-6da7-4167-8c9b-fbd3b69e5a91",
		},
		{
			id: 3,
			name: "Jinhal Maheshwari",
			github: "https://github.com/Jinhal01",
			mail: "mailto:jinhalmaheshwari1256@gmail.com",
			linkedin: "linkedin.com/in/jinhal-maheshwari-71a217212/",
			imageLink:
				"https://firebasestorage.googleapis.com/v0/b/nss-svnit.appspot.com/o/Developers%20and%20Designers%2Fjinhal.jpg?alt=media&token=ceb14311-8bfb-472d-b48c-34774f0ca7d9",
		},
		{
			id: 4,
			name: "Param Shah",
			github: "https://github.com/paramshah1903",
			mail: "mailto:shahparam1903@gmail.com",
			linkedin: "https://www.linkedin.com/in/param-shah-716322227/",
			imageLink:
				"https://firebasestorage.googleapis.com/v0/b/nss-svnit.appspot.com/o/Developers%20and%20Designers%2Fparam.jpg?alt=media&token=d04500c6-e748-44e6-a681-fc917e05676b",
		},
		{
			id: 5,
			name: "Pragnesh Barik",
			github: "https://github.com/pragneshbarik",
			mail: "mailto:barikpragnesh@gmail.com",
			linkedin: "https://www.linkedin.com/in/pragnesh-barik",
			imageLink:
				"https://firebasestorage.googleapis.com/v0/b/nss-svnit.appspot.com/o/Developers%20and%20Designers%2Fpragnesh.jpg?alt=media&token=0cb1f05d-f0e3-42ce-98b7-f50e36041cf3",
		},
		{
			id: 6,
			name: "Shreeya Dave",
			github: "https://github.com/shreeyadave",
			mail: "mailto:shreeyadave776@gmail.com",
			linkedin: "https://www.linkedin.com/in/shreeya-dave-444166232/",
			imageLink:
				"https://firebasestorage.googleapis.com/v0/b/nss-svnit.appspot.com/o/Developers%20and%20Designers%2Fshreeya.jpeg?alt=media&token=5e4dd1b7-ccda-4cfb-8a58-0d663c7ada9b",
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
				"https://firebasestorage.googleapis.com/v0/b/nss-svnit.appspot.com/o/Developers%20and%20Designers%2Fkeval.jpg?alt=media&token=e8da1dc5-273d-44ba-bf41-b00d4a6e54c6",
		},
		{
			id: 2,
			name: "Namrata Rathod",
			github: "https://github.com/Namarata28",
			mail: "mailto:namrata.rathod028@gmail.com",
			linkedin: "www.linkedin.com/in/nr28",
			imageLink:
				"https://firebasestorage.googleapis.com/v0/b/nss-svnit.appspot.com/o/Developers%20and%20Designers%2Fnamrata.jpg?alt=media&token=367be3ab-97b9-4584-bc62-27b824fd0fc2",
		},
	];

	const row1 = developers.slice(0, 3);
	const row2 = developers.slice(3);
	const row1Designers = designers.slice(0, 2);

	return (
		<div>
			<Layout>
				<div className="heading">
					<Typography variant="h1" align="center">
						Developers
					</Typography>
				</div>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						gap: "16px", // Adjust the gap according to your design
					}}>
					<div
						style={{
							display: "flex",
							gap: "56px", // Adjust the gap according to your design
							margin: "30px",
							position: "relative",
						}}>
						{row1.map((developer) => (
							<DeveloperCard
								key={developer.id}
								name={developer.name}
								github={developer.github}
								mail={developer.mail}
								linkedin={developer.linkedin}
								imageLink={developer.imageLink} // Use the correct prop name
							/>
						))}
					</div>
					<div
						style={{
							display: "flex",
							gap: "56px", // Adjust the gap according to your design
							margin: "30px",
							position: "relative",
							marginTop: "30px",
							marginBottom: "50px",
						}}>
						{row2.map((developer) => (
							<DeveloperCard
								key={developer.id}
								name={developer.name}
								github={developer.github}
								mail={developer.mail}
								linkedin={developer.linkedin}
								// insta={developer.insta}
								imageLink={developer.imageLink} // Use the correct prop name
							/>
						))}
					</div>
				</div>

				<div className="heading">
					<Typography variant="h1" align="center">
						Designers
					</Typography>
				</div>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "center",
						position: "relative",
						gap: "46px", // Adjust the gap according to your design
						margin: "50px",
					}}>
					{row1Designers.map((designer) => (
						<DeveloperCard
							key={designer.id}
							name={designer.name}
							github={designer.github}
							mail={designer.mail}
							linkedin={designer.linkedin}
							// insta={designer.insta}
							imageLink={designer.imageLink} // Use the correct prop name
						/>
					))}
				</div>
			</Layout>
		</div>
	);
}

export default Developers;
