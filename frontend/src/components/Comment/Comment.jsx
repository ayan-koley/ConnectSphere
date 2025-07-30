import React, { useEffect, useState } from 'react'
import {Card} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Heart } from 'lucide-react'
import AuthAvatar from '../Header/AuthAvatar'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { fetchComment } from '../../store/commentSlice'
const Comment = ({postId}) => {

    const [comments, setComments] = useState([]);
    const dispatch = useDispatch();
    const getComment = async() => {
        try {
            dispatch(fetchComment(postId))
        } catch (err) {
            toast.error(err);
        }
    }

    useEffect(() => {
        async function getCmnt() {
            await getComment();
        }
        getCmnt();
    }, [])


  return comments && comments.length > 0 ? (
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
  ) : (
    <div>Noting</div>
  )
}

export default Comment