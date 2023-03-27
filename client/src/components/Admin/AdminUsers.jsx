import React, { useState, useEffect } from 'react'
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
    Grid,
    Backdrop,
    CircularProgress,
    Snackbar
} from '@mui/material'
import { useSelector } from 'react-redux'
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { adminGetAllUsers, adminDeleteUser } from '../../features/user/userSlice';

export default function AdminUsers() {
    const dispatch = useDispatch()
    const [deleting, setDeleting] = useState(false)
    const [snackbarOpen, setSnackbarOpen] = useState(false)


    const { users, loading } = useSelector(state => state.user)

    const onDeleteHandler = async (id) => {
        try {
            setDeleting(true)
            await dispatch(adminDeleteUser(id))
            await dispatch(adminGetAllUsers())
            setDeleting(false)
            setSnackbarOpen(true)
        } catch (error) {
            console.log(error)
        }
    }
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
                            <TableCell sx={{ pl: 5, width: '250px' }}>User ID</TableCell>
                            <TableCell >Email</TableCell>
                            <TableCell >Name</TableCell>
                            <TableCell align="center">Role</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell sx={{ pl: 5 }}>
                                    {item._id}
                                </TableCell>
                                <TableCell >{item.email}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell align="center">
                                    <Typography variant="subtitle"
                                        sx={{
                                            textTransform: 'capitalize',
                                            fontWeight: 500,
                                            width: 130,
                                            color: item.role === 'admin' ? 'primary.main' : item.role === 'block' ? 'red' : 'green',
                                        }}
                                    >
                                        {item.role}
                                    </Typography>
                                </TableCell>
                                <TableCell align="center" sx={{ p: 0 }}>
                                    <IconButton size='small'>
                                        <Link>
                                            <EditIcon size='small' />
                                        </Link>
                                    </IconButton>
                                    <IconButton onClick={() => { onDeleteHandler(item._id) }} size='small'>
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
            <Backdrop open={deleting} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                message="User deleted successfully"
            />
        </Container>
    )
}
