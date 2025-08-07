import React from 'react'
import { Button } from '@/components/ui/button';
import { Heart,   } from 'lucide-react';
import { useState } from 'react';
import { useTransition } from 'react';
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toggleLike } from '../store/reactionSlice';

const LikeButton = ({totalLikes=0, id, type="post"}) => {
    const likedPostIds = useSelector(state => state.reaction.likedPostIds)
    const [isLiked, setIsLiked] = useState(likedPostIds.includes(id));
    const[isPending, startTransition] = useTransition();
    const [likes, setLikes] = useState(totalLikes);
    const { getToken, isSignedIn } = useAuth();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    useEffect(() => {
        setIsLiked(likedPostIds.includes(id));
    }, [likedPostIds])

    
    const toggleLikes = () => {
        if(!isSignedIn) navigate("/sign-in");
        startTransition(async() => {
            try {
                const token = await getToken();
                setIsLiked((prev) => !prev);
                setLikes((prev) => isLiked ? prev - 1 : prev + 1);
                const response = await axios.post(`${import.meta.env.VITE_DB_URI}/api/v1/like/${type}/${id}`, {}, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then(res => res.data).catch((err) => toast.error(`error occure on try block ${err.message}`));
                dispatch(toggleLike(id))

            } catch(err) {
                toast.error(`Error occure in catch block ${err.message}`);
            }
        })
    }

    

  return !isPending ? (
    <div onClick={toggleLikes} >
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