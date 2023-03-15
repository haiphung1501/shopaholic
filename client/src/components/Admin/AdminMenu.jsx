import React from "react";
import { Link } from "react-router-dom";
import { Grid, Typography, Box, Stack, Divider } from "@mui/material";
import {
    Dashboard as DashboardIcon,
    Person as UsersIcon,
    ShoppingCart as ProductIcon,
    Receipt as OrderIcon,
    RateReview as ReviewsIcon,
} from "@mui/icons-material/";

const AdminMenu = () => {
    return (
        <Grid sx={{ mt: 2 }} container spacing={2} alignItems="center" justifyContent="center">
            <Grid sx={{ borderRight: 1 }} item xs={12} md={2} >
                <Link to="/admin/dashboard" style={{ textDecoration: 'none', color: 'black' }}>
                    <Stack direction="row" alignItems="center" gap={1}>
                        <DashboardIcon />
                        <Typography variant="body1" align="center" component='span' fontWeight='light'>
                            Dashboard
                        </Typography>
                    </Stack>
                </Link>
            </Grid>
            <Grid sx={{ borderRight: 1 }} item xs={12} md={2}>
                <Link to="/admin/users" style={{ textDecoration: 'none', color: 'black' }}>
                    <Stack direction="row" alignItems="center" gap={1}>
                        <UsersIcon />
                        <Typography variant="body1" align="center" component='span'>
                            Users
                        </Typography>
                    </Stack>
                </Link>
            </Grid>
            <Grid sx={{ borderRight: 1 }} item xs={12} md={2}>
                <Link to="/admin/products" style={{ textDecoration: 'none', color: 'black' }}>
                    <Stack direction="row" alignItems="center" gap={1}>
                        <ProductIcon />
                        <Typography variant="body1" align="center" component='span'>
                            Products
                        </Typography>
                    </Stack>
                </Link>
            </Grid>
            <Grid sx={{ borderRight: 1 }} item xs={12} md={2}>
                <Link to="/admin/orders" style={{ textDecoration: 'none', color: 'black' }}>
                    <Stack direction="row" alignItems="center" gap={1}>
                        <OrderIcon />
                        <Typography variant="body1" align="center" component='span'>
                            Orders
                        </Typography>
                    </Stack>
                </Link>
            </Grid>
            <Grid item xs={12} md={2}>
                <Link to="/admin/reviews" style={{ textDecoration: 'none', color: 'black' }}>
                    <Stack direction="row" alignItems="center" gap={1}>
                        <ReviewsIcon />
                        <Typography variant="body1" align="center" component='span'>
                            Reviews
                        </Typography>
                    </Stack>
                </Link>
            </Grid>
        </Grid >

    );
};

export default AdminMenu;
