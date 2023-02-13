import { Box, Card, Grid, Typography } from '@mui/material'
import React, {Fragment} from 'react'
import Product from '../Product/Product'

const products = [
    {
        name: "Laptop",
        image: [{url: "https://thumbs.dreamstime.com/b/laptop-computer-blank-white-screen-mobile-table-cafe-background-139812612.jpg"}],
        price: "5000",
        _id: "test",
    },
    {
        name: "Iphone",
        image: [{url: "https://bizweb.dktcdn.net/100/442/323/products/e4abf089-6630-43c0-aabb-e69399017c86.jpg?v=1641454565693"}],
        price: "15000",
        _id: "testlanhai",
    }
]

export default function Home() {
  return <Fragment>
    <Box>
        <Typography color="primary" pt={2} variant="h1" align="center" fontWeight="bold">
            SHOPAHOLIC
        </Typography>
        <Typography variant="h5" align="center">
            The only website you need to buy things
        </Typography>
    </Box>
    <Typography pt={10} variant="h5">
        Items of the day
    </Typography>

    <Grid container sx={{justifyContent: 'space-between'}}>
        {/* {
            products.map((product, index) => {
                return (
                    <Product key={index} product={product}/>
                )
            }),
        } */}
        <Product product={products[0]}/>
        <Product product={products[0]}/>
        <Product product={products[0]}/>
        <Product product={products[0]}/>
        <Product product={products[0]}/>
    </Grid>
  </Fragment>
}
