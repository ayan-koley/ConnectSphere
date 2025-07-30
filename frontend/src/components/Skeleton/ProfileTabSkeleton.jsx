import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"
import PostSkeleton from './PostSkeleton'

const ProfileTabSkeleton = () => {
  return (
    <div>
        <div className='flex gap-2 mt-40 p-3 border'>
            <div>
                <Skeleton className="w-xl h-10 rounded" />
            </div>
            <div>
                <Skeleton className="w-xl h-10 rounded" />
            </div>
        </div>
        <div className='border p-5'>
            <PostSkeleton />
        </div>
    </div>
  )
}

export default ProfileTabSkeleton