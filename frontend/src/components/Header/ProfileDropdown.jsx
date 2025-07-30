import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import AuthAvatar from './AuthAvatar'
import { UserCog, LogOut, User  } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { SignOutButton, useAuth } from '@clerk/clerk-react'

const ProfileDropdown = ({status, src}) => {
    const userData = useSelector(state => state.authSlice?.userData);
    const navigate = useNavigate();
    const { sessionId } = useAuth();

  return status ? (
    <>
        <DropdownMenu>
            <DropdownMenuTrigger>
                <AuthAvatar src={src} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate(`/profile/${userData?._id}`)}>
                    <User className='mr-2 h-4 w-4'/>
                    <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/setting")}>
                    <UserCog className='mr-2 h-4 w-4' />
                    <span>Setting</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <LogOut className='mr-2 h-4 w-4' />
                    <SignOutButton signOutOptions={sessionId}>
                        Sign Out
                    </SignOutButton>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </>
  ) : 
  (
     <DropdownMenu>
            <DropdownMenuTrigger>
                <AuthAvatar />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/sign-in")}>
                    <User className='mr-2 h-4 w-4'/>
                    <span>SignIn</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/sign-up")}>
                    <UserCog className='mr-2 h-4 w-4' />
                    <span>SignUp</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
  )
}

export default ProfileDropdown