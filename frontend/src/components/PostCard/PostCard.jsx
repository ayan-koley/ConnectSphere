import { Heart, MessageCircle, HeartPlus, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import AuthAvatar from "../Header/AuthAvatar";
import PostMediaCard from "../PostMediaCard/PostMediaCard";
import { useNavigate } from 'react-router-dom'

const PostCard = ({ post }) => {
return (
    <Card className="mb-4">
        <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <AuthAvatar src={post.avatar.image} className={"h-10 w-10"} />
                <div>
                    <p className="font-semibold text-sm">{post.userDetails.firstName} {post.userDetails.lastName}</p>
                    <p className="text-xs text-muted-foreground">{post.userDetails.username} · {post?.createdAt}</p>
                </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </div>
        </CardHeader>
        <CardContent className="pt-0">
            <p className="text-sm mb-3 leading-relaxed">{post.description}</p>
            
            <PostMediaCard mediaData={post.media} />
            
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
                    <HeartPlus className={`mr-2 h-4 w-4 ${post.favorite ? 'text-red-600' : 'text-white'}`} />
                </Button>
            </div>
        </CardContent>
    </Card>
  )
}

export default PostCard