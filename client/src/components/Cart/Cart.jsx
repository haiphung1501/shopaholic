import { useEffect, useState } from "react";
import {
    Table,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    IconButton,
    Typography,
    Button,
    Box,
    TextField,
    Grid,
} from "@mui/material";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector, useDispatch } from "react-redux";
import { addToCartAction, removeFromCartAction } from "../../features/cart/cartSlice";
import { createOrderAction } from "../../features/order/orderDetailSlice";
import { useNavigate } from 'react-router-dom';


const Cart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.cartItems);
    const { order } = useSelector(state => state.orderDetail)
    const [totalPrice, setTotalPrice] = useState(
        cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)
    );
    const navigate = useNavigate();

    const increaseQtyHandler = (productId, quantity, stock) => {
        const newQty = quantity + 1;
        if (stock <= quantity) {
            return;
        }
        dispatch(addToCartAction(productId, newQty));

    }
    const decreaseQtyHandler = (productId, quantity) => {
        const newQty = quantity - 1;
        if (newQty <= 0) {
            return;
        }
        dispatch(addToCartAction(productId, newQty));
    }
    const removeItemHandler = async (productId) => {
        await dispatch(removeFromCartAction(productId, 0));
    }

    useEffect(() => {
        setTotalPrice(cartItems.reduce((acc, item) => acc + item.qty * item.price, 0));
    }, [cartItems]);

    const checkOutHandler = () => {
        const data = {
            orderItems: cartItems,
            totalPrice,
        }
        dispatch(createOrderAction(data))
        navigate(`/me/order/${order._id}`, { replace: true })
    }

    return (
        <>
            <Typography fontFamily='Roboto Slab' variant="h4" fontWeight='900' sx={{ mt: 2 }}>My Cart</Typography>
            <TableContainer sx={{ mt: 3 }} component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Image</TableCell>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Price</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                            <TableCell align="center">Total Price</TableCell>
                            <TableCell align="center"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cartItems.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell align="center">
                                    <img src={item.image} alt={item.name} height="50" />
                                </TableCell>
                                <TableCell align="center">{item.name}</TableCell>
                                <TableCell align="center">{item.price} đ</TableCell>
                                <TableCell align="center">
                                    <IconButton onClick={() => decreaseQtyHandler(item.product, item.qty)}>
                                        <RemoveIcon />
                                    </IconButton>
                                    {item.qty}
                                    <IconButton onClick={() => increaseQtyHandler(item.product, item.qty, item.stock)} >
                                        <AddIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell align="center">{item.qty * item.price} đ
                                </TableCell>
                                <TableCell align="center">
                                    <IconButton
                                        color="error"
                                        onClick={() => removeItemHandler(item.product)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell colSpan={4}>
                                <Typography variant="h6"></Typography>
                            </TableCell>
                            <TableCell align="center" >
                                <Typography variant="h6" fontWeight='500'>{totalPrice} đ</Typography>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Button onClick={checkOutHandler} variant="contained" sx={{ mt: 2 }}>
                    Checkout
                </Button>
            </Box>

        </>
    );
};

export default Cart;
