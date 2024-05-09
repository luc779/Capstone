import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

export interface People {
    initials: string;
}

// TODO: get employees from Database
export const works: People[] = [
    {
        initials: "CN"
    },
    {
        initials: "BC"
    },
    {
        initials: "LF"
    },
    {
        initials: "LF"
    },
    {
        initials: "LF"
    },
    {
        initials: "LF"
    },
    {
        initials: "LF"
    },
    {
        initials: "LF"
    },
    {
        initials: "LF"
    },
    {
        initials: "LF"
    },
    {
        initials: "LF"
    },
    {
        initials: "LF"
    },
    {
        initials: "LF"
    },
    {
        initials: "LF"
    }
]

function getInitials(name: string) {
    return name
        .split(" ")
        .map((word) => word.charAt(0))
        .join("");
}

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

// returns a card that displays in a horizontal list the employees, has an avatar icon above and the initials underneath
function Employees() {
  return (
    <Card className="h-full overflow-auto">
        <CardHeader>
            <CardTitle>Team Members</CardTitle>
            <CardDescription>View of all Employees.</CardDescription>
        </CardHeader>
        <CardContent>
            <ScrollArea className="whitespace-nowrap rounded-md">
                <div className="flex w-max space-x-6">
                    {works.map((people) => (
                        // <figure key={people.initials} className="flex flex-col items-center justify-center">
                        //     <Avatar>
                        //         <AvatarImage src="https://github.com/shadcn" />
                        //         <AvatarFallback>{people.initials}</AvatarFallback>
                        //     </Avatar>
                        //     <span className="ml-1">{people.initials}</span>
                        // </figure>
                        <div className="flex flex-col items-center gap-3">
                            <Avatar>
                                <AvatarImage alt="John Doe" src="/avatars/01.png" />
                                <AvatarFallback>{people.initials}</AvatarFallback>
                            </Avatar>
                            <div className="text-center">
                                <p className="font-medium">John Doe</p>
                            </div>
                        </div>
                    ))}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </CardContent>
    </Card>
  );
}

export default Employees;