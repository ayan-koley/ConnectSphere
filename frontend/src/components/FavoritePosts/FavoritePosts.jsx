import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';
import React, { useEffect, useState, useTransition } from 'react'
import toast from 'react-hot-toast';
import PostCard from '../PostCard/PostCard';
import { Separator } from '@/components/ui/separator';
import PostSkeleton from '../Skeleton/PostSkeleton';

const FavoritePosts = () => {
    const {getToken} = useAuth();
    const [ posts, setPosts ] = useState([]);
    const [isPending, startTransition] = useTransition();

    const fetchPosts = () => {
        startTransition(async() => {
            try {
                const token = await getToken();
                const response = await axios.get(`${import.meta.env.VITE_DB_URI}/api/v1/post/favorite/user`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }).then(res => res.data);

                setPosts(response.data);
            } catch (err) {
                toast.error(err.message);
            }
        })
    }

    useEffect(() => {
        fetchPosts();
    }, [])

  return !isPending ? (
    <div>
        <div className='flex justify-center mt-10 w-full'>
            <h1 className='text-2xl'>Favorites Posts</h1>
        </div>
        <Separator />
        <div>
            {
              posts.length > 0 ?  posts?.map((post) => (
                    <div key={post}>
                        <PostCard post={post} />
                    </div>
                )) : (
                    <div className='w-full h-screen flex justify-center'>
                        No one have favorite post
                    </div>
                )
            }
        </div>
    </div>
  ) : (
    <div>
        {
            [0, 1, 2, 3].map((i) => (
                <div key={i}>
                    <PostSkeleton />
                </div>
            ))
        }
    </div>
  )
}

export default FavoritePosts