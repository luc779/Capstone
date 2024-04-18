import Image from "next/image"

import car from "./car_logo.png"
import { ReactNode } from "react"

interface SignUpProps {
    children: ReactNode;
}

function AccountPageDesign({ children }: SignUpProps) {
  return (
    <>
      <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-3 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-gray-800" /> 
          <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            Software Managment Inc
          </div>
          <div className="absolute inset-y-0 left-1/2 transform -translate-x-1/2 flex flex-col justify-center z-20">
            <Image src={car} alt={"Car Image"} style={{ width: '700px', height: 'auto' }}></Image>
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2 text-center">
              <p className="text-lg">
                &ldquo;This car management software is a <br></br> game-changer!&rdquo;
              </p>
              <footer className="text-sm">Sofia Davis</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8 lg:col-span-2">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            { children }
          </div>
        </div>
      </div>
    </>
  )
}

export default AccountPageDesign;