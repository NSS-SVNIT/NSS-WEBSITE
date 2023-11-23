import React, { useEffect } from 'react';
import Layout from '../Layout/Layout';
import ComitteeSection from './Home/ComitteeSection';
import DutySection from './Home/DutySection';
import { motion } from "framer-motion";
import { Typography, Box, Grid } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  gradientBackground: {
    background: 'linear-gradient(to bottom, #ffebff, #FFE6FF)',
  },
});

const About = () => {
  const classes = useStyles();

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);

    // Cleanup function to scroll to the top when the component unmounts
    return () => {
      window.scrollTo(0, 0);
    };
  }, []); // The empty dependency array ensures this effect runs only once when the component mounts

  return (
    <Layout>
      <Typography variant='h1' sx={{ px:10,pt:5 ,fontWeight:400 }}>ABOUT NSS</Typography>
      <br/>
      <Box>
      <motion.div >
      <Typography variant='h6' sx={{m:"23px",p:"25px" ,textAlign:"justify", bgcolor:"#ffebff" , borderRadius:"25px",
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
   rows:"10"}} >NSS Unit SVNIT has been trying to realise its aim of bringing the community along with it to prosperity in a rising India.
          Comprehensive and long-term development models have always been prioritised by NSS Unit SVNIT, which is composed of motivated volunteers who are expertly advised by eminent professors. NSS aims to instill service values in students in addition to its core objective of community development. This will help students become aware and responsible citizens who care about their country and the entire world.
          Through several campus-wide initiatives like cleanliness drives, we tirelessly work to not only improve the lives of the underprivileged and oppressed, but also to ensure that the community's development is not halted.Our commitment to quality is all-encompassing, and it only gets stronger with time, as shown by the diversification that is occurring while simultaneously making sure that the core principles and concepts don't get lost in the process.</Typography>
          </motion.div></Box>


      <div style={{ overflowX: 'hidden' }}>
        <Grid container spacing={2} sx={{ marginTop: '45px', marginLeft: '60px', marginBottom: '60px' }}>
          <Grid item xs={6} sm={6} md={5}>
            <motion.div
             initial={{ opacity: 0, x: -100 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 1 }}>
            {/* <Slide direction="right" in={true} timeout={1000} mountOnEnter> */}
              <Typography variant="h3" fontSize={'50px'} gutterBottom sx={{ marginTop: '50px', fontSize: { xs: "20px", sm: "30px", md: "40px", lg: "50px" } }}>
                About Our
              </Typography>
              </motion.div>
            {/* </Slide> */}
            {/* <Slide direction="right" in={true} timeout={1300} mountOnEnter> */}
            <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            >

              <Typography variant="h1" fontSize={'100px'} gutterBottom sx={{ fontSize: { xs: "40px", sm: "40px", md: "50px", lg: "100px" } }}>
                History
              </Typography>
              </motion.div>
            {/* </Slide> */}
            {/* <Slide direction="right" in={true} timeout={1500} mountOnEnter> */}
            <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            >
              <Typography variant="subtitle2" gutterBottom sx={{ fontSize: { xs: "16px", sm: "14px", md: "20px", lg: "20px" } }}>
              The history of the National Service Scheme (NSS) unit at the Sardar Vallabhbhai National Institute of Technology (SVNIT) is a testament to the spirit of volunteerism and social responsibility among the students. The NSS unit at SVNIT was established in 2018, with the aim of fostering social welfare and community development through various initiatives. Over the years, the unit has played a vital role in organizing numerous activities and campaigns that have made a positive impact on the lives of people in and around the campus. From conducting blood donation drives, health camps, and awareness programs to promoting cleanliness, environmental conservation, and education, the NSS unit has actively engaged students in serving society and creating a better world. With a rich history of service and a strong commitment to social change, the NSS SVNIT unit continues to inspire and empower students to contribute to the betterment of society.
              </Typography>
            {/* </Slide> */}
            </motion.div>
          </Grid>
          <Grid item xs={12} sm={6} md={7} sx={{width:{lg:"100%",md:"50%",sm:"40%",xs:"20%"},height:{lg:"100%", md:"50%",sm:"40%"}}}>
            {/* <Slide direction="left" in={true} timeout={1200} mountOnEnter> */}
              <motion.div style={{ position: 'relative', width: '100%', height: '600px', paddingTop: '100%', backgroundColor: '#ffebff', borderRadius: '50%',
           }}
           initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x:  0}}
            viewport={{ once: true }}
            transition={{ duration: 2 }}>

                {/* <Slide direction="left" in={true} timeout={2000} mountOnEnter> */}
                  <img src="src/assets/nss_logo.png" alt="Right Content" height="80%" style={{ position: 'absolute', top: 90 , left: 90,  right: 90,  bottom: 90, width: '80%', objectFit: 'cover', borderRadius: '50%'} } 
                  
                  alignItems="center" justifyContent="center" />
                {/* </Slide> */}
              </motion.div>
            {/* </Slide> */}
          </Grid>
        </Grid>
      </div>

      <Grid container spacing={1} sx={{ display: "flex" }}>

        <Grid item lg={6} xs={12} sm={12} md={6} sx={{ px: 2 }}>
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <Box sx={{
              fontFamily: "DM Sans", ml: "50px", mt: "50px", mb: "50px", fontSize: "70%", display: "flex",
              height: "300px",
              width: "80%",
              borderRadius: "5px",
              boxShadow: " 3px 3px #ffccff",
              alignItems: "center",
              justifyContent: "center",
            }} variant='outlined' className={classes.gradientBackground}>
              <Typography variant='h4' sx={{ m: { xs: 2, sm: 3, md: 4, lg: 5 } }}>OUR MISSION</Typography>
              <Typography sx={{ fontSize: { xs: "10px", sm: "12px", md: "14px", lg: "15px" } }}>Our mission is to transform volunteers into dedicated social servants, embodying the ethos of "not me but you." We prioritize their overall development while instilling a strong sense of social responsibility. Through diverse initiatives, we aim to raise awareness, address societal challenges, and empower marginalized communities. Together, we strive to create a network of changemakers committed to creating a better future.</Typography>
            </Box>
          </motion.div>
        </Grid>


        <Grid item lg={6} xs={12} sm={12} md={6} sx={{ px: 2 }}>
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <Box sx={{
              fontFamily: "DM Sans", ml: "50px", mt: "50px", mb: "50px", fontSize: "70%", display: "flex",
              height: "300px",
              width: "80%",
              boxShadow: " 3px 3px #ffccff",
              borderRadius: "5px",
              alignItems: "center",
              justifyContent: "center",
            }} variant='outlined' className={classes.gradientBackground}>
              <Typography variant='h4' sx={{ m: { xs: 2, sm: 3, md: 4, lg: 5 } }}>OUR VISION</Typography>
              <Typography sx={{ fontSize: { xs: "10px", sm: "12px", md: "14px", lg: "15px" } }}>Our vision is a society where individuals embrace empathy and actively contribute to positive change. We strive to foster inclusivity and empower volunteers to make a meaningful impact in their communities. By promoting social awareness, we aim to create a more compassionate and equitable world for all.</Typography>
            </Box>
          </motion.div>
        </Grid>

      </Grid>
      <DutySection>
      </DutySection>
      <ComitteeSection>
      </ComitteeSection>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        
      </div>
    </Layout>
  )
}

export default About