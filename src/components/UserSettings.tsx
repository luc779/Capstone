"use client"

import { GetCurrentUserItemApiCall } from "@/Api/AWS/users/GetCurrentUser";
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DarkModeToggle } from "@/components/ui/DarkModeToggle"
import { getCookie } from "@/Security/GetCookie";
import { useEffect, useState } from "react";
import { z } from "zod";
import { ErrorToast } from "./ErrorToast";
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
            setUser(data.body);
        } catch (error) {
            console.error("Error fetching user:", error);
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
              <AvatarFallback>
                {user && user.given_name && user.family_name ? 
                user.given_name.charAt(0) + user.family_name.charAt(0) : 
                "..."}
              </AvatarFallback>
            </Avatar>
          </SheetTrigger>
          <SheetContent className="pb-10">
            <div className=" p-6 h-full">
              <div className="flex gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback>
                    {user && user.given_name && user.family_name ? 
                    user.given_name.charAt(0) + user.family_name.charAt(0) : 
                    "..."}  
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h4 className="text-lg font-medium">{(user?.given_name ?? "...") + " " + user?.family_name}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email ?? "..."}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{user?.["custom:user_type"] ?? "..."}</p>
                </div>
              </div>
              <UserInfoForm userInfo={user} />
            </div>
            <p><strong>Museum Name:</strong> {user?.["custom:museum_name"]}</p>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}



export default UserSettings;
