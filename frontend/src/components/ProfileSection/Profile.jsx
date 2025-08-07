import React, { useEffect, useState, useTransition } from "react";
import ProfileDetails from "./ProfileDetails";
import { Separator } from "@/components/ui/separator";
import ProfileTabs from "./ProfileTabs";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const Profile = ({ userId }) => {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();
  const [isPending, startTransition] = useTransition();
  const [userData, setUserData] = useState({});
  const [posts, setPosts] = useState([]);
  const [mentionPost, setMentionPost] = useState([]);
  const { status } = useSelector((state) => state.authSlice);
  if (!status) {
    return navigate("/sign-in");
  }
  const fetchDashboardData = async () => {
    startTransition(async () => {
      try {
        const response = await axios
          .get(`${import.meta.env.VITE_DB_URI}/api/v1/dashboard/${userId}`)
          .then((res) => res.data);
        setUserData(response.data[0]);
        setPosts(response.data[0].posts);
        setMentionPost(response.data[0].mentionPosts);
      } catch (err) {
        toast.error(err.message);
      }
    });
  };

  useEffect(() => {
    if (isSignedIn) {
      const fetchData = async () => {
        await fetchDashboardData();
      };
      fetchData();
    }
  }, [userId]);

  return (
    <div className="min-h-screen bg-background">
      <ProfileDetails userData={userData} isPending={isPending} />
      <Separator className="mb-8" />
      <ProfileTabs
        posts={posts}
        mentionPost={mentionPost}
        isPending={isPending}
      />
    </div>
  );
};

export default Profile;
