import React from 'react'
import { Navigate } from 'react-router-dom'

function notFound() {
  return (
    <div>
      <Navigate to="/home"/>
    </div>
  )
}



export default notFound;

