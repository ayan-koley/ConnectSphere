import React from 'react'
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { useState } from 'react';
import { useTransition } from 'react';
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react'

const LikeButton = ({totalLikes=0, userId, id, type="post"}) => {
    const [isLiked, setIsLiked] = useState(false);
    const[isPending, startTransition] = useTransition();
    const [likes, setLikes] = useState(totalLikes);
    const { getToken } = useAuth();

    const fetchIsLiked = () => {
        startTransition(async() => {
                try {
                    const token = await getToken();
                    const response = await axios.get(`${import.meta.env.VITE_DB_URI}/api/v1/like/${id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }).then(res => res.data);
                    console.log("FetchedLike status ", response);
                    setIsLiked(response.data);
                } catch (err) {
                    toast.error(err.message);
                }
        })
    }
    
    const toggleLike = () => {
        startTransition(async() => {
            try {
                const token = await getToken();
                setIsLiked((prev) => !prev);
                setLikes((prev) => isLiked ? prev - 1 : prev + 1);
                const response = await axios.post(`${import.meta.env.VITE_DB_URI}/api/v1/like/${type}/${id}`, {}, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then(res => res.data).catch((err) => toast.error);

                toast.success(response.message);
            } catch(err) {
                toast.error(err.message);
            }
        })
    }

    useEffect(() => {
        fetchIsLiked();
    }, []);

    

  return !isPending ? (
    <div onClick={() => toggleLike()} >
        <Button variant="ghost" size="sm" className={`text-muted-foreground hover:text-primary cursor-pointer`} disabled={isPending}>
                    <Heart className={`mr-2 h-4 w-4 ${isLiked ? 'text-red-500' : ''}`} />
                    {likes}
        </Button>
    </div>
  ) : (
    <div>
        <Button variant="ghost" size="sm" className={`text-muted-foreground hover:text-primary`} disabled={isPending}>
                    <Heart className="mr-2 h-4 w-4" />
                    {likes}
        </Button>
    </div>
  )
}

export default LikeButton