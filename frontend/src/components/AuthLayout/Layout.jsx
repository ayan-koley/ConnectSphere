import React from 'react'
import { Toaster } from 'react-hot-toast'

const Layout = ({children, isAuthenticateRequired = false}) => {
    // isAuthenticateRequired -> true && user != isAuthenticateRequired return login page
    // isAuthenticateRequired -> false -> provide access of this page
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