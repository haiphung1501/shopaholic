import React from 'react';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Divider, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import MyOrders from '../Order/MyOrders';
const Profile = () => {
    const { user } = useSelector((state) => state.user);
    return (
        <>
            <Grid container spacing={2} sx={{ mt: 4 }}>
                <Grid sx={{}} item xs={12} md={4}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Avatar sx={{ width: 200, height: 200, mt: 4 }} src={user.user.avatar.url} />
                    </Box>
                </Grid>
                <Grid sx={{}} item xs={12} md={8}>
                    <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h6" gutterBottom>
                            Username
                        </Typography>
                        <Typography style={{ marginTop: "-3px", marginBottom: "-1px" }} sx={{ color: 'grey' }} variant="subtitle1" gutterBottom>
                            {user.user.name}
                        </Typography>
                        <Divider />
                        <Typography variant="h6" gutterBottom>
                            Email
                        </Typography>
                        <Typography style={{ marginTop: "-3px", marginBottom: "-1px" }} sx={{ color: 'grey' }} variant="subtitle1" gutterBottom>
                            {user.user.email}
                        </Typography>
                        <Divider />
                        <Button variant="contained" color="primary" sx={{ textTransform: "none", mt: 2, px: 1, width: 150, whiteSpace: 'nowrap' }}>
                            Change Password
                        </Button>
                    </Box>
                </Grid>

            </Grid>
            <Typography variant="h6" sx={{ mt: 4 }}>
                My Orders
            </Typography>
            <MyOrders />
        </>

    );
};

export default Profile;