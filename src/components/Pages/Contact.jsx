import { Typography } from '@mui/material'
import React,{useRef} from 'react'
import Layout from '../Layout/Layout'
import emailjs from '@emailjs/browser';
import styled from "styled-components";
import FacebookIcon from '@mui/icons-material/Facebook';
import MailIcon from "@mui/icons-material/Mail";
import CallIcon from "@mui/icons-material/Call";
import { MapContainer, TileLayer, useMap, Popup, Marker } from "react-leaflet";
import {
  Grid,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,

} from "@mui/material";
const Contact = () => {
  const position = [21.1702, 72.8311]; // Coordinates for SVnit location


  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_w96ro1o', 'template_axmbqrp', form.current, 'hWmGbvS-_WHVr5Yun')
      .then((result) => {
          console.log(result.text);
          console.log('message sent');
      }, (error) => {
          console.log(error.text);
      });
  };

  return (
    <Layout><Grid container direction="row" spacing={2}>
       <ContactSection>
        
          <Grid item xs={12} lg ={6}>
           <Box sx={{ my: 5, ml: 10, width:400, mb:4 }}>
        <p>

          Find us at: <br></br>
          S.V.N.I.T,Ichcchanath,Dumas Road,Surat.   <br></br>  
        </p>
        <Grid item xs={12} lg ={6} >
          <div className='map'>
          <MapContainer center={position} zoom={13} scrollWheelZoom={true} >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
             
            />
            <Marker position={position}>
            </Marker>
          </MapContainer>
          </div>
        </Grid>
           </Box>
           </Grid>
           <div className="contact-form">
           <div className="left">
<Grid item xs={20} lg ={12}>
           <Box
        sx={{
          m: 3,
          width: "300px",
          ml: 15,
          float:"left",
          "@media (max-width:600px)": {
            width: "50px",
            backgroundColor:'#E4C0B8',
          },
        }}
      >
        
        <TableContainer component={Paper}>
          <Table aria-label="contact table">
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{ bgcolor: "orange", color: "black" }}
                  align="center"
                >
                  Contact Details
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <FacebookIcon  sx={{ color: "red", pt: 1 }} /> FB ID
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <MailIcon sx={{ color: "brown", pt: 1 }} /> nsssvnit@gmail.com
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <CallIcon sx={{ color: "green", pt: 1 }} /> 1234567890
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        
      </Box>
      </Grid>
          </div>
          <div className="right">
            <Grid item xs={20} lg ={12}>
          <Typography variant='h4' mt={4} pl={10} >
          Feel Free to Reach Us!
        </Typography>
        <Typography variant='h6' pl={10}>
          Send Your Message Here.
        </Typography>
        <StyledContactForm pl={7} mt= {7} >
      <form ref={form} onSubmit={sendEmail} >
        <label>Name</label>
        <input type="text" name="user_name" placeholder='full name'/>
        <label>Email</label>
        <input type="email" name="user_email" placeholder='email' />
        <label>Message</label>
        <textarea name="message" placeholder='type your message' />
        <input type="submit" value="Send" />
      </form>
    </StyledContactForm>
    </Grid>

    </div>
    </div>
    </ContactSection>
    </Grid>
    </Layout>
  )
}

export default Contact

const StyledContactForm = styled.div`
  width: 300px;
  
  form {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 120%;
    font-size: 16px;
    float:"right";
    position: relative;
    top: 50%;
    
  
   display: inline-block;
   vertical-align: top;
    input {
      width: 100%;
      margin:5px;
      height: 40px;
      padding: 7px;
      outline: none;
      border-radius: 5px;
      border: 1px solid rgb(220, 220, 220);

      &:focus {
        border: 2px solid rgba(0, 206, 158, 1);
      }
    }

    textarea {
      max-width: 100%;
      min-width: 100%;
      width: 100%;
      max-height: 100px;
      min-height: 120px;
      padding: 7px;
      outline: none;
      border-radius: 5px;
      border: 1px solid rgb(220, 220, 220);
      resize: vertical;

      &:focus {
        border: 2px solid rgba(0, 206, 158, 1);
      }
    }

    label {
      margin-top: 1rem;
    }

    input[type="submit"] {
      margin-top: 2rem;
      cursor: pointer;
      background: rgb(249, 105, 14);
      color: white;
      border: none;
    }
    "@media (max-width:600px)": {
      width: "150px",
      backgroundColor:'#E4C0B8',
    },
  }
`;

const ContactSection = styled.div`

.contact-form {
  display : flex;
  gap: 3rem;
  // margin-top:2rem;
  justify-content : center;
  position : relative;
}
// .contact-form::after{
//   position:absolute;
//   content:'';
//   width:2px;
//   height:90%;
//   background-color: orange;
//   left:50%;
//   top:50%;
//   transform: translate(-50%,-50%);
//   @media (max-width:600px):{
//     width:2px;
//   height:20%;
//   background-color: orange;
//   left:1%;
//   top:20%;
//   }
// }



`;