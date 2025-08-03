import React, { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Layout = ({children, isAuthenticateRequired = true}) => {
    const { status } = useSelector((state) => state.authSlice);
    const navigate = useNavigate()

    console.log("Layout is ", isAuthenticateRequired, status);
   
      useEffect(() => {
        if (isAuthenticateRequired && !status) {
            navigate("/sign-in");
        }
  }, [isAuthenticateRequired, status, navigate]);


  return (
    <div>
        <Toaster
            position="top-right"
            reverseOrder={false}
        />
        {children}
    </div>
  )
}

export default Layout