import React from 'react'
import { mockPosts } from '../mockData.js';
import CreatePost from "../components/CreatePost/CreatePost.jsx";
import PostCard from "../components/PostCard/PostCard.jsx";
import FriendSuggestion from '../components/FriendSuggestion/FriendSuggestion.jsx';
import { useSelector } from 'react-redux';

const HomePage = () => {
    const posts = useSelector(state => state.feedSlice.posts)
return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {/* Main Feed */}
        <div className="lg:col-span-2">
            <CreatePost />
            <div className="space-y-4">
            {posts?.map((post) => (
                <div key={post._id}>
                    <PostCard  post={post} />
                </div>
            ))}
            </div>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-1">
            <div className="sticky top-20">
            <FriendSuggestion />
            </div>
        </div>
    </div>
)
}

export default HomePage;