import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const auth = useSelector(state => state.auth)
    const { isLogged, authLoading } = auth
    console.log(isLogged, authLoading)

    if (authLoading) return (
        <div>
            Loading....
        </div>
    )

    if (!isLogged) {
        return <Navigate to="/login" replace />
    }
    return (children)
}

export default PrivateRoute