import React from 'react'
import {
    Container,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Typography,
    Paper,
    IconButton,
    Box,
    Grid
} from '@mui/material'
import { useSelector } from 'react-redux'
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';

export default function AdminProducts() {
    const { products } = useSelector(state => state.product)
    console.log(products)
    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>

            <Grid container justifyContent="flex-end">
                <IconButton>
                    <Link to="/admin/products/new">
                        <AddIcon />
                    </Link>
                </IconButton>
            </Grid>


            <TableContainer sx={{ mt: 3 }} component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ pl: 5, width: '250px' }}>Product ID</TableCell>
                            <TableCell >Name</TableCell>
                            <TableCell align="center">Stock</TableCell>
                            <TableCell align="center">Price</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell sx={{ pl: 5 }}>
                                    {item._id}
                                </TableCell>
                                <TableCell >{item.name}</TableCell>
                                <TableCell align="center">{item.qty} đ</TableCell>
                                <TableCell align="center">
                                    {item.price}
                                </TableCell>
                                <TableCell align="center" sx={{ p: 0 }}>
                                    <IconButton size='small'>
                                        <Link>
                                            <EditIcon size='small' />
                                        </Link>
                                    </IconButton>
                                    <IconButton size='small'>
                                        <Link>
                                            <DeleteIcon size='small' />
                                        </Link>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )
}
