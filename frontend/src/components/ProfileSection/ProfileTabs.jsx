import React, { useEffect, useState, useTransition } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from '@/components/ui/card';
import { Grid3X3, Bookmark, Tag, Heart, MessageCircle } from 'lucide-react';
import { Link, Outlet, useParams } from 'react-router-dom';
import axios from 'axios'
import { toast } from 'react-hot-toast'
import PostCard from '../PostCard/PostCard';
import ProfileTabSkeleton from '../Skeleton/ProfileTabSkeleton';

const ProfileTabs = ({userId}) => {
    const [isPending, startTransition] = useTransition()

    const [tab, setTab] = React.useState("posts");
    const [posts, setPosts] = useState([]);
    const [mentionPost, setMentionPost] = useState([]);

    const fetchPosts = async() => {
        startTransition(async() => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_DB_URI}/api/v1/post/user/${userId}`).then(res => res.data);
                setPosts(response.data);
            } catch (err) {
                toast.error(err.message);
            }
        })
    }

    const fetchMentionPost = async() => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_DB_URI}/api/v1/post/user/mention/${userId}`).then(res => res.data);
            setMentionPost(response.data);
        } catch (err) {
            toast.error(err.message);
        }
    }

    useEffect(() => {
        const fetchData = async() => {
            if(tab === 'posts' && posts.length === 0) {
                await fetchPosts();
            } 
            if(tab === 'mention' && mentionPost.length === 0) {
                await fetchMentionPost();
            }
        }
        fetchData();
    }, [tab])

    return !isPending ? (
        <Tabs value={tab} onValueChange={(e) => {setTab(e)}} className="w-full">
            <TabsList className="w-full ">
                <TabsTrigger 
                value="posts" 
                className="cursor-pointer"
                >
                    <Grid3X3 className="w-4 h-4 mr-2" />
                </TabsTrigger>
                <TabsTrigger 
                value="tagged" 
                className="cursor-pointer"
                >
                    <Tag className="w-4 h-4 mr-2" />
                </TabsTrigger>
            </TabsList>

            {/* Posts Grid */}
            <TabsContent value="posts" className="mt-8">
                <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6">
                {posts.map((post) => (
                    <div key={post.id}>
                        <PostCard post={post} />
                    </div>
                ))}
                </div>
            </TabsContent>

            <TabsContent value="tagged" className="mt-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {mentionPost.map((post) => (
                    <div key={post.id}>
                        <PostCard post={post} />
                    </div>
                ))}
                </div>
            </TabsContent>
            

        </Tabs>
  ) : (
    <div>
        <ProfileTabSkeleton />
    </div>
  )
}

export default ProfileTabs