import React from 'react'
import ThemeChanger from './ThemeChanger'
import Logo from './Logo'
import { DropdownMenu } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"
import ProfileDropdown from './ProfileDropdown'
import { Search } from 'lucide-react'
import { useSelector } from 'react-redux';
import SearchBox from './SearchBox';

const Header = () => {

  const {userData, status} = useSelector(state => state.authSlice);

  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className='flex items-center space-x-2'>
            <Logo />
          </div>
          {/* Search - Hidden on mobile, visible on md+ */}
            <SearchBox />
          {/* Right section */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Search className="h-5 w-5" />
            </Button>
            {/* Theme Changer */}
            <ThemeChanger />

            <DropdownMenu>
              <ProfileDropdown status={status} src={userData?.image} />
            </DropdownMenu>
          </div>
        </div>
         {/* Mobile search bar */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="pl-10 bg-muted/50 border-border focus:border-ring"
            />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header