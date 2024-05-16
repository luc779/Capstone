"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DarkModeToggle } from "@/components/ui/DarkModeToggle"
import { PencilIcon, TrashIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

export function UserSettings() {
  return (
    <div className="flex">
      <span className="inline-flex items-center mr-4"><DarkModeToggle /></span>
      <div className="inline-flex items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>Me</AvatarFallback>
            </Avatar>
          </SheetTrigger>
          <SheetContent>
            <div className="grid gap-6 p-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage alt="@shadcn" src="/placeholder-avatar.jpg" />
                  <AvatarFallback>JP</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h4 className="text-lg font-medium">Jared Palmer</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">jared@acme.inc</p>
                </div>
              </div>
              {/* add form here */}
            </div>
          </SheetContent>
        </Sheet>
        
      </div>
    </div>
  )
}



export default UserSettings;
