import React from 'react'
import PostSkeleton from './PostSkeleton.jsx';
import CreatePostSkeleton from './CreatePostSkeleton.jsx';
import UserSkeleton from './UserSkeleton.jsx';
import { Skeleton } from "@/components/ui/skeleton"

const HomePageSkeleton = () => {

    const array = [0, 1, 2, 3];
    
  return (
    <div className='flex flex-col md:flex-row'>
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
        <div className='md:w-xl flex justify-center'>
            <div className='flex flex-col gap-5 border p-10 h-fit rounded-xl'>
                {
                    array.map((v) => (
                        <div key={v} className='flex items-center gap-5'>
                            <UserSkeleton />
                            <Skeleton className="h-8 w-15" />
                        </div>
                    ))
                }
           </div>
        </div>
    </div>
  )
}

export default HomePageSkeleton