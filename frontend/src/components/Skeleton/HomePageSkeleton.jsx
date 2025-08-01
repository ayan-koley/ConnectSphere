import React from 'react'
import PostSkeleton from './PostSkeleton.jsx';
import CreatePostSkeleton from './CreatePostSkeleton.jsx';
import UserSkeleton from './UserSkeleton.jsx';
import { Skeleton } from "@/components/ui/skeleton"
import FriendSuggestionSkeleton from './FriendSuggestionSkeleton.jsx';

const HomePageSkeleton = () => {

    const array = [0, 1, 2, 3];
    
  return (
    <div className='flex flex-col md:flex-row gap-10'>
        <div>
            <div className='mb-15 border p-8 rounded-xl'>
                <CreatePostSkeleton />
            </div>
            {
                array.slice(0, 2).map((v) => (
                    <div key={v} className='mb-5 border p-8 rounded-xl'>
                        <PostSkeleton />
                    </div>
                ))
            }
        </div>
        <FriendSuggestionSkeleton />
    </div>
  )
}

export default HomePageSkeleton