import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"

const UserSkeleton = () => {
  return (
    <div className='flex gap-3'>
        <Skeleton className="h-10 w-10 rounded-full" />
        <div>
            <Skeleton className="h-3 w-20 mb-2" />
            <Skeleton className="h-3 w-15" />
        </div>
    </div>
  )
}

export default UserSkeleton