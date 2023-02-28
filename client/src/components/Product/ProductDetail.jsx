import React, { useEffect, useState } from 'react'
import Carousel from 'react-material-ui-carousel'
import { Paper, Button, Box, Grid, Typography, IconButton, TextField } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { productDetailRequest, productDetailSuccess, productDetailFailed } from '../../features/product/productDetailSlice'
import { useAlert } from 'react-alert'
import { getProductDetailReq } from '../../apis'
import { useParams } from 'react-router-dom'
import ReactStars from 'react-rating-stars-component'
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ReviewCard from './ReviewCard'
import Loader from '../layout/Loader'
import { addToCartAction } from '../../features/cart/cartSlice'


export default function ProductDetail() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const alert = useAlert();
    const { product, loading, error } = useSelector(state => state.productDetail)
    const [quantity, setQuantity] = useState(1);

    const decreaseQuantity = () => {
        if (quantity > 1) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
        }
        else {
            setQuantity(1)
        }
    }
    const increaseQuantity = () => {
        if (quantity >= product.stock)
            return alert.error(`The maximum quantity you can add is ${product.stock}`);
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
    }
    const addToCartHandler = () => {
        dispatch(addToCartAction(id, quantity))
        alert.success('Product added to cart')
    }
    useEffect(() => {
        if (error) { return alert.error(error) }
        dispatch(productDetailRequest())
        getProductDetailReq(id)
            .then(({ data }) => {
                dispatch(productDetailSuccess(data))
            })
            .catch((error) => {
                dispatch(productDetailFailed(error))
            })
    }, [dispatch, error, alert, id])

    const options = {
        edit: true,
        color: "rgba(20,20,20,0.1)",
        activeColor: "tomato",
        value: product.rating,
        isHalf: true,
        size: window.innerWidth < 600 ? 15 : 20,
    }

    if (loading) return (<Loader />)
    return (
        <React.Fragment>
            <Box sx={{ mt: 5 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={5}>
                        <Carousel>
                            {product.images && product.images.map((image, index) => {
                                return (
                                    <Box
                                        key={index}
                                        component="img"
                                        sx={{
                                            height: 450,
                                            width: 450,
                                            maxHeight: { xs: 450, md: 450 },
                                            maxWidth: { xs: 450, md: 450 },
                                        }}
                                        alt={image.public_id}
                                        src={image.url}
                                    />
                                )
                            })}
                        </Carousel>
                    </Grid>
                    <Grid item xs={12} md={7}>
                        <Typography variant='h4' fontWeight='bold'>
                            {product.name}
                        </Typography>
                        <Box sx={{ borderTop: 1, pt: 2 }} display='flex'>
                            <ReactStars {...options} component="span" />
                            <Typography sx={{ pl: 1 }} gutterBottom variant="h6" component="span" fontWeight='light' fontStyle='italic'>
                                {product.numOfReviews} Reviews
                            </Typography>
                        </Box>
                        <Typography fontWeight='bold' variant='h5' sx={{ pb: 2 }}>
                            {`${product.price} VNĐ`}
                        </Typography>
                        <Box display='flex' alignItems='center'>
                            <IconButton onClick={decreaseQuantity}>
                                <RemoveIcon />
                            </IconButton>
                            <TextField
                                label="Number"
                                value={quantity}
                                size='small'
                                sx={{ width: 100 }}
                            />
                            <IconButton onClick={increaseQuantity}>
                                <AddIcon />
                            </IconButton>
                        </Box>
                        <Typography sx={{ mt: 3 }} fontStyle='italic' fontWeight='bold' color={product.stock > 0 ? 'primary' : 'red'} >
                            {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                        </Typography>
                        <Button onClick={addToCartHandler} sx={{ borderRadius: '20px', mt: 3 }} variant='outlined' endIcon={<AddShoppingCartIcon />}>
                            Add to Cart
                        </Button>
                        <Box sx={{ mt: 3 }}>
                            <Typography fontWeight='bold'>
                                Description
                            </Typography>
                            <Typography sx={{ ml: 2 }}>
                                {product.description}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ borderTop: 1, mt: 5 }}>
                <Grid container spacing={2}>
                    <Grid sx={{ mt: 1 }} item xs={12} md={8}>
                        <Typography fontWeight='bold' align='center' variant='h4'> REVIEWS </Typography>
                        <Box>
                            {product.reviews && product.reviews.map((review, index) => {
                                return (
                                    <ReviewCard key={index} review={review} />
                                )
                            })}
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                    </Grid>
                </Grid>
            </Box>
        </React.Fragment >
    )
}
