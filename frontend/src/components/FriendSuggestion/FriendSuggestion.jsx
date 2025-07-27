import React from 'react'
import {Card, CardHeader, CardContent, CardTitle} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import AuthAvatar from '../Header/AuthAvatar'
import { mockFriends } from '../../mockData'

const FriendSuggestion = () => {

  return (
    <Card>
        <CardHeader>
            <CardTitle className="text-lg font-semibold">Suggested for you</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
            {mockFriends.slice(0, 3).map((friend) => (
            <div key={friend.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                <div className="relative">
                    <AuthAvatar src={friend.avator} className={'h-10 w-10'} />
                    {/* Friend Online so blue circle */}
                    {friend.isOnline && (
                    <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-blue-500 border-2 border-background"></div>
                    )}
                </div>
                <div>
                    <p className="font-medium text-sm">{friend.name}</p>
                    <p className="text-xs text-muted-foreground">{friend.username}</p>
                </div>
                </div>
                <Button variant="outline" size="sm">
                    Follow
                </Button>
            </div>
            ))}
            <Button variant="ghost" className="w-full mt-4 text-primary">
                See all suggestions
            </Button>
        </CardContent>
    </Card>
  )
}

export default FriendSuggestion