import React, { useState } from 'react'
import ResponsiveAppBar from '../../layouts/Navbar'
import Sidebar from '../../layouts/Sidebar'
import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'

export const Home = () => {
  const [open, setOpen] = useState(false)
  const data = [
    ["Add Donation", "/user"],
    ["Donations", "donations"],
    ["Requests", "requests"],
  ]

  const data1 = [
    ["Profile","profile"],
    ["Dashboard","dashboard"],
    ["Logout"]
  ]

  const toggleSidebar = () => {
    setOpen(!open)
  }

  return (
    <>
      <ResponsiveAppBar data={data} toggleSidebar={toggleSidebar} data1={data1} user="user" />
      

      <Box sx={{ marginRight: open ? '240px' : '0', transition: 'margin 0.3s' }}>
        <Outlet />
      </Box>
    </>
  )
}
