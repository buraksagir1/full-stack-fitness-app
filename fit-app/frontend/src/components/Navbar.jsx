import React from 'react'
import { Box, Container } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
    const navigate = useNavigate();
    return (
        <Box style={{ paddingLeft: 245, top: 0, left: 0, right: 0, position: 'fixed', zIndex: 1, backgroundColor: 'white', color: "black", boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.3)', }}>
            <h2 style={{ fontFamily: "arial" }} onClick={() => { navigate("/") }}> FIT APP </h2>
        </Box>

    )
}
