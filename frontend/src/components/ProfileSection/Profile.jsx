import React, { useState } from 'react'
import ProfileDetails from './ProfileDetails'
import { Separator } from "@/components/ui/separator"
import ProfileTabs from './ProfileTabs'
import { Outlet } from 'react-router-dom'


const Profile = () => {
    
  return (
    <>
      <div className="min-h-screen bg-background">
        <ProfileDetails />
        <Separator className="mb-8" />
        <ProfileTabs />
    </div>
    </>
  )
}

export default Profile