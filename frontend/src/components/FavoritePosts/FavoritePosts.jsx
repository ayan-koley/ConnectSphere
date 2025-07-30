import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';
import React, { useEffect, useState, useTransition } from 'react'
import toast from 'react-hot-toast';
import PostCard from '../PostCard/PostCard';
import { Separator } from '@/components/ui/separator';
import PostSkeleton from '../Skeleton/PostSkeleton';

const FavoritePosts = () => {
    const {getToken} = useAuth();
    const [ favorites, setFavorites ] = useState([]);
    const [isPending, startTransition] = useTransition();

    const fetchPosts = () => {
        startTransition(async() => {
            try {
                const token = await getToken();
                const response = await axios.get(`${import.meta.env.VITE_DB_URI}/api/v1/favorite/post`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }).then(res => res.data);

                setFavorites(response.data);
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
        <div className='flex justify-center w-full mt-10'>
            <h1 className='text-3xl font-bold mb-5'>Favorites Posts</h1>
        </div>
        <Separator />
        <div>
            {
                favorites.length > 0 ?  favorites?.map((favorite) => (
                    <div key={favorite._id}>
                        <PostCard post={favorite.post} />
                    </div>
                )) : (
                    <div className='w-full flex h-screen justify-center mt-10'>
                        <h1 className='text-2xl'>No one have favorite post</h1>
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