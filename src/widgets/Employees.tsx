import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

export interface People {
    initials: string;
}

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

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

function Employees() {
  return (
    <Card className="h-full overflow-auto">
        <CardHeader>
            <CardTitle>Team Members</CardTitle>
        </CardHeader>
        <CardContent>
            <ScrollArea className="whitespace-nowrap rounded-md">
                <div className="flex w-max space-x-6">
                    {works.map((people) => (
                    <figure key={people.initials}>
                        <span>
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>{people.initials}</AvatarFallback>
                            </Avatar>
                            {people.initials}
                        </span>
                    </figure>
                    ))}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </CardContent>
    </Card>
  );
}
// flex items-center space-x-4 rounded-md border p-4
export default Employees;