// Navbar.jsx
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    AppBar, Box, CssBaseline, Divider, Drawer,
    IconButton, List, ListItem, ListItemButton, ListItemText,
    Toolbar, Typography, Button
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export const Navbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const drawerWidth = 240;
    const location = useLocation()

    const [navItems, setnavItems] = useState([])

    useEffect(() => {
        if (location.pathname == "/") {
            setnavItems([
                ['About', 'about'],
                ['Contact', 'contact'],
                ['Sign In', 'signin'],
                ['Register', 'signup']
            ])
            console.log(navItems)
        } else {
            setnavItems([
                ['Home', ''],
                ['Sign In', 'signin'],
                ['Register', 'signup']
            ])
            console.log(navItems)
        }
    }, [location.pathname])

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <Box sx={{ textAlign: 'center', backgroundColor: '#f8fafc', height: '100%', color: '#0f172a' }}>
            <Typography variant="h6" sx={{ my: 2, fontWeight: 'bold' }}>
                WEARSHARE
            </Typography>
            <Divider sx={{ bgcolor: '#475569' }} />
            <List>
                {navItems.map(([name, link], index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton
                            sx={{ textAlign: 'center' }}
                            component={link === 'about' || link === 'contact' ? 'a' : Link}
                            to={link !== 'about' && link !== 'contact' ? `/${link}` : undefined}
                            href={link === 'about' || link === 'contact' ? `#${link}` : undefined}
                        >
                            <ListItemText primary={name} sx={{ color: '#0f172a' }} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                component="nav"
                position="fixed"
                sx={{
                    background: 'linear-gradient(to right, #4c6ef5, #66d3d3)',
                    color: '#fff',
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, fontWeight: 'bold' }}
                    >
                        WEARSHARE
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {navItems.map(([name, link], index) => (
                            (link === 'about' || link === 'contact') ? (
                                <a key={index} href={`#${link}`} style={{ textDecoration: 'none' }}>
                                    <Button sx={{ color: '#f1f5f9', mx: 1 }}>{name}</Button>
                                </a>
                            ) : (
                                <Link key={index} to={`/${link}`} style={{ textDecoration: 'none' }}>
                                    <Button sx={{ color: '#f1f5f9', mx: 1 }}>{name}</Button>
                                </Link>
                            )
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>

            <Box component="nav">
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                        },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
        </Box>
    );
};
