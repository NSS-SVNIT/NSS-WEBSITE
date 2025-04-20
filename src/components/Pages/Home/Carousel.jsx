import React from "react";
import {
	Card,
	Avatar,
	Typography,
	useMediaQuery,
	useTheme,
	Box,
	Button,
	Stack,
} from "@mui/material";
import Carousel from "react-material-ui-carousel";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import photo2018 from "./2018.jpg";
import photo2019 from "./2019.jpg";
import photo2020 from "./2020.jpg";
import founder from "./founder.jpg";
var items = [
	{
		title: "Message From Our Founder",
		name: "Gulshan Rana",
		description:
			"Embrace every challenge as an opportunity to learn and grow. Our commitment to service is a powerful force for good, and it has the potential to create a lasting impact on the lives of those we serve. Each small act of kindness, every initiative we take, contributes to the greater good. Our team is our support system, and together, we can overcome any hurdle. Be open to new ideas, perspectives, and collaborations, for it is in diversity that we find our greatest strength. Stay motivated, stay passionate, and always keep the purpose of service at the forefront of our actions. Our dedication has the power to inspire others to follow in our footsteps and create a ripple effect of positive change. Carry the torch of service with pride and let it illuminate the path towards a better tomorrow.",
		imageUrl: founder,
	},
	{
		title: "Message From Our Convenor Batch 2018",
		name: "Tushar Sanwarey",
		description:
			"To all the volunteers of NSS SVNIT always remember the cause you are working for i.e towards the betterment for our society and finding a better version of ourselves. Always aspire for Dreaming More! Learning More! Doing More! Becoming More",
		imageUrl: photo2018,
	},
	{
		title: "Message From Our Convenor Batch 2019",
		name: "Hiren Vaghela",
		description:
			"To the NSS volunteers, your commitment to service is a beacon of inspiration. In the tapestry of community, each stitch you weave contributes to a brighter, compassionate world. Embrace challenges as opportunities to sow seeds of positive change i.e the delta change as we know it. Your collective impact is immeasurable. Keep shining your light of selflessness; the world is brighter because of you.",
		imageUrl: photo2019,
	},
	{
		title: "Message From Our Convenor Batch 2020",
		name: "Saurav Singh",
		description:
			"To my dear family, continue to flourish and reach new pinnacles as you are currently doing. Looking at each of you dedicating yourselves to the betterment of society and those around you is truly inspiring and that's what we are always known for. Our journey from a small group to a dedicated force within a few years has been remarkable, yet there is a lot to do. Strive for transformative progress, and the outcomes will undoubtedly follow. Just Believe in yourself.",
		imageUrl: photo2020,
	},
	{
		title: "Message From Our Convenor Batch 2021",
		name: "Shubham Chandak",
		description:
			"Dear Readers, I hope this message finds you in the best of spirits. It is with immense gratitude that I reflect on my journey with the NSS Unit SVNIT, an organization that has truly become a second family to me. The NSS Unit SVNIT has consistently dedicated itself to community service, all while ensuring the holistic development of its volunteers. Our guiding motto, 'NOT ME BUT YOU' is a testament to the selflessness and commitment that each volunteer embodies.To the current batch of volunteers, I extend my heartfelt best wishes for your ongoing NSS activities. Your dedication and hard work continue to raise the bar and inspire all of us. Keep up the excellent work, and continue to make a difference in the community and yourselves.",
		imageUrl:
			"https://firebasestorage.googleapis.com/v0/b/nss-svnit.appspot.com/o/team%20page%2F2021%2FShubham.jpg?alt=media&token=162ebe8b-3068-46ba-861a-f98823c12647",
	},
];

export default function CarouselResponsive() {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	return (
		<Card
			elevation={3}
			sx={{
				p: { xs: 2, sm: 3 },
				m: { xs: "16px auto", sm: "32px auto" },
				width: { xs: "95%", sm: "80%", md: "60%" },
				height: { xs: "auto", sm: "40vh" },
				maxHeight: { xs: "80vh", sm: "60vh" },
				borderRadius: 2,
				bgcolor: "background.paper",
				overflow: "hidden",
				display: "flex",
				flexDirection: "column",
			}}>
			<Carousel
				autoPlay
				interval={5000}
				NextIcon={<NavigateNextIcon />}
				PrevIcon={<NavigateBeforeIcon />}
				>
				{items.map((item, index) => {
					const isLong = item.description.length > 200;
					return (
						<Box
							key={index}
							sx={{
								display: "flex",
								flexDirection: { xs: "column", sm: "row" },
								alignItems: isMobile ? "center" : "flex-start",
								textAlign: { xs: "center", sm: "left" },
								overflow: "hidden",
								height: { xs: "auto", sm: "100%" },
							}}>
							{/* Fixed-size image container */}
							<Box
								sx={{
									flexShrink: 0,
									p: 1,
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
								}}>
								<Avatar
									src={item.imageUrl}
									alt={item.name}
									variant="rounded"
									sx={{
										width: { xs: 120, sm: 180 },
										height: { xs: 120, sm: 180 },
									}}
								/>
							</Box>
							{/* Scrollable content container */}
							<Stack
								spacing={1}
								sx={{
									flex: 1,
									p: 1,
									maxHeight: isLong
									? { xs: '200px', sm: '200px' }
									: 'none',
									overflowY: isLong
									? { xs: 'visible', sm: 'auto' }
									: 'visible',
								}}>
								<Typography
									variant={isMobile ? "h6" : "h4"}
									sx={{ fontWeight: 600 }}>
									{item.name}
								</Typography>
								<Typography
									variant={
										isMobile ? "subtitle2" : "subtitle1"
									}
									sx={{ fontStyle: "italic" }}>
									{item.title}
								</Typography>
								<Typography
									variant={isMobile ? "body2" : "body1"}
									textAlign={"justify"}
									overflow="auto"
									sx={{ lineHeight: 1.5 }}>
									{item.description}
								</Typography>
							</Stack>
						</Box>
					);
				})}
			</Carousel>
		</Card>
	);
}
