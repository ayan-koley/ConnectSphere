import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Grid3X3, Tag } from 'lucide-react';
import PostCard from '../PostCard/PostCard';
import { Link } from 'react-router-dom';
import AuthAvatar from '../Header/AuthAvatar';

const SearchItems = () => {
    const users = useSelector(state => state.search.results.users);
    const posts = useSelector(state => state.search.results.posts);
    const [tab, setTab] = useState("users")

  return (
        <div>
            <Tabs value={tab} onValueChange={(e) => {setTab(e)}} className="w-full">
                <TabsList className="w-full ">
                    <TabsTrigger 
                    value="users" 
                    className="cursor-pointer"
                    >
                        <Grid3X3 className="w-4 h-4 mr-2" />
                    </TabsTrigger>
                    <TabsTrigger 
                    value="posts" 
                    className="cursor-pointer"
                    >
                        <Tag className="w-4 h-4 mr-2" />
                    </TabsTrigger>
                </TabsList>

                {/* Posts Grid */}
                <TabsContent value="users" className="mt-8">
                    <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6">
                        {users.length > 0 ? users.map((u) => (
                            <Link key={u.userId} to={`/profile/${u.userId}`} className='p-5 border rounded-xl'>
                                <div className='flex gap-5 items-center'>
                                    <div>
                                        <AuthAvatar src={u.user.image} />
                                    </div>
                                    <div>
                                        <p>{u.firstName} {u.lastName}</p>
                                        <p>{u.username}</p>
                                    </div>
                                </div>
                            </Link>
                        )) : (
                            <div className='w-full h-screen flex items-center justify-center'>
                                <h1>User Not Found</h1>
                            </div>
                        )}
                    </div>
                </TabsContent>

                <TabsContent value="posts" className="mt-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.length > 0 ? posts.map((post) => (
                        <div key={post._id} >
                            <PostCard post={post} />
                        </div>
                    )) : (
                        <div className='w-full h-screen flex items-center justify-center'>
                            <h1>Post Not Found</h1>
                        </div>
                    )}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
  )
}

export default SearchItems