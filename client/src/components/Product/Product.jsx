import React from 'react'
import { Link } from 'react-router-dom'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea, Container } from '@mui/material';
import ReactStars from "react-rating-stars-component"


const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    value: 2.5,
    isHalf: true,
    size: window.innerWidth < 600 ? 15 : 20,
}
export default function Product({product}) {
  return <>
    <Card sx={{ width: 270, mt: 2 }}>
      <CardActionArea>
            <CardMedia
            component="img"
            height= "150"
            width="150"
            image={product.image[0].url}
            alt="green iguana"
            />
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            {product.name}
          </Typography>
            <ReactStars {...options}/>
            <Typography gutterBottom variant="h6" component="span">
            {product.price}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>

    <Link href="/hello" className='productCard' to={product._id}>
    </Link>
  </>

}
