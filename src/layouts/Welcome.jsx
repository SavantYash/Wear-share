import React, { useEffect, useState } from 'react'
import "../styles/Welcome.css"
import { Box, Typography, Grid, Container, TextField, Button, IconButton, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { Navbar } from './NavbarIndex';
import base from "../assets/Images/Base.jpg"
import about from "../assets/Images/About.webp"
import call from "../assets/Images/call-vector-image.png"
import donation from "../assets/Images/Donation-LOGO.jpg"
import insta from "../assets/Images/Instagram-Logo-PNG.webp"
import location from "../assets/Images/Location.jpg"
import mail from "../assets/Images/Mail-vector-image.png"
import ngo from "../assets/Images/NGO-LOGO.jpg"
import user from "../assets/Images/USER-LOGO.jpg"
import jar from "../assets/Images/th.jpg"
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { toast, ToastContainer, Bounce } from 'react-toastify';


export const Welcome = () => {

    const [stats, setStat] = useState([])


    useEffect(() => {
        setStat([
            {
                label: "Ngo's",
                value: '200+',
                icon: ngo, // Replace with your actual path
            },
            {
                label: 'Users',
                value: '3000+',
                icon: user, // Replace with your actual path
            },
            {
                label: 'Donation',
                value: '10000+',
                icon: donation, // Replace with your actual path
            },
        ])
    }, [])


    const contacts = [
        {
            icon: location, // Update with real paths
            label: 'Address',
            value: '199 west, Street, NY 28001',
        },
        {
            icon: call,
            label: 'Phone',
            value: '+91 9999999999',
        },
        {
            icon: mail,
            label: 'Email',
            value: 'abc@wearshare.com',
        },
        {
            icon: insta,
            label: 'Instagram',
            value: '@Wear-Share',
        },
    ];

    return (
        <>
            <Navbar />
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            <img src={base} style={{ height: '120vh', width: '100%', marginTop: '-20px' }} />

            <Box>

                {/* donor,ngo,donations */}
                <Box
                    sx={{
                        backgroundColor: '#1c1c1e',
                        py: { xs: 6, md: 8 },

                    }}
                >
                    <Container maxWidth="lg">
                        <Grid container spacing={20} justifyContent="center">
                            {
                                stats.map((s, index) => (
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            gap: 2,
                                        }}
                                        key={index}
                                    >
                                        <Box
                                            component="img"
                                            src={s.icon}
                                            alt={s.label}
                                            sx={{
                                                width: 100,
                                                height: 100,
                                                borderRadius: '50%',
                                                backgroundColor: '#292929',
                                                padding: 2,
                                                boxShadow: '0 0 12px rgba(255,255,255,0.15)',
                                            }}
                                        />
                                        <Typography
                                            variant="h6"
                                            color="white"
                                            sx={{ fontWeight: 600, fontSize: '1.25rem' }}
                                        >
                                            {s.label}
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            color="gray"
                                            sx={{ fontSize: '1rem' }}
                                        >
                                            {s.value}
                                        </Typography>
                                    </Box>
                                ))
                            }
                        </Grid>
                    </Container>
                </Box>

                {/* about text */}
                <Box sx={{ py: { xs: 6, md: 8 }, backgroundColor: '#fff' }}>
                    <Container maxWidth="md">
                        <Typography
                            variant="h4"
                            align="center"
                            gutterBottom
                            sx={{ fontWeight: 'bold' }}
                        >
                            About US
                        </Typography>
                        <Typography
                            variant="body1"
                            align="center"
                            sx={{ color: '#333', fontSize: '1.1rem' }}
                        >
                            E-Cloth Donation is a platform that bridges the gap between donors and NGOs by making the process of donating clothes simple, transparent, and effective. We aim to reduce clothing waste and promote sustainable giving by connecting compassionate individuals with organizations that serve those in need.
                        </Typography>
                        <Typography>
                            <Box
                                sx={{
                                    width: '100%',
                                    height: { xs: 250, md: 400 },
                                    backgroundImage: `url(${about})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    borderRadius: '10px',
                                    marginTop: '30px',
                                    marginBottom: '20px'
                                }}
                            />
                        </Typography>
                    </Container>
                </Box>

                {/* about icons */}
                <Box sx={{ bgcolor: '#fff', marginTop: '0' }}>
                    <Container maxWidth="lg" sx={{ mt: 0, pb: 6 }}>
                        <Grid container spacing={20} justifyContent="center">
                            {contacts.map((item, i) => (
                                <Grid item xs={12} sm={6} md={3} key={i}>
                                    <Box
                                        sx={{
                                            textAlign: 'center',
                                            transition: 'transform 0.3s',
                                            '&:hover': {
                                                transform: 'scale(1.05)',
                                            },
                                        }}
                                    >
                                        <Box
                                            component="img"
                                            src={item.icon}
                                            alt={item.label}
                                            sx={{
                                                width: 80,
                                                height: 80,
                                                mb: 1,
                                                borderRadius: '50%',
                                                boxShadow: '0 0 15px rgba(0,0,0,0.3)',
                                                backgroundColor: '#f5f5f5',
                                                padding: 1.5,
                                            }}
                                        />
                                        <Typography
                                            variant="subtitle1"
                                            sx={{ fontWeight: 600, color: '#333' }}
                                        >
                                            {item.label}:
                                        </Typography>
                                        <Typography variant="body1" color="text.secondary">
                                            {item.value}
                                        </Typography>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </Box>

                {/* form */}
                <Box mb={5} sx={{ backgroundColor: '#fff', display: 'flex', justifyContent: 'center' }}>
                    <Box sx={{ py: 8, boxShadow: '0 0 12px rgba(0,0,0,0.3)', width: '80%' }}>
                        <Container maxWidth="lg">
                            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                                Get in touch
                            </Typography>

                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: { xs: 'column', md: 'row' },
                                    alignItems: 'center',
                                    gap: 4,
                                    mt: 4
                                }}
                            >
                                <Box sx={{ flex: 1 }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField fullWidth label="Name" variant="outlined" />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField fullWidth label="Email" variant="outlined" />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField fullWidth label="Subject" variant="outlined" />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Message"
                                                multiline
                                                rows={4}
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                                            <Button variant="contained" sx={{ backgroundColor: '#00BCD4', px: 4 }}>
                                                Send Message
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Box>

                                <Box sx={{ flex: 1, textAlign: 'center' }}>
                                    <img
                                        src={jar}
                                        alt="Thanks for your donations"
                                        style={{ maxWidth: '100%', width: '320px' }}
                                    />
                                </Box>
                            </Box>
                        </Container>
                    </Box>
                </Box>
            </Box>

            {/* footer */}
            <Box bgcolor="#212121" color="white" px={{ xs: 3, sm: 10 }} py={5} sx={{ display: 'flex' }}>
                <Grid item xs={12} sm={6} md={4} sx={{ width: 'fit-content' }}>
                    <Typography variant="h6" gutterBottom>
                        Wear & Share
                    </Typography>
                    <Typography color="gray" paragraph>
                        Bridging the gap between donors and NGOs by making the donation process simple, transparent, and impactful.
                    </Typography>

                    <Grid container spacing={5} mt={5}>
                        <Grid item xs={12} sm={6} md={4}>
                            <Typography variant="h6" gutterBottom>
                                Contact
                            </Typography>
                            <Box display="flex" alignItems="center" mb={1}>
                                <LocationOnIcon sx={{ mr: 1 }} />
                                <Typography color="gray">199 West Street, NY 28001</Typography>
                            </Box>
                            <Box display="flex" alignItems="center" mb={1}>
                                <PhoneIcon sx={{ mr: 1 }} />
                                <Typography color="gray">+91 9999999999</Typography>
                            </Box>
                            <Box display="flex" alignItems="center" mb={1}>
                                <EmailIcon sx={{ mr: 1 }} />
                                <Typography color="gray">abc@wearshare.com</Typography>
                            </Box>
                        </Grid>
                        <Grid>
                            <Typography variant="h6" gutterBottom>
                                Follow Us
                            </Typography>
                            <IconButton href="https://instagram.com" target="_blank" rel="noopener" color="inherit">
                                <InstagramIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>


                <Grid item xs={12} sm={6} md={4} ml={10} sx={{ width: 'fit-content' }}>
                    <Typography variant="h6" gutterBottom>
                        Quick Links
                    </Typography>
                    <Stack spacing={1}>
                        <Link href="/" color="gray" underline="hover">Home</Link>
                        <Link href="/about" color="gray" underline="hover">About Us</Link>
                        <Link href="/contact" color="gray" underline="hover">Contact</Link>
                        <Link href="/donate" color="gray" underline="hover">Donate</Link>
                    </Stack>
                </Grid>
            </Box>
        </>
    )
}