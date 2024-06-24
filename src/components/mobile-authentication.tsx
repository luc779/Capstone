'use client'
import Link from "next/link"
import { useTheme } from "next-themes"
import Image from "next/image"
import car from "../app/car_logo.png"
import car_dark from "../app/car_logo_dark.png"
import { MobileNav } from "./mobile-nav"
import { ReactNode, useEffect, useState } from 'react';

interface MobileSignInProps {
    children: ReactNode;
  }

export const MobileAuthentication = ({ children}: MobileSignInProps) => {
    const { theme } = useTheme();

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="relative sm:hidden">
            <div className="sm:hidden absolute top-0 left-0 w-full flex items-center px-4 md:px-6 z-10">
                <Link className="mr-6 rounded-lg p-4" href="/">
                {mounted ? 
                    <Image src={theme == 'light' ? car_dark : car} alt="Dark Car Image" style={{ width: '100px', height: 'auto'}} />
                    :
                    <Image src={car_dark} alt="Dark Car Image" style={{ width: '100px', height: 'auto'}} />
                }
                </Link>
                <MobileNav />
            </div>
            <div className="lg:p-8 lg:col-span-2 h-[calc(100dvh)] justify-center flex items-center relative">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 px-10">
                    {children}
                </div>
            </div>
        </div>
      )
}