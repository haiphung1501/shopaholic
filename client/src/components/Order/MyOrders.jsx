import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, CircularProgress, Box } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { getAllOrdersReq } from '../../apis/index'
import { useAlert } from 'react-alert';
import { useEffect, useState } from 'react';

function MyOrders() {
    const [loading, setLoading] = useState(false);
    useEffect(() => { }, []);


    const orders = [
        { id: 1, item: 'Product 1', price: 100, status: 'success' },
        { id: 2, item: 'Product 2', price: 200, status: 'declined' },
        { id: 3, item: 'Product 3', price: 300, status: 'processing' },
        { id: 4, item: 'Product 4', price: 400, status: 'success' },
        { id: 5, item: 'Product 5', price: 500, status: 'processing' },
    ];

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
                            <Typography variant="h6">Total Price</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="h6">Status</Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.map((order, index) => (
                        <TableRow key={order.id} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f5f5f5' } }}>
                            <TableCell>{order.id}</TableCell>
                            <TableCell>{order.item}</TableCell>
                            <TableCell>{order.price}</TableCell>
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
                                    {order.status}
                                </Typography>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default MyOrders;
