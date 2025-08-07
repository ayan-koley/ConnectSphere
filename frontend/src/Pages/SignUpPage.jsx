import { SignUp } from '@clerk/clerk-react'
import React from 'react'

const SignUpPage = () => {
  return (
    <div className='w-full flex h-screen justify-center my-5'>
        <SignUp signInUrl='/sign-in' routing='path'/>
    </div>
  )
}

export default SignUpPage