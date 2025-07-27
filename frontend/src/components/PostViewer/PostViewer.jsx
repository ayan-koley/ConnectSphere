import React, { useEffect, useState } from 'react'
import AuthAvatar from '../Header/AuthAvatar'
import { CheckCircle, MoreHorizontal, Heart, MessageCircle, HeartPlus, FilePenLine, FileX  } from 'lucide-react'
import {Button} from '@/components/ui/button.tsx'
import {Card} from '@/components/ui/card'
import Comment from '../Comment/Comment'
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import PostMediaCard from '../PostMediaCard/PostMediaCard'
import { useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import axios from 'axios'


const PostViewer = () => {

    const { postId } = useParams();
    const [post, setPost] = useState({});


    const fetchPostData = async() => {
        try {
            const postData = await axios.get().then(res => res.data);
            setPost(postData.data);
        } catch (err) {
            toast.error(err.message);
        }
    }

    useEffect(() => {
        const fetchPost = async() => {
            await fetchPostData();
        }
        fetchPost();
    }, []);


return post && (
    <div>
        <Card className="border-0 border-b border-border rounded-none">
            <div className="p-4">
                {/* Author Info */}
                <div className="flex items-start gap-3 mb-3">
                    <AuthAvatar src={post.avatar.image} className={'h-12 w-12'}  />
                    <div className="flex-1">
                        <div className="flex items-center gap-2">
                        <h3 className="font-bold text-base">Ayan</h3>
                        {/* {samplePost.author.verified && (
                            <CheckCircle className="h-5 w-5 text-social-verified fill-current" />
                        )} */}
                        </div>
                        <p className="text-muted-foreground text-sm">{post.userDetails.username}</p>
                    </div>
                    <DropdownMenu >
                        <DropdownMenuTrigger>
                            <Button variant="ghost" size="icon" className="hover:bg-social-hover cursor-pointer">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem className="cursor-pointer">
                                <FilePenLine className='h-5 w-5' />
                                Edit Post
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                                <FileX className='h-5 w-5' />
                                Delete Post
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    
                </div>

                {/* Post Content */}
                <div className="mb-3">
                    <p className="text-foreground text-lg leading-relaxed mb-2">Just finished building an amazing React component library! The development experience has been incredible. Can't wait to share what we've been working on. 🚀 #React #WebDev</p>
                    <p className="text-muted-foreground text-sm">2h</p>

                    <PostMediaCard mediaData={post?.media} />
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border">
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                        <Heart className="mr-2 h-4 w-4" />
                        {post.totalLikes}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                        <MessageCircle className="mr-2 h-4 w-4" />
                        {post.totalComments}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                        <HeartPlus className={`mr-2 h-4 w-4 `} />
                    </Button>
                </div>
            </div>

            {/* <div className="divide-y divide-border">
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
            </div> */}
            <Separator />
            <div className='px-5 flex gap-3'>
                <Input className="max-w-md" placeholder="Write Comment" />
                <Button variant="outline" className="cursor-pointer">
                    Submit
                </Button>
            </div>
            <Comment />
        </Card>
    </div>
  )
}

export default PostViewer