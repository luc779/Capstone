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

export function ExampleClientComponent() {
    const pathname = usePathname()
    return <p>{pathname}</p>
}

export const works: Links[] = [
    {
        link: "/Dashboard",
        icon: <LayoutDashboard style={{ color: '#7C3AED'}}/>
    }, 
    {
        link: "/Sales",
        icon: <AreaChart style={{ color: '#7C3AED' }}/>
    },
    {
        link: "/Inventory",
        icon: <Car style={{ color: '#7C3AED' }}/>
    },
    {
        link: "/Events",
        icon: <Ticket style={{ color: '#7C3AED' }}/>
    },
    {
        link: "/Tasks",
        icon: <ClipboardList style={{ color: '#7C3AED' }}/>
    },
    {
        link: "/",
        icon: <LogOut style={{ color: '#7C3AED' }}/>
    }
]

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