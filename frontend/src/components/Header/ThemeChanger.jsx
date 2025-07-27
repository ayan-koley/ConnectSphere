import React, { useState } from 'react'
import { Moon, Sun } from 'lucide-react';
import { Button } from "@/components/ui/button"

const ThemeChanger = () => {
    const [ theme, setTheme ] = useState("dark")
    const toggleTheme = () => {
        // api call korbe
        if(theme === "dark") {
            setTheme("light")
        }   else {
            setTheme("dark")
        }
    }
  return ( 
    <div>
        <Button onClick={toggleTheme} variant="ghost" size="icon" className="cursor-pointer">
            {theme === "dark"? 
            <Moon className='h-5 w-5' /> :
            <Sun className='h-5 w-5' />}
        </Button>
    </div>
  )
}

export default ThemeChanger