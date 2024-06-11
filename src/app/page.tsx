'use client'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import car from "./car_logo.png"
import car_dark from "./car_logo_dark.png"
import Image from "next/image"
import { DarkModeToggle } from "@/components/ui/DarkModeToggle"
import { BoxIcon, CalendarIcon, ClipboardIcon, DownloadIcon, GaugeIcon, ShieldIcon } from "lucide-react"
import { useTheme } from "next-themes"

export default function Home() {
  const { theme } = useTheme()

  return (
    <main>
      <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6">
        <Link className="mr-6 rounded-lg p-4" href="/">
          <Image src={theme == 'light' ? car_dark : car} alt={"Dark Car Image"} style={{ width: '100px', height: 'auto'}} />
        </Link>
        <div className="ml-auto flex flex-row gap-2">
          <Button variant="link">
            <Link href="/LogIn">Log In</Link>
          </Button>
          <Button variant="link">
            <Link href="/SignUp">Sign Up</Link>
          </Button>
          <Button variant="link">
            <Link href="/SignUp/ConfirmEmail">Confirm Email</Link>
          </Button>
          <DarkModeToggle />
        </div>
      </header>
      {/* Title for page */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-accent"> 
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Musée Clio
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Complete museum management solution for teams of all sizes.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
            {/* <Button >
              <Link href="/#">Contact Us</Link>
            </Button>
            <Button variant="outline">
              <Link href="/#">Learn More</Link>
            </Button> */}
            <Image src={theme == 'light' ? car_dark : car} width={400} height={300} alt="Car 1" className="rounded-lg object-cover" />
          </div>
        </div>
      </section>
      {/* Features */}
      <section className="w-full py-12 md:py-24 lg:py-32" id="features">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-12 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg  px-3 py-1 text-sm ">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Everything you need in one place</h2>
                <p className="mx-auto max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Packed with powerful features to help your business succeed.
                </p>
              </div>
              <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
                <div className="flex flex-col items-center justify-center space-y-4">
                  <GaugeIcon className="h-12 w-12 text-gray-500 dark:text-gray-400" />
                  <div className="space-y-1 text-center">
                    <h3 className="text-xl font-bold">Fast and Reliable</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Musée Clio is built to be fast and reliable, so you can focus on your business.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center space-y-4">
                  <ShieldIcon className="h-12 w-12 text-gray-500 dark:text-gray-400" />
                  <div className="space-y-1 text-center">
                    <h3 className="text-xl font-bold">Secure and Compliant</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Musée Clio is built with security and compliance in mind, so you can trust your data is safe.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center space-y-4">
                  <CalendarIcon className="h-12 w-12 text-gray-500 dark:text-gray-400" />
                  <div className="space-y-1 text-center">
                    <h3 className="text-xl font-bold">Event Management</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Musée Clio includes powerful event management tools to help you plan and execute your events.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center space-y-4">
                  <ClipboardIcon className="h-12 w-12 text-gray-500 dark:text-gray-400" />
                  <div className="space-y-1 text-center">
                    <h3 className="text-xl font-bold">Task Management</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Musée Clio includes a robust task management system to help you stay organized and on top of
                      your projects.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center space-y-4">
                  <BoxIcon className="h-12 w-12 text-gray-500 dark:text-gray-400" />
                  <div className="space-y-1 text-center">
                    <h3 className="text-xl font-bold">Inventory Management</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Musée Clio includes a powerful inventory management system to help you track and manage your
                      fleet.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center space-y-4">
                  <DownloadIcon className="h-12 w-12 text-gray-500 dark:text-gray-400" />
                  <div className="space-y-1 text-center">
                    <h3 className="text-xl font-bold">Export</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Musée Clio allows you to export your data in various formats for easy sharing and analysis.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
    </main>
  );
};

// function MountainIcon() {
//   return (
//     // <Image src={car} alt={"Car Image"} style={{ width: '700px', height: 'auto' }}></Image>
//   )
// }
