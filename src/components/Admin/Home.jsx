import React, { useEffect, useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import AdbIcon from '@mui/icons-material/Adb';
import { ToastContainer, Bounce } from 'react-toastify'
import axios from 'axios';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import ResponsiveAppBar from '../../layouts/Navbar';

export const AdminHome = () => {

    const [user, setUser] = useState({})

    //navlinks
    const data = [
        ['Dashboard','/admin'],
        ['Donors','donors'],
        ['Ngos','ngos'],
        ['Volunteers','volunteer'],
        ['Donations','donations']
    ]
    
    const data1 = [
        ['Profile'],
        ['Dashboard'],
        ['Logout']
    ]

    useEffect(() => {
        axios.get("/getProfileById/" + localStorage.getItem('id'))
            .then((res) => { setUser(res.data.data) })
            .catch((err)=>{console.log(err)})
    }, [])


    return (
        <>
            <ResponsiveAppBar data={data} data1={data1} user="admin"/>
            <Box>
                <h1>Welcome {user?.name}</h1>
                <Outlet key={location.pathname} user={user?.name}></Outlet>
            </Box>
        </>
    )
}
