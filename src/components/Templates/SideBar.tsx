'use client'

import React from 'react';
import Image from "next/image"
import car from "@/app/car_logo.png"
import { usePathname } from 'next/navigation'
import { AreaChart, LayoutDashboard, Car, ClipboardList, Ticket, LogOut } from 'lucide-react';
import Link from 'next/link';
import { ResizablePanel, ResizablePanelGroup } from '../ui/resizable';
import { Separator } from '../ui/separator';

export interface Links {
    link: string;
    name: string;
    icon: React.ReactNode;
}

// get current pathname to change icon color
export function GetPathname() {
    const pathname = usePathname()
    console.log("Pathname: " + pathname.toString())
    return <p>{pathname}</p>
}

const ICON_SIZE = 25

// the software has these links 
export const works: Links[] = [
    {
        link: "/Dashboard",
        name: "Dashboard",
        icon: <LayoutDashboard className='text-primary' size={ICON_SIZE}/>
    }, 
    {
        link: "/Sales",
        name: "Sales",
        icon: <AreaChart className='text-primary' size={ICON_SIZE}/>
    },
    {
        link: "/Inventory",
        name: "Inventory",
        icon: <Car className='text-primary' size={ICON_SIZE}/>
    },
    {
        link: "/Events",
        name: "Events",
        icon: <Ticket className='text-primary' size={ICON_SIZE}/>
    },
    {
        link: "/Tasks",
        name: "Tasks",
        icon: <ClipboardList className='text-primary' size={ICON_SIZE}/>
    },
    {
        link: "/",
        name: "Sign Out",
        icon: <LogOut className='text-primary' size={ICON_SIZE}/>
    }
]

function SideBar() {
  return (
    <main className='border w-full bg-card'>
        <ResizablePanelGroup direction="vertical">
            <LogoSection />
            <div className='h-[1px]'></div>
            <Separator />
            <LinksSection />
        </ResizablePanelGroup>
    </main>
  );
}
export default SideBar;

const LogoSection = () => (
    <ResizablePanel defaultSize={10} className="flex h-full items-center justify-center px-4">
        <div className=" border border-black bg-black dark:border-card rounded-lg dark:bg-card py-2">
            <Image src={car} alt={"Car Image"} style={{ width: 'auto', height: 'auto' }}></Image>
        </div>
    </ResizablePanel>
);

const LinksSection = () => {
    const pathname = GetPathname();

    return (
        <ResizablePanel defaultSize={90} className="flex flex-col space-y-4 items-center pt-4">
            {works.map((links) => {
                return (
                    <figure key={links.link}>
                        <Link className={`flex items-center gap-2 w-[130px] font-semibold py-1 px-1 rounded ${pathname.props.children === links.link ? 'bg-accent' : 'hover:bg-accent'}`} href={links.link}>
                            <p>{links.icon}</p>
                            <p>{links.name}</p>
                        </Link>
                    </figure>
                );
            })}
        </ResizablePanel>
    );
}
