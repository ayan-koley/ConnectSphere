import React from 'react'
import {SignIn} from '@clerk/clerk-react'

const SignInPage = () => {
  return (
    <div className='flex justify-center w-full h-screen items-center'>
        <SignIn signUpUrl='/sign-up' />
    </div>
  )
}

export default SignInPage