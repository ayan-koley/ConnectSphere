import { useAuth } from '@clerk/clerk-react';
import React, { useTransition, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { HeartPlus } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../store/reactionSlice';

const FavoriteButton = ({postId, favorite}) => {
    const favoritedPostIds = useSelector(state => state.reaction.favoritedPostIds);
    const [isFavorite, setIsFavorite] = useState(favoritedPostIds.includes(postId));
        const[isPending, startTransition] = useTransition();
        const { getToken, isSignedIn } = useAuth();
        const dispatch = useDispatch();
        const navigate = useNavigate();

        useEffect(() => {
            setIsFavorite(favoritedPostIds.includes(postId));
        }, [favoritedPostIds])

        const toggleFavorites = () => {
            startTransition(async() => {
                try {
                    if(!isSignedIn) return navigate("/sign-in")
                    const token = await getToken();
                    setIsFavorite((prev) => !prev);
                    const response = await axios.patch(`${import.meta.env.VITE_DB_URI}/api/v1/favorite/post/toggle/${postId}`, {}, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }).then(res => res.data).catch((err) => toast.error(err.message));
                    dispatch(toggleFavorite(postId));
                } catch(err) {
                    toast.error(err.message);
                }
            })
        }
    


  return !isPending ? (
    <div onClick={toggleFavorites} className='cursor-pointer'>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary" disabled={isPending}>
            <HeartPlus className={`mr-2 h-4 w-4 ${isFavorite && 'text-red-500'}`} />
        </Button>
    </div>
  ) : (
    <div>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary cursor-not-allowed" disabled={isPending}>
            <HeartPlus className={`mr-2 h-4 w-4 `} />
        </Button>
    </div>
  )
}

export default FavoriteButton