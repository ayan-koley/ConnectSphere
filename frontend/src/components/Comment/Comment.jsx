import React from 'react'
import {Card} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Heart } from 'lucide-react'
import AuthAvatar from '../Header/AuthAvatar'
const Comment = () => {

    const samplePost = {
        id: "1",
        author: {
            name: "Sarah Johnson",
            username: "sarahjdev",
            avatar: "",
            verified: true
        },
        content: "Just finished building an amazing React component library! The development experience has been incredible. Can't wait to share what we've been working on. 🚀 #React #WebDev",
        timestamp: "2h",
        media: [
            { type: 'image', url: "https://res.cloudinary.com/dlcxr1p9c/image/upload/v1743316261/utw73bosfyvtwhhpddve.jpg", alt: 'Sunset over mountains' },
            { type: 'image', url: "https://res.cloudinary.com/dlcxr1p9c/image/upload/v1732767145/ik5o0pchulfhc4xtsu2r.jpg", alt: 'City skyline at night' }
        ],
        engagement: {
            likes: 247,
            replies: 12,
            reposts: 34,
            shares: 8
        },
        replies: [
            {
            id: "r1",
            author: {
                name: "Mike Chen",
                username: "mikechen",
                avatar: "https://res.cloudinary.com/dlcxr1p9c/image/upload/v1723636083/samples/woman-on-a-football-field.jpg"
            },
            content: "This looks absolutely amazing! Would love to hear more about your development process and the challenges you faced.",
            timestamp: "1h"
            },
            {
            id: "r2", 
            author: {
                name: "Alex Rivera",
                username: "alexrivera",
                avatar: ""
            },
            content: "The UI looks so clean and modern! Are you planning to open source this?",
            timestamp: "45m"
            }
        ]
};

  return (
    <div>
        <div className="divide-y divide-border">
                {samplePost.replies.map((reply) => (
                    <Card key={reply.id} className="border-0 rounded-none">
                    <div className="p-4">
                        <div className="flex items-start gap-3">
                        <AuthAvatar src={"https://res.cloudinary.com/dlcxr1p9c/image/upload/v1723636083/samples/man-portrait.jpg"} className={'h-10 w-10'} />
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-sm">{reply.author.name}</h4>
                            <span className="text-muted-foreground text-sm">@{reply.author.username}</span>
                            <span className="text-muted-foreground text-sm">·</span>
                            <span className="text-muted-foreground text-sm">{reply.timestamp}</span>
                            </div>
                            <p className="text-foreground text-sm leading-relaxed">{reply.content}</p>
                        </div>
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                            <Heart className="mr-2 h-4 w-4" />
                            10
                        </Button>
                        </div>
                    </div>
                    </Card>
                ))}
            </div>
    </div>
  )
}

export default Comment