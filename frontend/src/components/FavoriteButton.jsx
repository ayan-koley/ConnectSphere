import { useAuth } from '@clerk/clerk-react';
import React, { useTransition, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { HeartPlus } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

const FavoriteButton = ({postId}) => {
    const [isFavorite, setIsFavorite] = useState(false);
        const[isPending, startTransition] = useTransition();
        const { getToken } = useAuth();
    
        const fetchIsFavorite = () => {
            startTransition(async() => {
                    try {
                        const token = await getToken();
                        const response = await axios.get(`${import.meta.env.VITE_DB_URI}/api/v1/favorite/post/${postId}/status`, {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }).then(res => res.data);
                        setIsFavorite(response.data);
                    } catch (err) {
                        toast.error(err.message);
                    }
            })
        }
        
        const toggleFavorite = () => {
            startTransition(async() => {
                try {
                    const token = await getToken();
                    setIsFavorite((prev) => !prev);
                    const response = await axios.patch(`${import.meta.env.VITE_DB_URI}/api/v1/favorite/post/toggle/${postId}`, {}, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }).then(res => res.data).catch((err) => toast.error(err.message));
    
                    toast.success(response.message);
                } catch(err) {
                    toast.error(err.message);
                }
            })
        }
    
        useEffect(() => {
            fetchIsFavorite();
        }, []);
    

  return !isPending ? (
    <div onClick={toggleFavorite} className='cursor-pointer'>
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