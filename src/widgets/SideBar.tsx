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
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"

import { Button } from "@/components/ui/button"

import { AreaChart, LayoutDashboard, Car, ClipboardList, Ticket, LogOut } from 'lucide-react';
import { link } from 'fs';

export interface Links {
    link: string;
    icon: React.ReactNode;
}

export const works: Links[] = [
    {
        link: "#",
        icon: <LayoutDashboard />
    }, 
    {
        link: "#",
        icon: <AreaChart style={{ color: '#7C3AED' }}/>
    },
    {
        link: "#",
        icon: <Car style={{ color: '#7C3AED' }}/>
    },
    {
        link: "#",
        icon: <Ticket style={{ color: '#7C3AED' }}/>
    },
    {
        link: "#",
        icon: <ClipboardList style={{ color: '#7C3AED' }}/>
    },
    {
        link: "#",
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
                                    <a href={links.link}>
                                        {links.icon}
                                    </a>
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