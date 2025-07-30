import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"

const PostSkeleton = () => {
  return (
    <div>
        <div className='flex gap-3 items-center'>
            <Skeleton className="h-10 w-10 rounded-full" />
            <div>
                <Skeleton className="h-3 w-20 mb-2" />
                <Skeleton className="h-3 w-15" />
            </div>
        </div>
        <div className='mt-5 flex flex-col gap-3'>
            <Skeleton className="h-3 md:w-xl" />
            <Skeleton className="h-3 md:w-md" />
            <Skeleton className="h-3 md:w-xs" />
        </div>
        <div className='mt-5'>
            <Skeleton className="max-w-xl h-60" />
        </div>
    </div>
  )
}

export default PostSkeleton