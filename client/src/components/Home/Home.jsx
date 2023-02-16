import { Box, Card, Grid, Typography } from '@mui/material'
import React, { Fragment } from 'react'
import Product from '../Product/ProductCard'
import Loader from '../layout/Loader'
import { useSelector, useDispatch } from 'react-redux'
// import productSlice from '../Product/productSlice'
import { allProductFailed, allProductRequest, allProductSuccess, clearError } from '../Product/productSlice'
import { getAllProductReq } from '../../apis'
import { useEffect } from 'react'
import { useAlert } from 'react-alert'
import ProductCard from '../Product/ProductCard'


export default function Home() {

    const dispatch = useDispatch()
    const alert = useAlert()
    const { productsCount, products, loading, error } = useSelector(state => state.product)

    console.log(products)

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

        <Grid container sx={{ justifyContent: 'space-between' }}>
            {
                products && products.map((product, index) => {
                    return (
                        <ProductCard key={index} product={product} />
                    )
                })
            }

        </Grid>
    </Fragment>
}
