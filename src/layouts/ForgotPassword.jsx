import React from 'react';
import { useForm } from 'react-hook-form';
import {
    Container,
    TextField,
    Button,
    Box,
    Typography,
    Paper,
    AppBar,
    Toolbar,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer, Bounce } from 'react-toastify'

export default function ForgotPassword() {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate()
    const [registerFlag, setregisterFlag] = useState(false)

    const onSubmit = async (data) => {
        setregisterFlag(true)
        await axios.post("/forgotpassword", data)
        setTimeout(() => {
            toast.success('Email sent successfully!', {
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
        }, 1000)
        setregisterFlag(false)
        navigate("/signin")
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: 'linear-gradient(to right, #74ebd5, #ACB6E5)',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {/* Navbar */}
            <AppBar position="static" sx={{ background: 'linear-gradient(to right, #4facfe, #00f2fe)' }}>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        WEARSHARE
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Typography variant="button">HOME</Typography>
                        <Typography variant="button">SIGN IN</Typography>
                        <Typography variant="button">REGISTER</Typography>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Email Form Card */}
            <Container
                maxWidth="sm"
                sx={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Paper elevation={6} sx={{ p: 4, borderRadius: 3, width: '100%', maxWidth: 400 }}>
                    <Typography variant="h5" align="center" gutterBottom>
                        Enter Your Email
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <TextField
                            label="Email"
                            fullWidth
                            margin="normal"
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: 'Enter a valid email address',
                                },
                            })}
                            error={!!errors.email}
                            helperText={errors.email ? errors.email.message : ''}
                        />
                        <Box mt={2}>
                            <Button type="submit" variant="contained" fullWidth sx={{ backgroundColor: '#667eea' }} disabled={registerFlag}>
                                {registerFlag ? 'Processing...' : 'Submit'}
                            </Button>
                        </Box>
                    </form>
                </Paper>
            </Container>
        </Box>
    );
}
