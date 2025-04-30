import React, { useState } from 'react'
import ResponsiveAppBar from '../../layouts/Navbar'
import Sidebar from '../../layouts/Sidebar' // <-- your filter sidebar
import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'

export const NgoHome = () => {
  const [open, setOpen] = useState(false)
  const data = [
    ["Donations", "/ngo"],
    ["Requests", "requests"],
    ["History", "history"],
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
      <ResponsiveAppBar data={data} toggleSidebar={toggleSidebar} data1={data1} user="user"/>
      <Sidebar open={open} toggleSidebar={toggleSidebar} />
      <Box sx={{ marginRight: open ? '240px' : '0', transition: 'margin 0.3s' }}>
        <Outlet />
      </Box>
    </>
  )
}
