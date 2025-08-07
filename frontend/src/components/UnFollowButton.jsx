import { useTransition } from 'react'
import toast from 'react-hot-toast';
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import { PulseLoader } from 'react-spinners'
import { useDispatch } from 'react-redux';
import { toggleFollowing } from '../store/followingSlice';
import { useNavigate } from 'react-router-dom';

const UnFollowButton = ({userId}) => {
    const [isPending, startTransition] = useTransition();
    const { getToken } = useAuth();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isSignedIn } = useAuth();


    const unFollowUser = () => {
        startTransition(async() => {
            try {
                if(!isSignedIn) return navigate("/sign-in")
                const token = await getToken();
                await axios.post(`${import.meta.env.VITE_DB_URI}/api/v1/relation/unfollow/${userId}`, {}, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                dispatch(toggleFollowing(userId));
                toast.success("Successfully Unfollow")
            } catch (err) {
                toast.error(err.message);
            }
        })
    }
    
  return (
    <div onClick={unFollowUser}>
        <Button  variants="ghost" className="cursor-pointer">
            {
                isPending ? (<PulseLoader size={4} />) : "Unfollow"
            }
        </Button>
    </div>
  )
}

export default UnFollowButton;
