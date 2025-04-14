import React, { useEffect, useState } from 'react';
import {
    Avatar,
    Box,
    Card,
    CardContent,
    Typography,
    Grid,
    Paper,
    Button,
    AppBar,
    Toolbar,
    TextField,
    Input,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const ProfileView = () => {

    const [data1, setdata] = useState({})
    const [profilepic, setProfilePic] = useState(null)
    const [preview, setPreview] = useState(null)
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm()


    const getUser = async () => {
        const res = await axios.get("/getProfileById/" + localStorage.getItem('id'))
        setdata(res.data.data)
        console.log(res.data.data)
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setProfilePic(file);
        setPreview(URL.createObjectURL(file));
    };

    useEffect(() => {
        getUser()
    }, [])


    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Button
                        color="inherit"
                        onClick={() => data1.roleName == "donor" ? navigate("/user") : data1.roleName == "ngo" ? navigate("/ngo") : navigate("/v")}
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
                    width: '100vw'
                }}
            >
                <Card
                    sx={{
                        width: '100%',
                        maxWidth: 400,
                        borderRadius: 4,
                        boxShadow: 4,
                    }}
                >
                    <CardContent>
                        <form>
                            <Box display="flex" flexDirection="column" alignItems="center">
                                <Grid item xs={12} textAlign="center">
                                    <Avatar
                                        src={preview == null ? data1?.imageUrl : preview}
                                        sx={{ width: 100, height: 100, margin: "auto" }}
                                    />
                                    <Button variant="outlined" component="label" sx={{ mt: 1 }}>
                                        Upload Photo
                                        <input
                                            type="file"
                                            hidden
                                            accept="image/*"
                                            onChange={handleFileChange}
                                        />
                                    </Button>
                                </Grid>
                                <br />
                                {/* <Typography variant="h5" fontWeight={600}>
                                {data1.name}
                            </Typography> */}
                                <TextField
                                    label="name"
                                    name="name"
                                    value={data1.name}
                                    onChange=""
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    {...register("name")}
                                />
                                <TextField
                                    label="email"
                                    name="email"
                                    value={data1.email}
                                    onChange=""
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    {...register("email")}
                                />
                                <TextField
                                    label="number"
                                    name="number"
                                    value={data1.number}
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    {...register("number")}
                                />
                                {
                                    data1?.registrationNumber ? <TextField
                                        label="Reg. No."
                                        name="RegistationNo"
                                        value={data1.registrationNumber}
                                        onChange=""
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        {...register("registrationNumber")}
                                    /> : null
                                }
                            </Box>

                            <Grid container spacing={2} mt={1} className="d-flex justify-content-center">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{ mt: 2, borderRadius: 2, px: 4 }}
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
