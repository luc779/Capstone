import { AlignJustify } from "lucide-react"
import Link from "next/link"
import { Button } from "./ui/button"
import { DarkModeToggle } from "./ui/DarkModeToggle"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"

export const MobileNav = () => {
    return (
        <div className="ml-auto flex flex-row gap-2 sm:hidden">
            <Sheet>
            <SheetTrigger asChild>
                <AlignJustify />
            </SheetTrigger>
            <SheetContent className="pb-14">
                <div className=" p-10 h-full flex flex-col items-center">
                    <div className="flex flex-col gap-4">
                        <Button variant={'link'} className="text-lg">
                            <Link href="/">Home</Link>
                        </Button>
                        <Button variant="link" className="text-lg">
                            <Link href="/LogIn">Log In</Link>
                        </Button>
                        <Button variant="link" className="text-lg">
                            <Link href="/SignUp">Sign Up</Link>
                        </Button>
                        <Button variant="link" className="text-lg">
                            <Link href="/SignUp/ConfirmEmail">Confirm Email</Link>
                        </Button>
                    </div>
                </div>
                <DarkModeToggle />
            </SheetContent>
            </Sheet>
        </div>
    )
}