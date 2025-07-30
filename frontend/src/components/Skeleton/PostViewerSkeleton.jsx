import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"
import UserSkeleton from './UserSkeleton'
import PostSkeleton from './PostSkeleton'

const PostViewerSkeleton = () => {
  return (
    <div className='flex flex-col gap-5'>
        <div className='p-5 border rounded-xl'>
            <PostSkeleton />
        </div>
        <div className='flex gap-3 p-5 border rounded-xl'>
            <Skeleton className="w-md h-15" />
            <Skeleton className="w-25 h-15" />
        </div>
        {
            [0, 1, 2, 3].map((v) => (
                <div key={v}>
                    <div className='flex flex-col gap-3 p-5 border rounded-xl'>
                        <UserSkeleton />
                        <Skeleton className="w-md h-3" />
                        <Skeleton className="w-xs h-3" />
                    </div>
                </div>
            ))
        }
        
    </div>
  )
}

export default PostViewerSkeleton