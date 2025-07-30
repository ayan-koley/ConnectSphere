import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"

const CreatePostSkeleton = () => {
  return (
    <div>
        <div className='flex gap-3'>
            <Skeleton className=" h-10 w-30 md:h-10 md:w-10 rounded-full" />
            <Skeleton className="h-20 md:h-30 w-xl" />
        </div>
        <div className='flex max-w-xl justify-between pl-13 mt-5'>
            <Skeleton className="w-xs h-10 mr-5 md:mr-0" />
            <Skeleton className="w-20 h-10" />
        </div>
    </div>
  )
}

export default CreatePostSkeleton