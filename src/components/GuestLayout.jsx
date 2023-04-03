import React, { useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider'

function GuestLayout() {
  const {token}=useStateContext()
  if(token){
    return <Navigate to="/"></Navigate>
  }
  return (
    <div>
        <Outlet></Outlet>
    </div>
  )
}

export default GuestLayout