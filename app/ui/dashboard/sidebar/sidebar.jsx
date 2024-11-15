"use client"
import { Divider,Box, Typography } from '@mui/material'

export const Sidebar = () => {
  return (
    <Box
      sx={{
        width: 250,
        height: '100vh', // Full height of the viewport
        backgroundColor: '#f0f0f0', // Example background color
        position: 'fixed',
        left: 0,
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', // Example shadow
        zIndex: 1000, // Ensure it's above other content
        padding: 2, // Adjust padding as needed
        boxSizing: 'border-box',
      }}
    >
      <Typography align="center" variant='h6' component='div'>
        Quick Access
      </Typography>
      <Divider/>
      {/* Add additional links or content as needed */}
    </Box>
  )
}
