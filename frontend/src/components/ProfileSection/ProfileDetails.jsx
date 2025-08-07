import React, { useEffect, useState, useTransition } from 'react'
import AuthAvatar from '../Header/AuthAvatar';
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import ProfileDetailsSkeleton from '../Skeleton/ProfileDetailsSkeleton';
import FollowButton from '../FollowButton';
import UnFollowButton from '../UnFollowButton';
import { useAuth } from '@clerk/clerk-react';
import { useSelector } from 'react-redux'

const ProfileDetails = ({userData, isPending}) => {
    const navigate = useNavigate();
    const {_id} = useSelector(state => state.authSlice.userData);
    const followingIds = useSelector(state => state.following.followingIds);



  return !isPending && Object.keys(userData).length > 0 ? (
    <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="flex flex-col items-center md:flex-row md:items-start gap-8 mb-8">
          {/* Profile Picture with futuristic styling */}
            <div className="flex justify-center md:justify-start">
                <div className="relative group">
                    <AuthAvatar className="w-36 h-36 border-2 border-border ring-4 ring-background shadow-xl" src={userData.image} />
                    {/* <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-background"></div> */}
                </div>
            </div>

            <div className="flex-1 text-center md:text-left space-y-6">
            {/* Username and Edit Button */}
            <div className="flex flex-col md:flex-row md:items-center gap-4">
                <h2 className="text-3xl font-light tracking-wide">{userData.userDetails.username}</h2>
                {
                userData._id.toString() !== _id &&
                    (
                        <div>
                    {
                        
                    !followingIds.includes(userData._id) ? (
                        <div onClick={() => setIsFollow(false)}>
                            <FollowButton userId={userData._id} />
                        </div>
                    ) : (
                        <div onClick={() => setIsFollow(true)}>
                            <UnFollowButton userId={userData._id} />
                        </div>
                    )
                }
                </div>
                    )
                }
                {
                    userData._id === _id && (
                        <Button 
                            variant="ghost" 
                            className="glass-button font-medium px-6 py-2 rounded-full transition-all hover:scale-105 cursor-pointer"
                            onClick={() => navigate("/view")}
                        >
                            Edit Profile
                        </Button>
                    )
                }
            </div>

            {/* Stats with separator */}
            <div className="flex justify-center md:justify-start items-center gap-6">
                <div className="text-center">
                    <div className="text-2xl font-bold">{userData.postsCount}</div>
                    <div className="text-muted-foreground text-sm font-medium">posts</div>
                </div>
                <Separator orientation="vertical" className="h-8" />
                <div className="text-center">
                    <div className="text-2xl font-bold">{userData.followersCount}</div>
                    <div className="text-muted-foreground text-sm font-medium">followers</div>
                </div>
                <Separator orientation="vertical" className="h-8" />
                <div className="text-center">
                    <div className="text-2xl font-bold">{userData.followingCount}</div>
                    <div className="text-muted-foreground text-sm font-medium">following</div>
                </div>
                </div>

                {/* Bio */}
                <div className="space-y-2">
                    <h3 className="font-semibold text-lg">{userData.userDetails.firstName} {userData.userDetails.lastName}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                        {userData.userDetails.bio}
                    </p>
                </div>
            </div>
        </div>
    </div>
  ) : (
    <div>
        <ProfileDetailsSkeleton />
    </div>
  )
}

export default ProfileDetails