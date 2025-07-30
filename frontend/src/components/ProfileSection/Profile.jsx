import React, { useState, useTransition } from 'react'
import ProfileDetails from './ProfileDetails'
import { Separator } from "@/components/ui/separator"
import ProfileTabs from './ProfileTabs'
import { Outlet } from 'react-router-dom'
import ProfileSkeleton from '../Skeleton/ProfileSkeleton'


const Profile = () => {
  const [isPending, startTransition] = useTransition()
    
  return !isPending ? (
    <>
      <div className="min-h-screen bg-background">
        <ProfileDetails />
        <Separator className="mb-8" />
        <ProfileTabs />
    </div>
    </>
  ) : (
    <ProfileSkeleton />
  )
}

export default Profile