import React, { useEffect, useState } from 'react'
import {Button} from '@/components/ui/button.tsx'
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PostMediaCard = ({mediaData=[]}) => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const total = mediaData.length;
    
    const goNext = () => {
        setCurrentIndex((prev) => (prev + 1) % total);
    };
    
    const goPrev = () => {
        setCurrentIndex((prev) => (prev - 1 + total) % total);
    };

    let currentMedia = mediaData[currentIndex]

  return mediaData && mediaData.length > 0 && (
    <div className='mt-3'>
        {/* Media Viewer */}
        <div className="relative max-w-2xl aspect-video bg-black rounded-lg overflow-hidden">
        {currentMedia?.url.includes('.mp4') ? (
            <video
            src={currentMedia.url}
            controls
            className="w-full h-full object-cover"
            />
        ) : (
            <img
            src={currentMedia.url}
            alt={`media-${currentIndex}`}
            className="object-cover w-full h-full"
            />
        )}

        {/* Left Arrow */}
        {total > 1 && (
            <Button
            onClick={goPrev}
            size="icon"
            variant="ghost"
            className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-black cursor-pointer"
            >
            <ChevronLeft />
            </Button>
        )}

        {/* Right Arrow */}
        {total > 1 && (
            <Button
            onClick={goNext}
            size="icon"
            variant="ghost"
            className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-black cursor-pointer"
            >
            <ChevronRight />
            </Button>
        )}
        </div>
    </div>
  )
}

export default PostMediaCard