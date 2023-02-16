import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { allProductFailed, allProductRequest, allProductSuccess, clearError } from './productSlice'
import { getAllProductReq, getProductQueryReq } from '../../apis'
import { useAlert } from 'react-alert'
import { Grid, Typography } from '@mui/material'
import ProductCard from './ProductCard'
import { useParams } from 'react-router-dom'
export default function ProductList() {
    const dispatch = useDispatch()
    const { keyword } = useParams()
    const alert = useAlert()
    const { productsCount, products, loading, error } = useSelector(state => state.product)

    console.log(keyword)
    useEffect(() => {
        if (error) { return alert.error(error); }
        dispatch(allProductRequest())
        getAllProductReq(keyword)
            .then(({ data }) => {
                dispatch(allProductSuccess(data))
            })
            .catch((error) => {
                dispatch(allProductFailed(error))
            })
    }, [dispatch, error, alert, keyword])

    return (
        <>
            <Typography variant='h4' fontWeight='bold'>
                Products
            </Typography>
            <Grid container spacing={2} sx={{ mt: 3 }}>
                {
                    products && products.map((product, index) => {
                        return (
                            <Grid item xs={12} sm={6} md={4} lg={3}>
                                <ProductCard key={index} product={product} />
                            </Grid>
                        )
                    })
                }
            </Grid>
        </>
    )
}
