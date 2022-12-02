import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const PrivateRoute = ({ children }) => {
    const auth = useSelector(state => state.auth)
    const { isLogged, authLoading } = auth
    console.log(isLogged, authLoading)

    if (authLoading) return (
        <Box sx={{ display: 'flex' }}>
        <CircularProgress /> Loading...
    </Box>
    )

    if(!isLogged)
    {
        return <Navigate to="/login" replace />
    }
    return (children)
}

export default PrivateRoute