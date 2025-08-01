import { useState } from 'react';
import { useTransition } from 'react'
import toast from 'react-hot-toast';
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import { PulseLoader } from 'react-spinners'

const FollowButton = ({userId}) => {
    const [isPending, startTransition] = useTransition();
    const [isFollow, setIsFollow] = useState(true);
    const { getToken } = useAuth();

    const followUser = () => {
        startTransition(async() => {
            try {
                setIsFollow(true)
                const token = await getToken();
                await axios.post(`${import.meta.env.VITE_DB_URI}/api/v1/relation/follow/${userId}`, {}, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).catch(err => toast.error(err.message));
            } catch (err) {
                toast.error(err.message);
            }
        })
    }

  return (
    <div onClick={followUser}>
        {
            isFollow ? (
                <Button  size="sm" disabled={isPending} className="cursor-pointer">
                    {
                        isPending ? (<PulseLoader size={4} />) : "Follow"
                    }
                </Button>
            ) : (
                <Button variant="outline" size="sm" disabled={isPending}>
                    Followed
                </Button>
            )
        }
    </div>
  )
}

export default FollowButton