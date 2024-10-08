'use client'

import React from 'react';
import Image from "next/image"
import car from "@/app/car_logo.png"
import car_dark from "@/app/car_logo_dark.png"
import { usePathname } from 'next/navigation'
import { AreaChart, LayoutDashboard, Car, ClipboardList, Ticket, LogOut } from 'lucide-react';
import Link from 'next/link';
import { ResizablePanel, ResizablePanelGroup } from '../ui/resizable';
import { Separator } from '../ui/separator';
import { LogInApiCall } from '@/Api/AWS/authentication/LogInApiCall';
import { SignOutApiCall } from '@/Api/AWS/authentication/SignOutApiCall';
import { DeleteCookie } from '@/Security/DeleteCookie';
import { toast } from '../ui/use-toast';
import { useTheme } from "next-themes"

export interface Links {
    link: string;
    name: string;
    icon: React.ReactNode;
}

// get current pathname to change icon color
export function GetPathname() {
    const pathname = usePathname()
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
    const { theme } = useTheme()

    return (
        <main className='border w-full bg-card'>
            <ResizablePanelGroup direction="vertical">
               <LogoSection theme={theme} />
                <div className='h-[1px]'></div>
                <Separator />
                <LinksSection />
            </ResizablePanelGroup>
        </main>
  );
}
export default SideBar;

const LogoSection = ({ theme }: { theme: string | undefined }) => (
    <ResizablePanel defaultSize={10} className="flex h-full items-center justify-center px-4">
        <div className=" py-2">
            <Image src={theme == 'light' ? car_dark : car} alt={"Car Image"} style={{ width: 'auto', height: 'auto' }}></Image>
        </div>
    </ResizablePanel>
);

const LinksSection = () => {
    const pathname = GetPathname();

    async function handleSignOut() {
        const response = await SignOutApiCall() as { statusCode: number, body: string };
        DeleteCookie("accessToken")
    }

    return (
        <ResizablePanel defaultSize={90} className="flex flex-col space-y-4 items-center pt-4">
            {works.map((links) => {
                return (
                    <figure key={links.link}>
                        {links.name === "Sign Out" ? (
                            <Link className={`flex items-center gap-2 w-[130px] font-semibold py-1 px-1 rounded hover:bg-accent`} onClick={handleSignOut} href={links.link}>
                                <p>{links.icon}</p>
                                <p>{links.name}</p>
                            </Link>
                        ) : (
                            <Link className={`flex items-center gap-2 w-[130px] font-semibold py-1 px-1 rounded ${pathname.props.children === links.link ? 'bg-accent' : 'hover:bg-accent'}`} href={links.link}>
                                <p>{links.icon}</p>
                                <p>{links.name}</p>
                            </Link>
                        )}
                    </figure>
                );
            })}
        </ResizablePanel>
    );
}
