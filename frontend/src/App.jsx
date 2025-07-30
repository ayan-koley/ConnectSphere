import React, { useEffect } from 'react'
import Header from './components/Header/Header'
import HomePage from './Pages/HomePage.jsx'
import SideBar from './components/SideBar/SideBar.jsx'
import { Outlet } from 'react-router-dom'
import { useAuth, useUser } from '@clerk/clerk-react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { login } from './store/authSlice.js'
import { fetchGlobalFeed } from './store/feedSlice.js'
import { setMode } from './store/themeSlice.js'

const App = () => {

  const { isSignedIn, getToken } = useAuth();
  const dispatch = useDispatch();
  const { status } = useSelector(state => state.authSlice);

  const getUserDetails = async() => {
      if(!status) {
        const token = await getToken();
        try {
          const profileDetails = await axios.get('http://localhost:5000/api/v1/user/profile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          dispatch(fetchGlobalFeed(token))
          dispatch(login(profileDetails.data?.data))
          toast.success("User Login Successfully");
        } catch (error) {
          toast.error(error.message);
        }
      }
  }

  useEffect(() => {
    const fetchData = async() => {
      await getUserDetails();
    }
    if(isSignedIn) {
        fetchData();
    }
    
  }, [isSignedIn])

  useEffect(() => {
      const func = async() => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_DB_URI}/api/v1/health`);
        } catch (error) {
          console.error(error.message);
        }
      }
      func();
  }, [status]);

  useEffect(() => {
    const getMode = async() => {
      if(localStorage.getItem('theme')) {
          dispatch(setMode(localStorage.getItem('theme')));
          document.querySelector('html').className = localStorage.getItem('theme');
      } else {
        try {
          const response = await axios.get(`${import.meta.env.VITE_DB_URI}/api/v1/user/setting/theme`).then(res => dispatch(setMode(res.data.data)));
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
