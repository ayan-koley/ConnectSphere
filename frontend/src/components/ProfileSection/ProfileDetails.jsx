import React from 'react'
import AuthAvatar from '../Header/AuthAvatar';
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const ProfileDetails = () => {
     const userStats = {
    posts: 127,
    followers: 2847,
    following: 486
  };
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="flex flex-col items-center md:flex-row md:items-start gap-8 mb-8">
          {/* Profile Picture with futuristic styling */}
            <div className="flex justify-center md:justify-start">
                <div className="relative group">
                    <AuthAvatar className="w-36 h-36 border-2 border-border ring-4 ring-background shadow-xl" />
                    {/* <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-background"></div> */}
                </div>
            </div>

            <div className="flex-1 text-center md:text-left space-y-6">
            {/* Username and Edit Button */}
            <div className="flex flex-col md:flex-row md:items-center gap-4">
                <h2 className="text-3xl font-light tracking-wide">alexchen</h2>
                <Button 
                    variant="ghost" 
                    className="glass-button font-medium px-6 py-2 rounded-full transition-all hover:scale-105"
                >
                    Edit Profile
                </Button>
            </div>

            {/* Stats with separator */}
            <div className="flex justify-center md:justify-start items-center gap-6">
                <div className="text-center">
                    <div className="text-2xl font-bold">{userStats.posts}</div>
                    <div className="text-muted-foreground text-sm font-medium">posts</div>
                </div>
                <Separator orientation="vertical" className="h-8" />
                <div className="text-center">
                    <div className="text-2xl font-bold">{userStats.followers.toLocaleString()}</div>
                    <div className="text-muted-foreground text-sm font-medium">followers</div>
                </div>
                <Separator orientation="vertical" className="h-8" />
                <div className="text-center">
                    <div className="text-2xl font-bold">{userStats.following}</div>
                    <div className="text-muted-foreground text-sm font-medium">following</div>
                </div>
                </div>

                {/* Bio */}
                <div className="space-y-2">
                    <h3 className="font-semibold text-lg">Alex Chen</h3>
                    <p className="text-muted-foreground leading-relaxed">
                        Digital creator & tech enthusiast ⚡<br />
                        Capturing moments in pixels and code 📸<br />
                        SF Bay Area 🌉
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProfileDetails