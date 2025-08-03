import React from 'react'
import ProfileDetails from './ProfileDetails'
import { Separator } from "@/components/ui/separator"
import ProfileTabs from './ProfileTabs'

const Profile = ({userId}) => {
 
  return  (
      <div className="min-h-screen bg-background">
        <ProfileDetails userId={userId} />
        <Separator className="mb-8" />
        <ProfileTabs  userId={userId} />
      </div>
    )
}

export default Profile