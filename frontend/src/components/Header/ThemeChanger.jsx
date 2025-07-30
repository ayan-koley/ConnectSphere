import React, { useState } from 'react'
import { Moon, Sun } from 'lucide-react';
import { Button } from "@/components/ui/button"
import axios from 'axios';
import { toggleMode } from '../../store/themeSlice';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const ThemeChanger = () => {
    const mode = useSelector(state => state.theme.mode);
    const dispatch = useDispatch();
    const toggle = async() => {
        try {
            dispatch(toggleMode());
            await axios.patch(`${import.meta.env.VITE_DB_URI}/api/v1/user/setting/toggle/theme`)
        } catch (err) {
            toast.error(err.message);
        }
    }
  return ( 
    <div>
        <Button onClick={async() => await toggle()} variant="ghost" size="icon" className="cursor-pointer">
            {mode === "dark"? 
            <Moon className='h-5 w-5' /> :
            <Sun className='h-5 w-5' />}
        </Button>
    </div>
  )
}

export default ThemeChanger