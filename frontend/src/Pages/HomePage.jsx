import React from 'react'
import { mockPosts } from '../mockData.js';
import CreatePost from "../components/CreatePost/CreatePost.jsx";
import PostCard from "../components/PostCard/PostCard.jsx";
import FriendSuggestion from '../components/FriendSuggestion/FriendSuggestion.jsx';
import { useSelector } from 'react-redux';
import HomePageSkeleton from '../components/Skeleton/HomePageSkeleton.jsx';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
     const navigate = useNavigate();
    const posts = useSelector(state => state.feedSlice.posts)
return posts && posts.length > 0 ? (
    // grid grid-cols-1 lg:grid-cols-3
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {/* Main Feed */}
            <div className="lg:col-span-2">
                <CreatePost />
                <div className="space-y-4">
                {posts?.map((post) => (
                    <div key={post._id} >
                        <PostCard  post={post} />
                    </div>
                ))}
                </div>
            </div>

            {/* Right Sidebar */}
            <div>
                <div className="sticky top-20">
                <FriendSuggestion />
                </div>
            </div>
        </div>
    ) : (
        <HomePageSkeleton />
    )
}

export default HomePage;