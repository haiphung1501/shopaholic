import { IconButton, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, CircularProgress, Box } from '@mui/material';
import React from 'react';
import { useAlert } from 'react-alert';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllOrders } from '../../features/order/orderSlice';
import moment from 'moment';
import DeleteIcon from '@mui/icons-material/Delete';


function MyOrders() {
    const dispatch = useDispatch();
    const { loading, error, orders } = useSelector(state => state.orders)
    useEffect(() => {
        dispatch(getAllOrders());
    }, [dispatch]);

    console.log(orders.orders);
    if (loading) return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '40vh',
        }}>
            <CircularProgress />
        </Box>
    )
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Typography variant="h6">Order ID</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="h6">Order Item</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="h6">Create At</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="h6">Status</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="h6">Total</Typography>
                        </TableCell>
                        <TableCell size='small'>

                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.orders.map((order, index) => (
                        <TableRow key={order._id} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f5f5f5' } }}>
                            <TableCell>
                                <Link to={`/me/order/${order._id}`} style={{ textDecoration: 'none', color: 'black' }}>
                                    <Typography variant='body2' noWrap overflow="hidden" textOverflow="ellipsis" fontWeight='500'>
                                        {order._id.slice(0, 10)}...
                                    </Typography>
                                </Link>
                            </TableCell>
                            <TableCell>
                                <Typography variant='body2' noWrap overflow="hidden" textOverflow="ellipsis">
                                    {order.orderItems[0] ? order.orderItems[0].name + ',' : ''}
                                    {order.orderItems[1] ? ' ' + order.orderItems[1].name + ',' : ' '}
                                    ...
                                </Typography>
                            </TableCell>

                            <TableCell>{moment(order.createAt).format('DD-MM-YYYY')}</TableCell>
                            <TableCell align='center'>
                                <Typography variant="body1"
                                    sx={{
                                        textTransform: 'capitalize',
                                        fontWeight: 500,
                                        border: 1,
                                        borderRadius: 4,
                                        width: 130,
                                        color: 'white',
                                        bgcolor: order.status === 'success' ? 'green' : order.status === 'declined' ? 'red' : 'primary.main',
                                    }}
                                >
                                    {order.orderStatus}
                                </Typography>
                            </TableCell>
                            <TableCell>{order.totalPrice} đ</TableCell>
                            <TableCell align="center">
                                <IconButton
                                    color="error"
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default MyOrders;
