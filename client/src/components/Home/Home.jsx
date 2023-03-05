import { Box, Card, Grid, Typography } from '@mui/material'
import React, { Fragment } from 'react'
import Product from '../Product/ProductCard'
import Loader from '../layout/Loader'
import { useSelector, useDispatch } from 'react-redux'
// import productSlice from '../Product/productSlice'
import { allProductFailed, allProductRequest, allProductSuccess, clearError } from '../../features/product/productSlice'
import { getAllProductReq } from '../../apis'
import { useEffect } from 'react'
import { useAlert } from 'react-alert'
import ProductCard from '../Product/ProductCard'


export default function Home() {

    const dispatch = useDispatch()
    const alert = useAlert()
    const { products, loading, error } = useSelector(state => state.product)

    useEffect(() => {
        if (error) { return alert.error(error); }
        dispatch(allProductRequest())
        getAllProductReq()
            .then(({ data }) => {
                dispatch(allProductSuccess(data))
            })
            .catch((error) => {
                dispatch(allProductFailed(error))
            })
    }, [dispatch, error, alert])

    if (loading) return <Loader />
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

        <Grid container spacing={2} sx={{ mt: 3 }}>
            {
                products && products.map((product, index) => {
                    return (
                        <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                            <ProductCard product={product} />
                        </Grid>
                    )
                })
            }
        </Grid>
    </Fragment>
}
