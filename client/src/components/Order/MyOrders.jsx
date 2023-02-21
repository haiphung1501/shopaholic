import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React from 'react';

function MyOrders() {

    const orders = [
        { id: 1, item: 'Product 1', price: 100, status: 'success' },
        { id: 2, item: 'Product 2', price: 200, status: 'declined' },
        { id: 3, item: 'Product 3', price: 300, status: 'in progress' },
        { id: 4, item: 'Product 4', price: 400, status: 'success' },
        { id: 5, item: 'Product 5', price: 500, status: 'in progress' },
    ];

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
                            <TableCell>
                                <Typography
                                    variant="subtitle1"
                                    sx={{
                                        color: order.status === 'success' ? 'green' : order.status === 'declined' ? 'red' : 'yellow',
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
