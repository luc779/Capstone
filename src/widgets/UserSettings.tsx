"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Toggle } from "@/components/ui/Toggle"

export function UserSettings() {

  return (
    <div className="flex">
      <span className="inline-flex items-center mr-4"><Toggle /></span>
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
