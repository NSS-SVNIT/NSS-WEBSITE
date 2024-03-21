import React, { useState, useEffect } from "react";
import Layout from "../../Layout/Layout";
import { Box, Button, Grid, Stack, TextField, MenuItem } from "@mui/material";
import {useForm} from "react-hook-form"
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Firestore } from "@firebase/firestore";
import { doc, setDoc } from "@firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { firestore} from "../../../firebase";
import {getStorage, uploadBytes, ref, getDownloadURL} from "@firebase/storage"

export default function NewArticle() {
  const options = [
    { value: 'Magazine', label: 'option1' },
    { value: 'Camp Report', label: 'option2' },
    { value: 'Annual Report', label: 'option3' },
  ];

  const [Title, setTitle] = useState("initial")
  const [Type, setType] = useState("Magazine")
  const [Description, setDescription] = useState("")
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  // const [Image, setImage] = useState("null");
  // const [Download, setDownload] = useState("null");

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


//   const uploadImage = async (selectedImage, selectedFile) => {
//     return new Promise((resolve, reject) => {
//         const storage = getStorage();
//         const uniqueFilename = `${uuidv4()}_${selectedImage.name}`;
//         const uniquePDFname = `${uuidv4()}_${selectedFile.name}`;
//         const imageRef = ref(storage, `articleImages/${uniqueFilename}`);
//         const PDFRef = ref(storage, `articleImages/Report/${uniquePDFname}`);
        
//         Promise.all([
//             uploadBytes(imageRef, selectedImage),
//             uploadBytes(PDFRef, selectedFile),
            
//         ]).then(() => {
//             // Get download URLs for both image and PDF
//             let p2 = new Promise((resolve, reject)=>{
//               const imageUrl = getDownloadURL(imageRef);
//               const pdfUrl = getDownloadURL(PDFRef);
//               resolve({ imageUrl, pdfUrl });
//             })
//             return p2;}).then((imageUrl, pdfUrl)=>{
//               setImage(imageUrl);
//               setDownload(pdfUrl);
//             })
            
//             console.log(Image);
//             console.log(Download);
//             console.log('Image and PDF uploaded successfully.');
//             // Resolve the promise with the generated filenames and download URLs
//             resolve({ imageFilename: uniqueFilename, pdfFilename: uniquePDFname, imageUrl, pdfUrl });
//           }).catch(error => {
//             console.error('Error uploading image or PDF:', error);
//             reject(error);
//         });
//     });
// };
  const storage = getStorage();
  // const storage = getStorage();

  const uploadImage = async (selectedImage, selectedFile) => {
      return new Promise(async (resolve, reject) => {
          const uniqueFilename = `${uuidv4()}_${selectedImage.name}`;
          const uniquePDFname = `${uuidv4()}_${selectedFile.name}`;
          const imageRef = ref(storage, `articleImages/${uniqueFilename}`);
          const PDFRef = ref(storage, `articleImages/Report/${uniquePDFname}`);
          
          try {
              await Promise.all([
                  uploadBytes(imageRef, selectedImage),
                  uploadBytes(PDFRef, selectedFile)
              ]);
  
              const Image = await getDownloadURL(imageRef);
              const Download = await getDownloadURL(PDFRef);
              // console.log(imageUrl);
              // console.log(pdfUrl);
              // setImage(imageUrl);
              // setDownload(pdfUrl);
              // console.log(Image);
              // console.log(Download);
              
              resolve([Image, Download]);
          } catch (error) {
              console.error("Error uploading image or PDF:", error);
              reject(error);
          }
      });
  };
  

  // const url = async (imageUrl, pdfUrl) => {
        
  //     try {
          
  //         setImage(imageUrl);
  //         setDownload(pdfUrl);
  //         console.log(Image);
  //         console.log(Download);
          
  //         resolve([imageUrl, pdfUrl]);
  //     } catch (error) {
  //         console.error("Error uploading image or PDF:", error);
  //         reject(error);
  //     }


  // };
    
  
  const handleSubmit = async (event) => {
    // event.preventDefault();
    console.log(selectedImage);
    await uploadImage(selectedImage, selectedFile).then(async(data) => {
      const [Image, Download] = data;
      // await url(imageUrl, pdfUrl);
      const postArticle = { Description, Download, Image, Title, Type };
          console.log(postArticle)
          const uuid = uuidv4();
          // postData["timestamp"] = today.getTime();
          await setDoc(doc(firestore, "articles", uuid), postArticle);
    }).catch((error)=>{
      console.log(error);
    });
    
    
    // try {
    //   // await uploadImage(selectedImage, selectedFile);
    //   const postArticle = {Description, Download, Image, Title, Type};
    //   console.log(postArticle)
    //   const uuid = uuidv4();
    //   // postData["timestamp"] = today.getTime();
    //   await setDoc(doc(firestore, "articles", uuid), postArticle);
    //   // Reset form after successful submission
    //   // setPostData(initPostData);
    // } catch (error) {
    //   // console.error("Error submitting post:", error.message);
    //   console.log("error");
    //   // Handle error and provide user feedback
    // }
    
    
    
  };
  return (
    <Layout>
      
        <Grid container spacing={5} style={{marginTop:'1vh', marginBottom:'1vh'}}>
        <Grid item lg={6}>
        <form onSubmit={handleSubmit}>
          <Stack gap={2}>
          <TextField label="Title" type = "title" id="outlined-size-normal" variant="outlined" InputLabelProps={{shrink: true,}} onChange={(e)=>setTitle(e.target.value)} />
          <TextField label="Description" type = "description" id="outlined-size-normal" variant="outlined" InputLabelProps={{shrink: true,}} onChange={(e)=>setDescription(e.target.value)} />
          <TextField select label="Type" type = "type" id="outlined-size-normal" defaultValue="Magazine" variant="outlined" fullWidth onChange={handleSelectChange}>
            {options.map((option) => (
                <MenuItem key={option.label} value={option.value}>
                {option.value}
                </MenuItem>
            ))}
          </TextField>
          <TextField  fullWidth id="outlined-uncontrolled" label="Upload Article" type="file" inputProps={{ accept: 'application/pdf' }} InputLabelProps={{shrink: true,}} onChange={handleFileChange}
           />
          <TextField  fullWidth id="outlined-uncontrolled" label="Upload Image" type="file" inputProps={{ accept: 'image/*' }} InputLabelProps={{shrink: true,}} onChange={handleImageChange}
           />
           {/* <h1>{selectedImage.name}</h1> */}
           
          </Stack>
          <Button variant="contained" type="submit"> Submit </Button>
          </form>
        </Grid>        
      </Grid>
      
   </Layout>
  );
}
