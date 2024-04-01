'use client'

import React from 'react';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { usePathname } from 'next/navigation'

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Button } from "@/components/ui/button"
import { AreaChart, LayoutDashboard, Car, ClipboardList, Ticket, LogOut } from 'lucide-react';
import Link from 'next/link';

export interface Links {
    link: string;
    icon: React.ReactNode;
}

// attempt to get current pathname to change icon color
export function ExampleClientComponent() {
    const pathname = usePathname()
    return <p>{pathname}</p>
}

// the software has these links 
export const works: Links[] = [
    {
        link: "/Dashboard",
        icon: <LayoutDashboard className='text-primary'/>
    }, 
    {
        link: "/Sales",
        icon: <AreaChart className='text-primary'/>
    },
    {
        link: "/Inventory",
        icon: <Car className='text-primary'/>
    },
    {
        link: "/Events",
        icon: <Ticket className='text-primary'/>
    },
    {
        link: "/Tasks",
        icon: <ClipboardList className='text-primary'/>
    },
    {
        link: "/",
        icon: <LogOut className='text-primary'/>
    }
]

// a card component which holds hovercard components for each link allowing an animation
function SideBar() {
  return (
    <Card className="h-full w-full overflow-auto">
        <CardContent className="grid p-10 gap-10 justify-center h-full">
            {works.map((links) => (
                <figure key={links.link}>
                    <span>
                        <HoverCard>
                            <HoverCardTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <Link href={links.link}>
                                        {links.icon}
                                    </Link>
                                </Button>
                            </HoverCardTrigger>
                        </HoverCard>
                    </span>
                </figure>
            ))}
        </CardContent>
    </Card>
  );
}
export default SideBar;