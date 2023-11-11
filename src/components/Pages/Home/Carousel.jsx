import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button ,Card , Box , Grid, Typography} from '@mui/material'

export default function Example(props)
{
    var items = [
        {
           title: "Message From Our Convenor Batch 2020",
            name:"Saurav Singh",
            description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita dolorum, numquam doloremque porro laboriosam quas autem sit quis ex illum soluta id enim facilis temporibus voluptatem laborum beatae dolorem libero debitis vitae doloribus officia sequi distinctio cum! Voluptatum, corporis aperiam!",
            url: "https://www.clipartmax.com/png/small/0-884_big-image-man-and-woman-animated.png"
        },
        {
           title: "Message From Our Convenor Batch 2020",
            name:"Saurav Singh",
            description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita dolorum, numquam doloremque porro laboriosam quas autem sit quis ex illum soluta id enim facilis temporibus voluptatem laborum beatae dolorem libero debitis vitae doloribus officia sequi distinctio cum! Voluptatum, corporis aperiam!",
            url: ""
        },
        {   
            title: "Message From Our Convenor Batch 2021",
            name: "Shubham Chandak",
            description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex, harum quibusdam animi sunt perspiciatis eius, ducimus aliquid neque sit, quisquam sapiente. Nihil, quam! Incidunt magnam sunt minus fugit, ipsum quidem.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam ipsa esse libero numquam consequuntur nam perferendis nesciunt, explicabo illo fugiat. Quidem ipsum voluptas dicta fuga quasi? Ex officiis dolores excepturi?"
        }
    ]

    return (
        <Card sx={{p:15 , bgcolor:"white"}}>
        <Carousel  next={ (next, active) => console.log(`we left ${active}, and are now at ${next}`) }
        prev={ (prev, active) => console.log(`we left ${active}, and are now at ${prev}`)}>
            {
                items.map( (item, i) => <Item key={i} item={item} /> )
            }
        </Carousel>
        </Card>
    )
}

function Item(props)
{
    return (

        <Grid>
              <h1 ><Typography sx={{pl:4}} fontSize="45px">{props.item.title}</Typography></h1>
       



       <Box color="black" column = {6} display="flex">
       <Grid >

            <h2 ><Typography sx={{mt:4,pl:4}} fontSize="30px" fontWeight={600}>{props.item.name}</Typography></h2>
           
            
            <Typography sx={{mb:5,p:4}}>{props.item.description}</Typography>
      
            </Grid>
            <Grid>
            {props.item.url && <img src={props.item.url} alt="Item" height="300px"/>}
            </Grid>
        </Box>
        </Grid>
    )
}