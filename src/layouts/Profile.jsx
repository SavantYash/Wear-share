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
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProfileView = () => {

    const [data1, setdata] = useState({})
    const navigate = useNavigate()

    const getUser = async () => {
        const res = await axios.get("/getProfileById/" + localStorage.getItem('id'))
        setdata(res.data.data)
        console.log(data1)
    }

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
                        <Box display="flex" flexDirection="column" alignItems="center">
                            <Avatar
                                alt="John Doe"
                                src={data1.imageURL}
                                sx={{ width: 100, height: 100, mb: 2 }}
                            />
                            <Typography variant="h5" fontWeight={600}>
                                {data1.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {data1.email}
                            </Typography>
                        </Box>

                        <Grid container spacing={2} mt={3}>
                            <Grid item xs={12}>
                                <Paper elevation={0} sx={{ p: 1.5 }}>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Phone Number
                                    </Typography>
                                    <Typography variant="body1">+91 {data1.number}</Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12}>
                                <Paper elevation={0} sx={{ p: 1.5 }}>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Address
                                    </Typography>
                                    <Typography variant="body1">
                                        {data1.address}
                                    </Typography>
                                </Paper>
                            </Grid>
                            {data1.registrationNumber ? <Grid item xs={12}>
                                <Paper elevation={0} sx={{ p: 1.5 }}>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Registration no.
                                    </Typography>
                                    <Typography variant="body1">
                                        {data1.registrationNumber}
                                    </Typography>
                                </Paper>
                            </Grid> : ""}
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{ mt: 2, borderRadius: 2, px: 4 }}
                            >
                                Update
                            </Button>

                        </Grid>
                    </CardContent>
                </Card>
            </Box>
        </>
    );
};

export default ProfileView;
