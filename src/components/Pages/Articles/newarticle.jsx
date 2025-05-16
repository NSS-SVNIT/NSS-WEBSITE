import {
	Button,
	Grid,
	MenuItem,
	Stack,
	TextField,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { firestore } from "../../../firebase";

export default function NewArticle() {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	const options = [
		{ value: "Magazine", label: "option1" },
		{ value: "Camp Report", label: "option2" },
		{ value: "Annual Report", label: "option3" },
	];

	const [Title, setTitle] = useState("initial");
	const [Type, setType] = useState("Magazine");
	const [Description, setDescription] = useState("");
	const [selectedFile, setSelectedFile] = useState(null);
	const [selectedImage, setSelectedImage] = useState(null);

	const handleSelectChange = (event) => {
		setType(event.target.value);
	};

	const handleFileChange = (event) => {
		const file = event.target.files[0];
		setSelectedFile(file);
	};

	const handleImageChange = (event) => {
		const file = event.target.files[0];
		setSelectedImage(file);
	};

	const storage = getStorage();

	const uploadImage = async (selectedImage, selectedFile) => {
		return new Promise(async (resolve, reject) => {
			const uniqueFilename = `${uuidv4()}_${selectedImage.name}`;
			const uniquePDFname = `${uuidv4()}_${selectedFile.name}`;
			const imageRef = ref(storage, `articleImages/${uniqueFilename}`);
			const PDFRef = ref(
				storage,
				`articleImages/Report/${uniquePDFname}`
			);

			try {
				await Promise.all([
					uploadBytes(imageRef, selectedImage),
					uploadBytes(PDFRef, selectedFile),
				]);

				const Image = await getDownloadURL(imageRef);
				const Download = await getDownloadURL(PDFRef);

				resolve([Image, Download]);
			} catch (error) {
				console.error("Error uploading image or PDF:", error);
				reject(error);
			}
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		await uploadImage(selectedImage, selectedFile)
			.then(async (data) => {
				const [Image, Download] = data;
				const postArticle = {
					Description,
					Download,
					Image,
					Title,
					Type,
				};
				const uuid = uuidv4();
				await setDoc(doc(firestore, "articles", uuid), postArticle);
				setTimeout(function () {
					alert("Form submitted successfully!");
				}, 1000);
			})
			.catch((error) => {
				console.error("Error submitting article:", error);
			});
	};
	return (
		<Grid
			container
			spacing={isMobile ? 2 : 5}
			style={{
				marginTop: "1vh",
				marginBottom: "1vh",
				paddingLeft: isMobile ? "8px" : "0px",
				paddingRight: isMobile ? "8px" : "0px",
			}}
			justifyContent="center">
			<Grid item lg={6} xs={12}>
				<form onSubmit={handleSubmit}>
					<Stack gap={2}>
						<TextField
							label="Title"
							type="title"
							id="outlined-size-normal"
							variant="outlined"
							InputLabelProps={{ shrink: true }}
							onChange={(e) => setTitle(e.target.value)}
							autoComplete="off"
						/>
						<TextField
							label="Description"
							type="description"
							id="outlined-size-normal"
							variant="outlined"
							InputLabelProps={{ shrink: true }}
							onChange={(e) => setDescription(e.target.value)}
							autoComplete="off"
						/>
						<TextField
							select
							label="Type"
							type="type"
							id="outlined-size-normal"
							defaultValue="Magazine"
							variant="outlined"
							fullWidth
							onChange={handleSelectChange}
							autoComplete="off">
							{options.map((option) => (
								<MenuItem
									key={option.label}
									value={option.value}>
									{option.value}
								</MenuItem>
							))}
						</TextField>
						<TextField
							fullWidth
							id="outlined-uncontrolled"
							label="Upload Article"
							type="file"
							inputProps={{ accept: "application/pdf" }}
							InputLabelProps={{ shrink: true }}
							onChange={handleFileChange}
						/>
						<TextField
							fullWidth
							id="outlined-uncontrolled"
							label="Upload Image"
							type="file"
							inputProps={{ accept: "image/*" }}
							InputLabelProps={{ shrink: true }}
							onChange={handleImageChange}
						/>
					</Stack>
					<br></br>
					<Button
						variant="contained"
						type="submit"
						fullWidth={isMobile}>
						{" "}
						Submit{" "}
					</Button>
				</form>
			</Grid>
		</Grid>
	);
}
