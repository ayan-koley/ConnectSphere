import React, { useEffect } from 'react'
import Header from './components/Header/Header'
import SideBar from './components/SideBar/SideBar.jsx'
import { Outlet } from 'react-router-dom'
import { useAuth } from '@clerk/clerk-react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { login } from './store/authSlice.js'
import { fetchGlobalFeed } from './store/feedSlice.js'
import { setMode } from './store/themeSlice.js'
import { setReactions } from './store/reactionSlice.js'
import { setFollowing } from './store/followingSlice.js'

const App = () => {

  const { isSignedIn, getToken } = useAuth();
  const dispatch = useDispatch();
  const { status } = useSelector(state => state.authSlice);

  const getUserDetails = async() => {
      if(!status) {
        const token = await getToken();
        try {
          const profileDetails = await axios.get(`${import.meta.env.VITE_DB_URI}/api/v1/user/profile`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          
          dispatch(login(profileDetails.data?.data))
          toast.success("User Login Successfully");
        } catch (error) {
          toast.error(error.message);
        }
      }
  }
  const getReactions = async() => {
    try {
        const token = await getToken();
        const response = await axios.get(`${import.meta.env.VITE_DB_URI}/api/v1/reaction`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then(res => res.data.data);
        dispatch(setReactions({
          likedPostIds: response.likedPostIds,
          favoritedPostIds: response.favoritedPostIds

        }))
    } catch (err) {
        toast.error(err.message);
    }
  }
  const getFollowingIds = async() => {
      try {
          const token = await getToken();
          await axios.get(`${import.meta.env.VITE_DB_URI}/api/v1/relation/total`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }).then(res => dispatch(setFollowing(res.data.data)));
      } catch (err) {
        toast.error(err.message);
      }
    }
  // api call for get user details and also gate all reactions details
  useEffect(() => {
    const fetchData = async() => {
      await getUserDetails();
      await getReactions();
      await getFollowingIds();
    }
    if(isSignedIn) {
        fetchData();
    } 
    dispatch(fetchGlobalFeed())
  }, [isSignedIn])

  // api call for take theme mode
  useEffect(() => {
    const getMode = async() => {
      if(localStorage.getItem('theme')) {
          dispatch(setMode(localStorage.getItem('theme')));
          document.querySelector('html').className = localStorage.getItem('theme');
      } else {
        try {
          const token = await getToken();
          await axios.get(`${import.meta.env.VITE_DB_URI}/api/v1/user/setting/theme`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }).then(res => dispatch(setMode(res.data.data)));
        } catch (error) {
          toast.error(error.message);
        }
      }
    } 
    if(status) getMode();
  }, [status])


  return (
    <div className="min-h-screen bg-background px-5">
      <Header />
      <div className="flex flex-col md:flex-row py-0">
        <SideBar />
        <main className="flex-1 md:p-6">
          {/* It's work like Outlet */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default App
