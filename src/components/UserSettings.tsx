"use client"

import { GetCurrentUserItemApiCall } from "@/Api/AWS/users/GetCurrentUser";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DarkModeToggle } from "@/components/ui/DarkModeToggle"
import { getCookie } from "@/Security/GetCookie";
import { PencilIcon, TrashIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { z } from "zod";
import { ErrorToast } from "./ErrorToast";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { UserInfoForm } from "./UserInfoForm";

export interface PersonInfo {
  email: string,
  family_name: string,
  given_name: string,
  'custom:user_type': string,
  'custom:museum_name': string
}

export const personInfoSchema = z.object({
  email: z.string(),
  family_name: z.string(),
  given_name: z.string(),
  'custom:user_type': z.string(),
  'custom:museum_name': z.string()
})

export interface ApiResponse {
  statusCode: number;
  body: PersonInfo;
}

export function UserSettings() {

  const [user, setUser] = useState<PersonInfo>();

  useEffect(() => {
    const fetchData = async () => {

        try {
            const accessToken = await getCookie("accessToken");

            if (!accessToken) {
                ErrorToast("Account not signed in.");
                setUser(personInfoSchema.parse({}));
                return;
            }

            const data = await GetCurrentUserItemApiCall({ accessToken: accessToken}) as ApiResponse;
            if (data.statusCode == 401) {
                // covered in inventorySnapshot
                return;
            }
            console.log('API RESPONSE USER INFO: ' + JSON.stringify(data.body))
            setUser(data.body);
        } catch (error) {
            console.log("Error fetching user:", error);
            ErrorToast("Server ran into an issue.");
        }
    };

    fetchData();
  }, []);

  return (
    <div className="flex">
      <span className="inline-flex items-center mr-4"><DarkModeToggle /></span>
      <div className="inline-flex items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Avatar>
              <AvatarImage src="/avatars/01.png" />
              <AvatarFallback>{(user === undefined ? "..." : (user?.given_name ?? "...").charAt(0) + user?.family_name.charAt(0))}</AvatarFallback>
            </Avatar>
          </SheetTrigger>
          <SheetContent>
            <div className="grid gap-6 p-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage alt="@shadcn" src="/placeholder-avatar.jpg" />
                  <AvatarFallback>{(user?.given_name ?? "...").charAt(0) + user?.family_name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h4 className="text-lg font-medium">{(user?.given_name ?? "...") + " " + user?.family_name}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email ?? "..."}</p>
                </div>
              </div>
              <UserInfoForm userInfo={user} />
            </div>
          </SheetContent>
        </Sheet>
        
      </div>
    </div>
  )
}



export default UserSettings;
