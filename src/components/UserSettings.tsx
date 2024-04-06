"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DarkModeToggle } from "@/components/ui/DarkModeToggle"

export function UserSettings() {
  return (
    <div className="flex">
      <span className="inline-flex items-center mr-4"><DarkModeToggle /></span>
      <div className="inline-flex items-center">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>Me</AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}

export default UserSettings;
