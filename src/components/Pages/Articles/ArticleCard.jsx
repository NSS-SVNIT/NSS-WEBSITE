import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const url = 'https://firebasestorage.googleapis.com/v0/b/nss-svnit.appspot.com/o/articleImages%2FReport%2FCamp%20Report1.pdf?alt=media&token=f04dc8ff-2bed-41ee-a5ee-98473afb3e98'
export default function ArticleCard(props) {
  const theme = useTheme();
  
const download =(url)=>{
  const filename = "file"
  const aTag = document.createElement('a')
  aTag.href = url
  aTag.setAttribute("download", filename)
  document.body.appendChild(aTag)
  aTag.click()
  aTag.remove()
}

  return (
    <Card sx={{ display: 'flex' }} style={{height:'30vh', margin:'20px', width:'30vw'}}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }} style={{boxSizing:'border-box', heigth:'100%', width:'20vw'}}>
          <Typography component="div" variant="h5" >
            {props.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {props.description}
          </Typography>
          <Button onClick={()=>{download(url)}} >Download</Button>
        </CardContent>
        
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          {/* <Button>Download</Button> */}
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={props.image}
        alt={props.type}
        style={{objectFit:'fill'}}
      />
    </Card>
  );
}
