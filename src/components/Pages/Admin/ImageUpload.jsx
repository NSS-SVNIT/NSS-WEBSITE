import {
	Box,
	Button,
	Dialog,
	DialogContent,
	FormControl,
	InputLabel,
	LinearProgress,
	ListItem,
	MenuItem,
	Select,
	Stack, // Added
	useMediaQuery,
	useTheme, // Added
} from "@mui/material";
import Compressor from "compressorjs";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { firestore, storage } from "../../../firebase";
export default function ImageUpload() {
	const theme = useTheme(); // Added
	const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Added
	const [foldersList, setFoldersList] = useState([]);
	const [quality, setQuality] = useState(0.8);
	const [selectedFolder, setSelectedFolder] = useState();
	const [files, setFiles] = useState([]);
	const [isUploading, setIsUploading] = useState(false); // Track upload progress
	const [progress, setProgress] = useState(0); // Track progress percentage

	useEffect(() => {
		fetchFolders();
	}, []);

	const fetchFolders = async () => {
		const querySnapshot = await getDocs(collection(firestore, "images"));
		const newData = querySnapshot.docs.map((doc) => ({
			...doc.data(),
			id: doc.id,
		}));
		setFoldersList(newData);
	};

	const handleChange = (event) => {
		setSelectedFolder(event.target.value);
	};

	const handleDrop = (event) => {
		event.preventDefault();
		const uploadedFiles = event.dataTransfer.files;
		setFiles(uploadedFiles);
	};

	const handleDragOver = (event) => {
		event.preventDefault();
	};

	const handleNewFolder = async () => {
		const newFolder = prompt("Enter new folder name");
		if (newFolder) {
			const uuid = uuidv4();

			if (foldersList.find((folder) => folder.name === newFolder)) {
				alert("Folder already exists");
			} else {
				setFoldersList((prev) => [
					...prev,
					{ id: uuid, name: newFolder },
				]);
				const newFolderDict = { name: newFolder, image_links: [] };
				// setSelectedFolder(newFolderDict);
				await setDoc(doc(firestore, "images", uuid), newFolderDict);
			}
		}
	};

	const handleUpload = async () => {
		try {
			const snapshot = await getDoc(
				doc(firestore, "images", selectedFolder.id)
			);
			if (snapshot.exists()) {
				const data = snapshot.data();
				const imageLinks = Array.from(data.image_links || []);

				setIsUploading(true); // Start uploading
				setProgress(0); // Reset progress

				const uploadPromises = Array.from(files).map((file) => {
					return new Promise((resolve, reject) => {
						new Compressor(file, {
							quality: 0.5, // Adjust the image quality as needed
							success(result) {
								// logEvent(analytics, "image_compress_success"); // Removed logEvent
								const storageRef = ref(
									storage,
									`/images/${selectedFolder.name}/${result.name}`
								);

								const uploadTask = uploadBytesResumable(
									storageRef,
									result
								);
								uploadTask.on(
									"state_changed",
									(snapshot) => {
										// Track progress
										const progress = Math.round(
											(snapshot.bytesTransferred /
												snapshot.totalBytes) *
												100
										);
										setProgress(progress);
									},
									(error) => {
										// logEvent(analytics, "image_upload_error"); // Removed logEvent
										reject(error);
									}
								);

								uploadTask.then((snapshot) => {
									getDownloadURL(snapshot.ref).then((url) => {
										imageLinks.push(url); // Store the download URL
										resolve();
									});
								});
							},
							error(error) {
								// logEvent(analytics, "image_upload_error"); // Removed logEvent
								reject(error);
							},
						});
					});
				});

				await Promise.all(uploadPromises);

				// Update the document with the updated imageLinks array
				await setDoc(doc(firestore, "images", selectedFolder.id), {
					image_links: imageLinks,
					name: selectedFolder.name,
				});

				// logEvent(analytics, "image_upload_success"); // Removed logEvent
			}
		} catch (error) {
			// logEvent(analytics, "image_upload_error"); // Removed logEvent
		} finally {
			setIsUploading(false);
			// Upload completed or failed
			setProgress(0); // Reset progress
		}
	};

	return (
		<Stack spacing={2} sx={{ width: "100%" }}>
			{" "}
			{/* Changed to Stack and added spacing */}
			<Stack direction={isMobile ? "column" : "row"} spacing={2}>
				<Box
					onDrop={handleDrop}
					onDragOver={handleDragOver}
					sx={{
						border: "1px dashed black",
						width: isMobile ? "100%" : "50%", // Adjusted width
						padding: "20px",
						// marginBottom: "20px", // Removed, Stack spacing will handle
						textAlign: "center", // Center text
					}}>
					Drag and drop images here
				</Box>
				<Box sx={{ width: isMobile ? "100%" : "50%" }}>
					{" "}
					{/* Adjusted width */}
					{Array.from(files).map((file, id) => (
						<ListItem key={id}>{file.name}</ListItem>
					))}
				</Box>
			</Stack>
			<Stack
				direction={isMobile ? "column" : "row"}
				spacing={2}
				alignItems="center">
				{" "}
				{/* Added Stack for controls */}
				<FormControl
					variant="filled"
					sx={{ m: 1, width: isMobile ? "100%" : 240 }} // Adjusted width
				>
					<InputLabel id="demo-simple-select-filled-label">
						Folders
					</InputLabel>
					<Select
						labelId="demo-simple-select-filled-label"
						id="demo-simple-select-filled"
						value={selectedFolder}
						label="folders"
						onChange={handleChange}>
						{foldersList.map((folder) => (
							<MenuItem key={folder.id} value={folder}>
								{folder.name}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<Button
					onClick={handleNewFolder}
					variant="outlined"
					sx={{ width: isMobile ? "100%" : "auto" }}>
					New Folder
				</Button>
				<Button
					onClick={handleUpload}
					variant="contained"
					sx={{ width: isMobile ? "100%" : "auto" }}>
					Upload
				</Button>
			</Stack>
			<Dialog open={isUploading} sx={{ fontFamily: "DM Sans" }}>
				<DialogContent>
					<Box
						display="flex"
						alignItems="center"
						justifyContent="center">
						<Box width="100%" minWidth={400} mt={4}>
							<Box mb={2}>Uploading Files...</Box>
							<Box mb={2}>Progress: {progress}%</Box>
							<Box sx={{ width: "100%" }}>
								<LinearProgress
									variant="determinate"
									value={progress}
								/>
							</Box>
						</Box>
					</Box>
				</DialogContent>
			</Dialog>
		</Stack> // Changed from div to Stack
	);
}
