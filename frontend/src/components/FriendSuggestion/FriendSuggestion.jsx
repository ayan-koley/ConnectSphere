import React from 'react'
import {Card, CardHeader, CardContent, CardTitle} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import AuthAvatar from '../Header/AuthAvatar'
import { useState } from 'react'
import { useTransition } from 'react'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react'
import FollowButton from '../FollowButton'
import FriendSuggestionSkeleton from '../Skeleton/FriendSuggestionSkeleton'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToSuggestion } from '../../store/friendSuggestionSlice'

const userSuggestion = () => {
    const [isOpenSuggestion, setIsOpenSuggestion] = useState(false);
    const navigate = useNavigate();
    const {users, pending} = useSelector(state => state.friendSuggestionSlice);
    const { isSignedIn} = useAuth();
    if(!isSignedIn) return null;
  return !pending  ? (
    <div>
        {
            users.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold">Suggested for you</CardTitle>
                    </CardHeader>

                    {
                        users.length > 5 ? (
                            <CardContent className="space-y-4">
                                {users.slice(0, 5).map((user) => (
                                        <div key={user._id} className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                            <div className="relative" onClick={() => navigate(`/profile/${user._id}`)}>
                                                <AuthAvatar src={user.image} className={'h-10 w-10'} />
                                                {/* user Online so blue circle */}
                                                {/* {user.isOnline && (
                                                <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-blue-500 border-2 border-background"></div>
                                                )} */}
                                            </div>
                                            <div>
                                                <p className="font-medium text-sm">{user.userDetails.firstName}</p>
                                                <p className="text-xs text-muted-foreground">{user.userDetails.lastName}</p>
                                            </div>
                                            </div>
                                            <FollowButton userId={user._id} follow={false} />
                                        </div>
                                    )
                                )}
                                <Button variant="ghost" className={`w-full mt-4 text-primary cursor-pointer ${isOpenSuggestion && 'hidden'}`} onClick={() => setIsOpenSuggestion((prev) => !prev)}>
                                    See all suggestions
                                </Button>
                                {isOpenSuggestion &&  users.slice(5, users.length).map((user) => (
                                    <div key={user._id} className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                    <div className="relative" onClick={() => navigate(`/profile/${user._id}`)}>
                                        <AuthAvatar src={user.image} className={'h-10 w-10'} />
                                    </div>
                                    <div>
                                        <p className="font-medium text-sm">{user.userDetails.firstName}</p>
                                        <p className="text-xs text-muted-foreground">{user.userDetails.lastName}</p>
                                    </div>
                                    </div>
                                    <FollowButton userId={user._id} follow={false} />
                                </div>
                                ))}
                            </CardContent>
                        ) : (
                            <CardContent className="space-y-4">
                                {users.map((user) => (
                                        <div key={user._id} className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                            <div className="relative" onClick={() => navigate(`/profile/${user._id}`)}>
                                                <AuthAvatar src={user.image} className={'h-10 w-10'} />
                                                {/* user Online so blue circle */}
                                                {/* {user.isOnline && (
                                                <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-blue-500 border-2 border-background"></div>
                                                )} */}
                                            </div>
                                            <div>
                                                <p className="font-medium text-sm">{user.userDetails.firstName}</p>
                                                <p className="text-xs text-muted-foreground">{user.userDetails.lastName}</p>
                                            </div>
                                            </div>
                                            <FollowButton userId={user._id} follow={false} />
                                        </div>
                                    )
                                )}
                            </CardContent>
                        )
                    }

                    
                </Card>
            )
        }
    </div>
  ) : (
    <FriendSuggestionSkeleton />
  )
}

export default userSuggestion