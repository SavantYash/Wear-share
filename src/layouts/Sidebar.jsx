import React from 'react'
import { Drawer, Box, Typography, Checkbox, FormControlLabel } from '@mui/material'

const Sidebar = ({ open, toggleSidebar, data1 }) => {
  return (
    <Drawer
      variant="persistent"
      anchor="right"
      open={open}
      onClose={toggleSidebar}
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6">Filters</Typography>
        <FormControlLabel control={<Checkbox />} label="T-Shirts" />
        <FormControlLabel control={<Checkbox />} label="Jeans" />
        <FormControlLabel control={<Checkbox />} label="Jackets" />
      </Box>
    </Drawer>
  )
}

export default Sidebar
