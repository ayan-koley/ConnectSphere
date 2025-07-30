import { useTransition } from 'react'
import toast from 'react-hot-toast';
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import { PulseLoader } from 'react-spinners'

const UnFollowButton = ({userId}) => {
    const [isPending, startTransition] = useTransition();
    const { getToken } = useAuth();

    const unFollowUser = () => {
        startTransition(async() => {
            try {
                const token = await getToken();
                await axios.post(`${import.meta.env.VITE_DB_URI}/api/v1/relation/unfollow/${userId}`, {}, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            } catch (err) {
                toast.error(err.message);
            }
        })
    }
    
  return (
    <div>
        <Button onClick={unFollowUser} variants="ghost">
            {
                isPending ? (<PulseLoader size={4} />) : "Unfollow"
            }
        </Button>
    </div>
  )
}

export default UnFollowButton;
