import React from 'react'
import { Home, Search, MessageCircle, Heart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink } from 'react-router-dom';

const SideBar = () => {
    const menuItems = [
    { id: "home", label: "Home", icon: Home, path: "/" },
    // { id: "explore", label: "Explore", icon: Search },
    { id: "messages", label: "Messages", icon: MessageCircle, path: "/message" },
    { id: "favorites", label: "Favorites", icon: Heart, path: "/favorites" },
    { id: "profile", label: "Profile", icon: User, path: "/profile" },
  ];
  return (
    <aside className="w-80 h-screen sticky top-22 p-5 border-r border-border bg-card rounded-xl ">
        {/* change later when use react-router-dom */}
        <nav className='space-y-2'>
            
            {
                menuItems.map((item) => (
                    <NavLink
                        to={item.path}
                        key={item.id}
                        className={({isActive}) => `${isActive && 'bg-accent'} flex w-full justify-start text-left font-normal  my-4 rounded-md cursor-pointer px-5 py-2 hover:bg-accent text-accent-foreground`}
                        >
                            <item.icon className="mr-3 h-5 w-5" />
                        {item.label}
                    </NavLink>
                ))
            }
        </nav>
    </aside>
  )
}

export default SideBar