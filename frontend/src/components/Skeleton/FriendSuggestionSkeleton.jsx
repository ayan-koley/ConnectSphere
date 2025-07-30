import React from 'react'
import UserSkeleton from './UserSkeleton';
import { Skeleton } from "@/components/ui/skeleton"

const FriendSuggestionSkeleton = () => {
    const array = [0, 1, 2,3, 4, 5];
  return (
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
  )
}

export default FriendSuggestionSkeleton