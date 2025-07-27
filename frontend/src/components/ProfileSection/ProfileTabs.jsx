import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from '@/components/ui/card';
import { Grid3X3, Bookmark, Tag, Heart, MessageCircle } from 'lucide-react';
import { Link, Outlet } from 'react-router-dom';

const ProfileTabs = () => {

    

const post1 = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop";
const post2 = "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=300&fit=crop";
const post3 = "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=300&fit=crop";
const post4 = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop";
const post5 = "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=300&fit=crop";
const post6 = "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=300&fit=crop";
const posts = [
    { id: 1, image: post1, likes: 124, comments: 18 },
    { id: 2, image: post2, likes: 89, comments: 12 },
    { id: 3, image: post3, likes: 256, comments: 34 },
    { id: 4, image: post4, likes: 178, comments: 23 },
    { id: 5, image: post5, likes: 98, comments: 15 },
    { id: 6, image: post6, likes: 145, comments: 27 },
    { id: 7, image: post1, likes: 67, comments: 9 },
    { id: 8, image: post3, likes: 203, comments: 31 },
    { id: 9, image: post5, likes: 134, comments: 19 }
  ];

  const [tab, setTab] = React.useState("posts");
  return (
        <Tabs value={tab} onValueChange={(e) => {setTab(e)}} className="w-full">
            <TabsList className="w-full ">
                <TabsTrigger 
                value="posts" 
                className="cursor-pointer"
                >
                    <Grid3X3 className="w-4 h-4 mr-2" />
                </TabsTrigger>
                <TabsTrigger 
                value="tagged" 
                className="cursor-pointer"
                >
                    <Tag className="w-4 h-4 mr-2" />
                </TabsTrigger>
            </TabsList>

            {/* Posts Grid */}
            <TabsContent value="posts" className="mt-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                    <Link key={post.id} to={"/post/id"}>
                        <Card 
                    
                    className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.02] glass-card p-0 cursor-pointer"
                    >
                    <CardContent className="p-0 relative">
                        <div className="aspect-square overflow-hidden">
                        <img 
                            src={post.image} 
                            alt={`Post ${post.id}`}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        </div>
                        
                        {/* Hover overlay with glass effect */}
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                        <div className="flex items-center gap-6 text-white">
                            <div className="flex items-center gap-2">
                            <Heart className="w-5 h-5 fill-white" />
                            <span className="font-bold text-lg">{post.likes}</span>
                            </div>
                            <div className="flex items-center gap-2">
                            <MessageCircle className="w-5 h-5 fill-white" />
                            <span className="font-bold text-lg">{post.comments}</span>
                            </div>
                        </div>
                        </div>
                    </CardContent>
                    </Card>
                    </Link>
                ))}
                </div>
            </TabsContent>

            <TabsContent value="tagged" className="mt-8">
                <Card className="glass-card border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-16">
                    <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-4">
                    <Tag className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">No tagged posts yet</h3>
                    <p className="text-muted-foreground text-center max-w-md">
                    When someone tags you in a post, it will appear here.
                    </p>
                </CardContent>
                </Card>
            </TabsContent>
            

        </Tabs>
  )
}

export default ProfileTabs