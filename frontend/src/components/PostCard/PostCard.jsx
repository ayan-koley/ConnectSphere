import { Heart, MessageCircle, HeartPlus, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import AuthAvatar from "../Header/AuthAvatar";
import PostMediaCard from "../PostMediaCard/PostMediaCard";
import { useNavigate } from 'react-router-dom'
import FavoriteButton from "../FavoriteButton";
import LikeButton from "../LikeButton";

const PostCard = ({ post }) => {
    const navigate = useNavigate();
return (
    <Card className="mb-4">
        <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate(`/profile/${post.userId}`)}>
                    <AuthAvatar src={post.avatar.image} className={"h-10 w-10"} />
                    <div>
                        <p className="font-semibold text-sm">{post.userDetails.firstName} {post.userDetails.lastName}</p>
                        <p className="text-xs text-muted-foreground">{post.userDetails.username} · {post?.createdAt}</p>
                    </div>
                </div>
            </div>
        </CardHeader>
        <CardContent className="pt-0 cursor-pointer" >
            
            <div onClick={() => navigate(`/post/${post._id}`)}>
                <p className="text-sm mb-3 leading-relaxed">{post.description}</p>
                <PostMediaCard mediaData={post.media} />
            </div>
            
            <div className="flex items-center justify-between pt-2 border-t border-border">
                <LikeButton id={post._id} totalLikes={post.totalLikes} type="post" />
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    {post.totalComments}
                </Button>
                <FavoriteButton postId={post._id}  />
            </div>
        </CardContent>
    </Card>
  )
}

export default PostCard