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
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer, Bounce } from 'react-toastify'

export default function ResetPassword() {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate()
    const token = useParams().token
    const [registerFlag, setregisterFlag] = useState(false)

    const onSubmit = async (data) => {
        setregisterFlag(true)
        const obj = {
            token: token,
            password: data.password
        }
        const res = await axios.post("/resetpassword", obj)
        setregisterFlag(false)
        if (res.status == 200) {
            setTimeout(() => {
                toast.success('Password changed successfully!', {
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
            }, 500)
            navigate("/signin")
        } else {
            toast.success('Error occured!Try again', {
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
                        Enter new password
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <TextField
                            label="Password"
                            fullWidth
                            margin="normal"
                            {...register('password', {
                                required: 'password is required',
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
                                    message: "Weak password"
                                }
                            })}
                            error={!!errors.password}
                            helperText={errors.password ? errors.password.message : ''}
                        />
                        <Box mt={2}>
                            <Button type="submit" variant="contained" fullWidth sx={{ backgroundColor: '#667eea' }} disabled={registerFlag}>
                                {registerFlag ? 'Processing...' : 'Reset'}
                            </Button>
                        </Box>
                    </form>
                </Paper>
            </Container>
        </Box>
    );
}
