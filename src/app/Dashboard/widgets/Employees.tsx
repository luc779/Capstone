"use client"

import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { getCookie } from '@/Security/GetCookie';
import { AuthenticationErrorToast, ErrorToast } from '@/components/ErrorToast';
import { z } from 'zod';
import { GetMembersItemApiCall } from '@/Api/AWS/members/GetMembers';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { useRouter } from "next/navigation";

export interface People {
    given_name: string,
    family_name: string,
    user_type: string,
}

export const peopleSchema = z.object({
    given_name: z.string(),
    family_name: z.string(),
    user_type: z.string(),
})

export interface ApiResponse {
    statusCode: number;
    body: People[];
}

// returns a card that displays in a horizontal list the employees, has an avatar icon above and the initials underneath
function Employees() {
    const router = useRouter();
    const [members, setMembers] = useState<People[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {

            try {
                const accessToken = await getCookie("accessToken");

                if (!accessToken) {
                    ErrorToast("Account not signed in.");
                    setMembers(z.array(peopleSchema).parse(JSON.parse("[]")))
                    setLoading(false);
                    return;
                }

                const data = await GetMembersItemApiCall({ accessToken: accessToken}) as ApiResponse;
                if (data.statusCode == 401) {
                    // covered in inventorySnapshot
                    return;
                }
                const sortedMembers = [...data.body].sort((a, b) => {
                    if (a.user_type === 'Admin' && b.user_type !== 'Admin') return -1;
                    if (a.user_type !== 'Admin' && b.user_type === 'Admin') return 1;
                    return 0;
                });
                setMembers(sortedMembers);
                setLoading(false);
            } catch (error) {
                console.log("Error fetching employees:", error);
                ErrorToast("Server ran into an issue.");
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>Team Members</CardTitle>
            </CardHeader>
            <CardContent>
                <ScrollArea className="whitespace-nowrap pb-2">
                    {loading ? (
                        <div className="flex w-max space-x-6">
                            {members.map((people) => (
                                <div key={people.given_name + people.family_name} className="flex flex-col items-center gap-2">
                                    <Avatar>
                                        <AvatarImage alt="John Doe" src="/avatars/01.png" />
                                        <AvatarFallback>{people.given_name.charAt(0) + people.family_name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="text-center">
                                        <p className="font-medium">{people.given_name + " " + people.family_name}</p>
                                        <p>{people.user_type}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex w-max space-x-6">
                            <div className="flex flex-col items-center gap-2">
                                <Avatar className="animate-pulse bg-gray-200">
                                    <AvatarImage alt="John Doe" src="/avatars/01.png" />
                                    <AvatarFallback></AvatarFallback>
                                </Avatar>
                                <div className="text-center items-center">
                                    <div className="h-1"></div>
                                    <div className="animate-pulse h-5 bg-gray-200 rounded-md w-20"></div>
                                    <div className="h-1"></div>
                                    <div className="animate-pulse h-5 bg-gray-200 rounded-md w-20"></div>
                                </div>
                            </div>
                        </div>
                    )}
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </CardContent>
        </Card>
    );
}

export default Employees;