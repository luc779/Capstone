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

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

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
    name: string;
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
        name: "Dashboard",
        icon: <LayoutDashboard className='text-primary' size="30"/>
    }, 
    {
        link: "/Sales",
        name: "Sales",
        icon: <AreaChart className='text-primary' size="30"/>
    },
    {
        link: "/Inventory",
        name: "Inventory",
        icon: <Car className='text-primary' size="30"/>
    },
    {
        link: "/Events",
        name: "Events",
        icon: <Ticket className='text-primary' size="30"/>
    },
    {
        link: "/Tasks",
        name: "Tasks",
        icon: <ClipboardList className='text-primary' size="30"/>
    },
    {
        link: "/",
        name: "Sign Out",
        icon: <LogOut className='text-primary' size="30"/>
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
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    {/* <Button variant="ghost" size="icon">  add  WAF find what constitues PII OPA open policy agent, AVP allows users to access certain things*/}
                                    <Link href={links.link} className="hover:text-foreground">
                                        {links.icon}
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent>
                                <p>{links.name}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </span>
                </figure>
            ))}
        </CardContent>
    </Card>
  );
}
export default SideBar;