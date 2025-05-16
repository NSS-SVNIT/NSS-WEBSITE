import { Box, CircularProgress, Typography } from "@mui/material";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { firestore as db } from "../../../firebase";
import Layout from "../../Layout/Layout";
import HeadingSection from "./HeadingSection";
import TeamBatch from "./TeamBatch";
import * as StaticData from "./TeamData"; // Keep this for fallback

const Team = React.memo(() => {
	const [teamData, setTeamData] = useState({
		Sir: [],
		ProgramCoordinators: [],
		Founder: [],
		CoFounder: [],
	});
	const [teamYears, setTeamYears] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// Fetch team data from Firestore
	useEffect(() => {
		const fetchTeamData = async () => {
			try {
				setLoading(true);
				// console.log("Fetching team data from Firestore...");

				// Get approved volunteers from Firestore
				const volunteersQuery = query(
					collection(db, "volunteers"),
					where("approved", "==", true)
				);

				const querySnapshot = await getDocs(volunteersQuery);
				// console.log(`Found ${querySnapshot.size} approved volunteers`);

				// Initialize data structure with a copy of static data
				const fetchedData = { ...StaticData }; // Start with all static data

				// Categories that should be overwritten by Firestore data if available, not merged by appending.
				const overwriteCategories = [
					"Sir",
					"ProgramCoordinators",
					"Founder",
					"CoFounder",
				];

				// Group volunteers by category from Firestore
				const volunteersByCategory = {};
				querySnapshot.forEach((doc) => {
					const volunteer = doc.data();
					const category = volunteer.category;

					// console.log(
					// 	`Processing volunteer: ${volunteer.name}, category: ${category}`
					// );

					if (!category) {
						const batch = volunteer.batch?.toString();
						if (!batch) {
							console.warn(
								`Volunteer ${volunteer.name} has no category or batch value, skipping`
							);
							return;
						}
						const yearKey = `Team${batch}`;
						if (!volunteersByCategory[yearKey]) {
							volunteersByCategory[yearKey] = [];
						}
						volunteersByCategory[yearKey].push({
							...volunteer,
							id: doc.id,
						});
					} else {
						if (!volunteersByCategory[category]) {
							volunteersByCategory[category] = [];
						}
						volunteersByCategory[category].push({
							...volunteer,
							id: doc.id,
						});
					}
				});

				// Merge Firestore data into fetchedData
				Object.keys(volunteersByCategory).forEach((key) => {
					if (
						overwriteCategories.includes(key) &&
						volunteersByCategory[key].length > 0
					) {
						// For overwrite categories, replace static data if Firestore data exists
						fetchedData[key] = volunteersByCategory[key];
					} else if (fetchedData[key]) {
						// For other existing categories (e.g., TeamYYYY from static data),
						// append Firestore data, ensuring no duplicates by ID if volunteers might have IDs.
						// Assuming Firestore data is the source of truth for these if IDs match.
						const staticMembers = fetchedData[key];
						const firestoreMembers = volunteersByCategory[key];
						const combinedMembers = [...staticMembers];
						const staticMemberIds = new Set(
							staticMembers.map((m) => m.id).filter((id) => id)
						); // Assuming 'id' might exist on static data

						firestoreMembers.forEach((fm) => {
							// If static data doesn't have IDs or this Firestore member is not in static data
							if (
								!staticMemberIds.size ||
								!staticMemberIds.has(fm.id)
							) {
								combinedMembers.push(fm);
							}
						});
						fetchedData[key] = combinedMembers;
					} else {
						// If this is a new category from Firestore (e.g., a new TeamYYYY not in static data)
						fetchedData[key] = volunteersByCategory[key];
					}
				}); // Update state
				setTeamData(fetchedData);
				// console.log("Team data structure:", Object.keys(fetchedData));
				Object.keys(fetchedData).forEach((key) => {
					if (key.startsWith("Team")) {
						// console.log(
						// 	`${key} has ${fetchedData[key].length} members`
						// );
					}
				});

				// Extract and sort years
				const years = Object.keys(fetchedData)
					.filter((key) => key.startsWith("Team"))
					.map((year) => parseInt(year.replace("Team", "")))
					.sort((a, b) => b - a);

				setTeamYears(years);
				// console.log("Team years set:", years);
			} catch (err) {
				console.error("Error fetching team data:", err);
				setError("Failed to load team data. Please try again later.");

				// Fallback to static data
				setTeamData({
					Sir: StaticData.Sir,
					ProgramCoordinators: StaticData.ProgramCoordinators,
					Founder: StaticData.Founder,
					CoFounder: StaticData.CoFounder,
					...Object.keys(StaticData)
						.filter((key) => key.startsWith("Team"))
						.reduce((obj, key) => {
							obj[key] = StaticData[key];
							return obj;
						}, {}),
				});

				// Set years from static data
				const staticYears = Object.keys(StaticData)
					.filter((key) => key.startsWith("Team"))
					.map((year) => parseInt(year.replace("Team", "")))
					.sort((a, b) => b - a);

				setTeamYears(staticYears);
			} finally {
				setLoading(false);
			}
		};

		fetchTeamData();

		// Scroll to the top of the page when the component mounts
		window.scrollTo(0, 0);

		// Cleanup function to scroll to the top when the component unmounts
		return () => {
			window.scrollTo(0, 0);
		};
	}, []); // No dependencies, only load once on component mount

	// Show loading indicator while fetching data
	if (loading) {
		return (
			<Layout>
				<HeadingSection />
				<Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
					<CircularProgress />
				</Box>
			</Layout>
		);
	}

	// Show error message if data fetch failed
	if (error) {
		return (
			<Layout>
				<HeadingSection />
				<Box sx={{ textAlign: "center", py: 5 }}>
					<Typography variant="h6" color="error" gutterBottom>
						{error}
					</Typography>
					<Typography variant="body1">
						Showing available team information instead.
					</Typography>
				</Box>
				{/* Render with static data */}
				<TeamBatch year={2000} TeamList={StaticData.Sir} />
				<TeamBatch
					year={2003}
					TeamList={StaticData.ProgramCoordinators}
				/>
				<TeamBatch year={2001} TeamList={StaticData.Founder} />
				<TeamBatch year={2002} TeamList={StaticData.CoFounder} />
				{Object.keys(StaticData)
					.filter((key) => key.startsWith("Team"))
					.map((key) => {
						const year = parseInt(key.replace("Team", ""));
						return (
							<TeamBatch
								key={year}
								year={year}
								TeamList={StaticData[key]}
							/>
						);
					})}
			</Layout>
		);
	}
	return (
		<Layout>
			<HeadingSection />
			<TeamBatch year={2000} TeamList={teamData.Sir} />{" "}
			{/* If year is 2000, it means it's for Faculty Advisor */}
			<TeamBatch
				year={2003}
				TeamList={teamData.ProgramCoordinators}
			/>{" "}
			{/* If year is 2003, it means it's for Program Coordinators */}
			<TeamBatch year={2001} TeamList={teamData.Founder} />{" "}
			{/* If year is 2001, it means it's for Founders */}
			<TeamBatch year={2002} TeamList={teamData.CoFounder} />{" "}
			{/* If year is 2002, it means it's for Co-Founders */}
			{teamYears.map((year) => (
				<TeamBatch
					key={year}
					year={year}
					TeamList={teamData[`Team${year}`]}
				/>
			))}
		</Layout>
	);
});

export default Team;
