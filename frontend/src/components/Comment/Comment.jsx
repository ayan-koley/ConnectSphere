import React, { useEffect, useState } from 'react'
import {Card} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Heart } from 'lucide-react'
import AuthAvatar from '../Header/AuthAvatar'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { fetchComment } from '../../store/commentSlice'
import LikeButton from '../LikeButton'
const Comment = ({postId}) => {

    const comments = useSelector(state => state.comments.byPostId[postId]);
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


  return comments && comments.length > 0 && (
    <div>
        <div className="divide-y divide-border">
                {comments?.map((comment) => (
                    <Card key={comment.id} className="border-0 rounded-none">
                    <div className="p-4">
                        <div className="flex items-start gap-3">
                        <AuthAvatar src={comment.user.image} className={'h-10 w-10'} />
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-sm">{comment.userDetails.firstName} {comment.userDetails.lastName}</h4>
                            <span className="text-muted-foreground text-sm">@{comment.userDetails.username}</span>
                            <span className="text-muted-foreground text-sm">·</span>
                            <span className="text-muted-foreground text-sm">{comment.createdAt}</span>
                            </div>
                            <p className="text-foreground text-sm leading-relaxed">{comment.content}</p>
                        </div>
                            <LikeButton id={comment._id} totalLikes={comment.totalLikes} type='comment' />
                        </div>
                    </div>
                    </Card>
                ))}
            </div>
    </div>
  )
}

export default Comment