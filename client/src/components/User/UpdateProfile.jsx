import React from "react";
import { useForm } from "react-hook-form";
import {
    TextField,
    Button,
    Typography,
    Box,
    Grid,
    Snackbar,
    IconButton,
    Avatar,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useState } from 'react';
export default function UpdateProfile() {
    const { user } = useSelector((state) => state.user);
    const [previewImage, setPreviewImage] = useState(null)
    const [avatarUrl, setAvatarUrl] = useState(user.user.avatar.url)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: { username: user.username, email: user.email },
    });
    const [openSnackbar, setOpenSnackbar] = React.useState(false);

    const handlePreviewImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setPreviewImage(null);
        }
    }
    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };

    const handleFormSubmit = (data) => {
        console.log(data)
        setOpenSnackbar(true);
    };

    return (
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: "center"
            }}
        >
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <Grid container spacing={2} >
                    <Grid item xs={12} sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>

                        <Typography variant="h4" fontWeight='bold' gutterBottom>
                            Update Profile
                        </Typography>
                        <input type="file" id="avatar" name="avatar" accept="image/*" style={{ display: 'none' }} {...register('avatar')} onChange={(e) => handlePreviewImage(e)} />
                        <label htmlFor="avatar">
                            <IconButton component="span">
                                <Avatar sx={{ width: 200, height: 200 }} src={previewImage || avatarUrl} />
                            </IconButton>
                        </label>

                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="username"
                            label="Username"
                            {...register("username", { required: true })}
                            fullWidth
                        />
                        <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                            {errors.username && (
                                <Typography variant="caption" color="error">
                                    This field is required.
                                </Typography>
                            )}
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            id="email"
                            label="Email"
                            {...register("email", {
                                required: true,
                                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            })}
                            fullWidth
                        />
                        <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                            {errors.email && errors.email.type === "required" && (
                                <Typography variant="caption" color="error">
                                    This field is required.
                                </Typography>
                            )}
                            {errors.email && errors.email.type === "pattern" && (
                                <Typography variant="caption" color="error" >
                                    Invalid email address.
                                </Typography>
                            )}
                        </Box>
                    </Grid>
                </Grid>
                <Box mt={2}>
                    <Button variant="contained" type="submit">
                        Update Profile
                    </Button>
                </Box>
            </form>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                message="Profile updated"
            />
        </Box >
    );
}
