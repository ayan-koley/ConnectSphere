import React from 'react'
import { Home, Search, MessageCircle, Heart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux'

const SideBar = () => {
    const userData = useSelector(state => state.authSlice?.userData);
    const menuItems = [
    { id: "home", label: "Home", icon: Home, path: "/" },
    // { id: "explore", label: "Explore", icon: Search },
    // { id: "messages", label: "Messages", icon: MessageCircle, path: "/message" },
    { id: "favorites", label: "Favorites", icon: Heart, path: "/favorites" },
    { id: "profile", label: "Profile", icon: User, path: `/profile/${userData?._id}` },
  ];
  return (
    <>
        <aside className="hidden md:block w-auto md:w-80 h-screen sticky top-22 md:p-5 border-r border-border bg-card rounded-xl ">
        {/* change later when use react-router-dom */}
        <nav className='space-y-2'>
            
            {
                menuItems.map((item) => (
                    <NavLink
                        to={item.path}
                        key={item.id}
                        className={({isActive}) => `${isActive && 'bg-accent'} flex w-full justify-start text-left font-normal  my-4 rounded-md cursor-pointer px-5 py-2 hover:bg-accent text-accent-foreground`}
                        >
                            <item.icon className="md:mr-3 md:h-5 md:w-5" />
                            <div className='hidden md:block'>
                                {item.label}
                            </div>
                    </NavLink>
                ))
            }
        </nav>
    </aside>
    <div className='md:hidden flex justify-between mx-3'>
        {
            menuItems.map((item) => (
                <NavLink
                    to={item.path}
                    key={item.id}
                    className={({isActive}) => `${isActive && 'bg-accent'} flex w-fit justify-start text-left font-normal  my-4 rounded-md cursor-pointer px-5 py-2 hover:bg-accent text-accent-foreground`}
                    >
                        <item.icon className="md:mr-3 md:h-5 md:w-5" />
                </NavLink>
            ))
        }
    </div>
    </>

  )
}

export default SideBar