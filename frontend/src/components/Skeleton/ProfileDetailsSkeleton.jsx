import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"

const ProfileDetailsSkeleton = () => {
  return (
    <div>
        <div className='flex flex-col gap-4 items-center justify-center p-5'>
            <div className='flex flex-col md:flex-row items-center gap-5'>
                <div>
                    <Skeleton className="h-40 w-40 rounded-full" />
                </div>
                <div className='flex flex-col gap-5'>
                    <div className='flex flex-col gap-3'>
                        <div className='flex gap-5'>
                            <Skeleton className="w-35 h-10" />
                            <Skeleton className="w-30 md:w-20  h-10" />
                        </div>
                        <Skeleton className="md:w-30 h-8" />
                        
                    </div>
                    <div className='flex gap-5'>
                        <Skeleton className="w-20 h-10" />
                        <Skeleton className="w-20 h-10" />
                        <Skeleton className="w-20 h-10" />
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-3'>
                <Skeleton className="md:w-xl h-3" />
                <Skeleton className="md:w-md h-3" />
                <Skeleton className="w-xs h-3" />
            </div>
        </div>
    </div>
  )
}

export default ProfileDetailsSkeleton