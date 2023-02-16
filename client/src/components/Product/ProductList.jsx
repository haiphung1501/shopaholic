import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { allProductFailed, allProductRequest, allProductSuccess, clearError } from './productSlice'
import { getAllProductReq, getAllCategory } from '../../apis'
import { useAlert } from 'react-alert'
import { Slider, Grid, Typography, Pagination, FormGroup, FormControlLabel, Checkbox, Select, MenuItem, FormControl, Box } from '@mui/material'
import ProductCard from './ProductCard'
import { useParams } from 'react-router-dom'
import Loader from '../layout/Loader'

const pageSize = 6;

export default function ProductList() {
    const [page, setPage] = useState(1);
    const [categories, setCategories] = useState([])
    const [totalPage, setTotalPage] = useState(1);
    const [displayedProduct, setDisplayedProduct] = useState([]);
    const [filters, setFilters] = useState({
        rating: null,
        price: null,
        category: [],
        sort: 'newest'
    });
    const [sort, setSort] = useState('')

    const dispatch = useDispatch()
    const { keyword } = useParams()
    const alert = useAlert()
    const { productsCount, products, loading, error } = useSelector(state => state.product)

    useEffect(() => {
        getAllCategory()
            .then(({ data }) => {
                setCategories(data.categories);
            })
    }, [])

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


    useEffect(() => {
        const startIndex = (page - 1) * pageSize;
        const endIndex = page * pageSize;
        if (products) {
            const filteredProducts = applyFilters(products, filters);

            const productsToDisplay = filteredProducts.slice(startIndex, endIndex);
            setDisplayedProduct(productsToDisplay);
            setTotalPage(Math.ceil(products.length / pageSize));
        }
    }, [page, products, filters])

    const applyFilters = (products, filters) => {
        let filteredProducts = products;
        if (filters.rating) {
            filteredProducts = filteredProducts.filter(product => product.rating >= filters.rating);
        }
        if (filters.price) {
            filteredProducts = filteredProducts.filter(product => product.price >= filters.price[0] && product.price <= filters.price[1]);
        }
        if (filters.category && filters.category.length > 0) {
            filteredProducts = filteredProducts.filter(product => filters.category.includes(product.category));
        }
        return filteredProducts;
    }


    const handleTest = (e) => {
        if (e.target.checked)
            setFilters({ ...filters, category: [...filters.category, e.target.value] })
        else {
            setFilters({ ...filters, category: filters.category.filter(category => category !== e.target.value) })
        }
    }
    if (loading) return <Loader />
    return (
        <>
            <Grid sx={{ mt: 3 }} container spacing={2}>
                <Grid item xs={2}>
                    <Typography fontWeight='bold' variant='h5' >
                        Price
                    </Typography>
                    <Slider
                        getAriaLabel={() => 'Minimum distance'}
                        valueLabelDisplay="auto"
                    />
                    <Typography fontWeight='bold' variant='h5' >
                        Categories
                    </Typography>
                    <FormControl>
                        {
                            categories && categories.map((category, index) => {
                                return (
                                    <FormControlLabel value={category} onChange={(e) => handleTest(e)} key={index} control={<Checkbox />} label={category} />
                                )
                            })
                        }
                    </FormControl>
                    <Box>
                        <FormControl fullWidth>
                            <Select value={sort} onChange={(e) => setSort(e.target.value)}>
                                <MenuItem value="price-low-to-high">Price: Low to High</MenuItem>
                                <MenuItem value="price-high-to-low">Price: High to Low</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Grid>
                <Grid item xs={10}>
                    <Typography variant='h4' fontWeight='bold'>
                        Products
                    </Typography>
                    <Grid container spacing={2} sx={{ mt: 3 }}>
                        {
                            displayedProduct && displayedProduct.map((product, index) => {
                                return (
                                    <Grid key={index} item >
                                        <ProductCard product={product} />
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                    <Grid container sx={{ my: 3, display: 'flex', justifyContent: 'center' }}>
                        <Pagination
                            count={totalPage}
                            page={page}
                            onChange={(e, value) => setPage(value)}
                        />
                    </Grid>
                </Grid>

            </Grid>

        </>
    )
}
