import React, { useEffect, useState } from 'react'
import AuthAvatar from '../Header/AuthAvatar'
import { CheckCircle, MoreHorizontal, Heart, MessageCircle, HeartPlus, FilePenLine, FileX  } from 'lucide-react'
import {Button} from '@/components/ui/button.tsx'
import {Card} from '@/components/ui/card'
import Comment from '../Comment/Comment'
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
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import PostViewerSkeleton from '../Skeleton/PostViewerSkeleton'
import LikeButton from '../LikeButton'
import { useDispatch, useSelector } from 'react-redux'
import CreateComment from '../Comment/CreateComment'
import FavoriteButton from '../FavoriteButton'
import PostCard from '../PostCard/PostCard'
import { postTimeConverter } from '../../utils/calculatePostTime'
import { useAuth } from '@clerk/clerk-react'
import { removeToFeed } from '../../store/feedSlice'


const PostViewer = () => {
    const { postId } = useParams();
    const [post, setPost] = useState({});
    const userData = useSelector(state => state.authSlice.userData);
    const navigate = useNavigate();
    const {likedPostIds, favoritedPostIds} = useSelector(state => state.reaction);
    const { getToken } = useAuth();
    const dispatch = useDispatch();


    const fetchPostData = async() => {
        try {
            const postData = await axios.get(`${import.meta.env.VITE_DB_URI}/api/v1/post/${postId}`).then(res => res.data);
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

    const deletePost = async() => {
        try {
            const token = await getToken();
            await axios.delete(`${import.meta.env.VITE_DB_URI}/api/v1/post/delete/${postId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            navigate("/")
            dispatch(removeToFeed(postId));
        } catch (err) {
            toast.error(err.message);
        }
    }   


return Object.keys(post).length > 0 ? (
    <div>
        
                        {/* {samplePost.author.verified && (
                            <CheckCircle className="h-5 w-5 text-social-verified fill-current" />
                        )} */}
        <Card className="border-0 border-b border-border rounded-none">
            <div className="p-4">
                <div className="flex items-start gap-3 mb-3">
                    <div onClick={() => navigate(`/profile/${post.userId}`)}>
                        <AuthAvatar src={post.avatar?.image} className={'h-12 w-12'}  />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2">
                        <h3 className="font-bold text-base">Ayan</h3>
                        </div>
                        <p className="text-muted-foreground text-sm">{post.userDetails?.username}</p>
                    </div>
                    <DropdownMenu >
                        <DropdownMenuTrigger>
                            <div variant="ghost" size="icon" className="hover:bg-social-hover cursor-pointer">
                                <MoreHorizontal className="h-4 w-4" />
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {/* <DropdownMenuItem className="cursor-pointer">
                                <FilePenLine className='h-5 w-5' />
                                Edit Post
                            </DropdownMenuItem> */}
                            <DropdownMenuItem className="cursor-pointer" onClick={deletePost}>
                                <FileX className='h-5 w-5' />
                                Delete Post
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    
                </div>

                <div className="mb-3">
                    <p className="text-foreground text-lg leading-relaxed mb-2">{post.description}</p>
                    <p className="text-muted-foreground text-sm">{postTimeConverter(post.createdAt)}</p>

                    <PostMediaCard mediaData={post?.media} />
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border">
                    <LikeButton totalLikes={post.totalLikes} userId={userData?._id} id={post._id} type='post' />

                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                        <MessageCircle className="mr-2 h-4 w-4" />
                        {post.totalComments}
                    </Button>
                    <FavoriteButton postId={post._id} />
                </div>
            </div>

            {/* <PostCard post={post} /> */}

 
            <Separator />
            <div>
                <CreateComment />
            </div>
            <Comment postId={postId} />
        </Card>
    </div>
  ) : (
    <div>
        <PostViewerSkeleton />
    </div>
  )
}

export default PostViewer