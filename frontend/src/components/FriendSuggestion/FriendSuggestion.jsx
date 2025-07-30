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

const userSuggestion = () => {
    const [users, setUsers] = useState([]);
    const [isOpenSuggestion, setIsOpenSuggestion] = useState(false);
    const [isPending, startTransition] = useTransition();
    const { getToken } = useAuth();

    const fetchSuggestionUsers = () => {
        startTransition(async() => {
            try {
                const token = await getToken();
                await axios.get(`${import.meta.env.VITE_DB_URI}/api/v1/feed/user`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then(res => setUsers(res.data.data)).catch((err) => toast.error(err.message));
            } catch (err) {
                toast.error(err.message);
            }
        })
    }

    useEffect(() => {
        fetchSuggestionUsers();
    }, [])

    console.log("user is ", users);

  return !isPending ? (
    <Card>
        <CardHeader>
            <CardTitle className="text-lg font-semibold">Suggested for you</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
            {users.length > 0 && users.map((user) => (
            <div key={user._id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                <div className="relative">
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
                <Button variant="outline" size="sm">
                    Follow
                </Button>
            </div>
            ))}
            <Button variant="ghost" className={`w-full mt-4 text-primary ${isOpenSuggestion && 'hidden'}`}>
                See all suggestions
            </Button>
            {isOpenSuggestion && users.length > 0 && users.slice(5, users.length).map((user) => (
                <div key={user._id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                <div className="relative">
                    <AuthAvatar src={user.image} className={'h-10 w-10'} />
                </div>
                <div>
                    <p className="font-medium text-sm">{user.userDetails.firstName}</p>
                    <p className="text-xs text-muted-foreground">{user.userDetails.lastName}</p>
                </div>
                </div>
                <FollowButton userId={user._id} />
            </div>
            ))}
        </CardContent>
    </Card>
  ) : (
    <FriendSuggestionSkeleton />
  )
}

export default userSuggestion