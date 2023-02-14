import React from 'react'
import { Link } from 'react-router-dom'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea, Container } from '@mui/material';
import ReactStars from "react-rating-stars-component"



export default function Product({ product }) {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    value: product.rating,
    isHalf: true,
    size: window.innerWidth < 600 ? 15 : 20,
  }
  return <>
    <Link to={product._id} style={{ textDecoration: 'none' }}>
      <Card sx={{ height: 400, width: 270, mt: 2 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="150"
            width="150"
            image={product.images[0].url}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h4" component="div">
              {product.name}
            </Typography>
            <Box >
              <ReactStars {...options} component="span" />
              <Typography gutterBottom variant="h6" component="span">
                {product.numOfReviews} Reviews
              </Typography>
            </Box>

            <Typography gutterBottom variant="h6" component="span">
              {product.price}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>

  </>

}
