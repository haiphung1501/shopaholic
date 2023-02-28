import { useState } from "react";
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


const Cart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.cartItems);
    const [totalPrice, setTotalPrice] = useState(
        cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)
    );

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
        setTotalPrice(
            cartItems.filter((item) => item.id !== productId)
                .reduce((acc, item) => acc + item.qty * item.price, 0)
        );

        console.log(totalPrice);
    }

    return (
        <>
            <TableContainer component={Paper}>
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
                                    <IconButton onClick={() => decreaseQtyHandler(item.id, item.qty)}>
                                        <RemoveIcon />
                                    </IconButton>
                                    {item.qty}
                                    <IconButton onClick={() => increaseQtyHandler(item.id, item.qty, item.stock)} >
                                        <AddIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell align="center">{item.qty * item.price} đ
                                </TableCell>
                                <TableCell align="center">
                                    <IconButton
                                        color="error"
                                        onClick={() => removeItemHandler(item.id)}
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
            <Button variant="contained" sx={{ mt: 2 }}>
                Checkout
            </Button>
        </>
    );
};

export default Cart;
