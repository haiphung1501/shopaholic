import React, { useEffect } from 'react'
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { productDetailRequest, productDetailSuccess, productDetailFailed } from './productDetailSlice'
import { useAlert } from 'react-alert'
import { getProductDetailReq } from '../../apis'
import { useParams } from 'react-router-dom'

// function Item(props) {
//     return (

//     )
// }


export default function ProductDetail() {
    const dispatch = useDispatch();
    const { id } = useParams();
    console.log(id);
    const alert = useAlert();
    const { product, loading, error } = useSelector(state => state.productDetail)

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



    return (
        <React.Fragment>
            <div className='productDetail'>
                <div>
                    <h2>Test</h2>
                </div>
            </div>
        </React.Fragment>
    )
}
