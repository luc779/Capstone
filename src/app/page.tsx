
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CardHeader, CardContent, Card } from "@/components/ui/card"
import car from "./car_logo.png"
import Image from "next/image"
import { DarkModeToggle } from "@/components/ui/DarkModeToggle"

export default function Home() {
  return (
    <main>
      <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6">
        <Link className="mr-6" href="/">
          <Image src={car} alt={"Car Image"} style={{ width: '100px', height: 'auto'}}></Image>
          <span className="sr-only">Project Management Inc</span>
        </Link>
        <span className="inline-flex items-center mr-4"><DarkModeToggle /></span>
        <div className="ml-auto flex flex-row gap-2">
          <Button>
            <Link href="/LogIn">Log In</Link>
          </Button>
          <Button>
            <Link href="/SignUp">Sign Up</Link>
          </Button>
        </div>
      </header>
      {/* background color */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-accent"> 
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Welcome to Project Management Platform
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Complete museum management solution for teams of all sizes.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
            <Button>
              <Link href="/#">Contact Sales</Link>
            </Button>
            <Button>
              <Link href="/#">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Features</h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Designed to help your team deliver more projects faster and with better results.
            </p>
          </div>
          <div className="grid w-full grid-cols-3 items-stretch justify-center divide-x md:grid-cols-3">
            <div className="mx-auto flex w-full items-center justify-center p-4 sm:p-8">
              <Card>
                <CardHeader>
                  <h3 className="text-xl font-bold">Sales</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-base text-gray-500">Work together with your team on projects, tasks, and more.</p>
                </CardContent>
              </Card>
            </div>
            <div className="mx-auto flex w-full items-center justify-center p-4 sm:p-8">
              <Card>
                <CardHeader>
                  <h3 className="text-xl font-bold">Task Management</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-base text-gray-500">Track progress and manage tasks with ease.</p>
                </CardContent>
              </Card>
            </div>
            <div className="mx-auto flex w-full items-center justify-center p-4 sm:p-8">
              <Card>
                <CardHeader>
                  <h3 className="text-xl font-bold">Inventory</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-base text-gray-500">Get detailed information on museum inventory.</p>
                </CardContent>
              </Card>
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
