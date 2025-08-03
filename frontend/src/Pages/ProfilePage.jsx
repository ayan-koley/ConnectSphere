import React from 'react'
import Profile from '../components/ProfileSection/Profile'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '@clerk/clerk-react';


const ProfilePage = () => {
  const { userId } = useParams();
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  if(!isSignedIn) {
    return navigate("/sign-in")
  }
  return (
    <div>
      <Profile userId={userId} />
    </div>
  )
}

export default ProfilePage