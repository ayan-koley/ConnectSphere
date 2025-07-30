import { useAuth } from '@clerk/clerk-react';
import React, { useTransition, useEffect } from 'react'
import { useParams } from 'react-router-dom';

const FavoriteButton = () => {
    const { postId } = useParams();
    const [isFavorite, setIsFavorite] = useState(false);
        const[isPending, startTransition] = useTransition();
        const { getToken } = useAuth();
    
        const fetchIsFavorite = () => {
            startTransition(async() => {
                    try {
                        const token = await getToken();
                        const response = await axios.get(`${import.meta.env.VITE_DB_URI}/api/v1/post/favorite/status/${postId}`, {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }).then(res => res.data);
                        console.log("FetchedFavorite status ", response);
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
                    const response = await axios.post(`${import.meta.env.VITE_DB_URI}/api/v1/post/favorite/${postId}`, {}, {
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
    <div onClick={toggleFavorite}>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary" disabled={isPending}>
            <HeartPlus className={`mr-2 h-4 w-4 ${isFavorite && 'text-red-500'}`} />
        </Button>
    </div>
  ) : (
    <div>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary" disabled={isPending}>
            <HeartPlus className={`mr-2 h-4 w-4 `} />
        </Button>
    </div>
  )
}

export default FavoriteButton