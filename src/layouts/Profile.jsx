import React, { useEffect, useState } from 'react';
import {
    Avatar,
    Box,
    Card,
    CardContent,
    Typography,
    Grid,
    Button,
    AppBar,
    Toolbar,
    TextField,
} from '@mui/material';
import axios from 'axios';
import { data, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer, Bounce } from 'react-toastify'

const ProfileView = () => {
    const [profilePic, setProfilePic] = useState(null);
    const [preview, setPreview] = useState(null);
    const navigate = useNavigate();

    const { register, handleSubmit, reset } = useForm();

    const getUser = async () => {
        const res = await axios.get("/getProfileById/" + localStorage.getItem('id'));
        const userData = res.data.data;
        reset(userData); // Set form default values
        if (userData?.imageUrl) {
            setPreview(userData.imageUrl);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setProfilePic(file);
        setPreview(URL.createObjectURL(file));
    };

    const onSubmit = async (formData) => {
        const res = await axios.put("/updateuser/" + localStorage.getItem('id'), formData)
        if (res.status == 200) {
            toast.info('Profile updated!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
                });
        }
        getUser()
    };

    useEffect(() => {
        getUser();
    }, []);

    return (
        <>
            <AppBar position="static">
                <ToastContainer
                    position="top-right"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover={false}
                    theme="dark"
                    transition={Bounce}
                />
                <Toolbar>
                    <Button
                        color="inherit"
                        onClick={() =>
                            navigate(
                                localStorage.getItem("role") === "donor"
                                    ? "/user"
                                    : localStorage.getItem("role") === "ngo"
                                        ? "/ngo"
                                        : "/v"
                            )
                        }
                    >
                        Home
                    </Button>
                </Toolbar>
            </AppBar>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: 'calc(100vh - 60px)',
                    padding: 2,
                    width: '100vw',
                }}
            >
                <Card
                    sx={{
                        width: '100%',
                        maxWidth: 500,
                        borderRadius: 4,
                        boxShadow: 4,
                        p: 2,
                    }}
                >
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Box display="flex" flexDirection="column" alignItems="center">
                                <Avatar
                                    src={preview}
                                    sx={{ width: 100, height: 100, marginBottom: 1 }}
                                />
                                <Button variant="outlined" component="label">
                                    Upload Photo
                                    <input
                                        type="file"
                                        hidden
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />
                                </Button>
                            </Box>
                            <TextField
                                label="Name"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                {...register("name")}
                            />
                            <TextField
                                label="Email"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                {...register("email")}
                            />
                            <TextField
                                label="Phone Number"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                {...register("number")}
                            />
                            <TextField
                                label="Address"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                {...register("address")}
                            />
                            {/* {
                                
                                <TextField
                                    label="Registration No."
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    {...register("registrationNumber")}
                                />
                            } */}

                            <Grid container justifyContent="center">
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    sx={{ mt: 3, borderRadius: 2, px: 4 }}
                                >
                                    Update
                                </Button>
                            </Grid>
                        </form>
                    </CardContent>
                </Card>
            </Box>
        </>
    );
};

export default ProfileView;
