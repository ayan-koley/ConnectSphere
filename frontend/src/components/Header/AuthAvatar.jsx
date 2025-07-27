import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User } from "lucide-react"

import React from 'react'

const AuthAvatar = ({src, className}) => {
  return (
    <div>
        <Avatar className={`h-8 w-8 cursor-pointer ${className}`}>
            <AvatarImage src={src} />
            <AvatarFallback>
              <User className="h-4 w-4" />
            </AvatarFallback>
        </Avatar>
    </div>
  )
}

export default AuthAvatar