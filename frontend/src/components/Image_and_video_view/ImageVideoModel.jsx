import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const mediaData = [
  { type: "image", src: "https://res.cloudinary.com/dlcxr1p9c/image/upload/v1723636083/samples/man-on-a-street.jpg" },
  { type: "image", src: "https://res.cloudinary.com/dlcxr1p9c/image/upload/v1723636082/samples/smile.jpg" },
  { type: "video", src: "https://res.cloudinary.com/dlcxr1p9c/video/upload/v1723636078/samples/dance-2.mp4" },
];

export default function ImageVideoModel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = mediaData.length;

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const currentMedia = mediaData[currentIndex];

  return (
    <Card className="w-full max-w-xl mx-auto mt-10 rounded-2xl shadow-lg overflow-hidden">
      <CardContent className="p-4 space-y-4">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <img src="/avatar.jpg" alt="Avatar" className="w-10 h-10 rounded-full" />
          <div>
            <p className="font-semibold">John Doe</p>
            <p className="text-sm text-muted-foreground">2 hours ago</p>
          </div>
        </div>

        {/* Post Text */}
        <p className="text-base">
          Feeling great today! Loving the views 🌄 #Nature #Inspiration @everyone
        </p>

        {/* Media Viewer */}
        <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
          {currentMedia.type === "image" ? (
            <img
              src={currentMedia.src}
              alt={`media-${currentIndex}`}
              className="object-cover w-full h-full"
            />
          ) : (
            <video
              src={currentMedia.src}
              controls
              className="w-full h-full object-cover"
            />
          )}

          {/* Left Arrow */}
          {total > 1 && (
            <Button
              onClick={goPrev}
              size="icon"
              variant="ghost"
              className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-black"
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
              className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-black"
            >
              <ChevronRight />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
