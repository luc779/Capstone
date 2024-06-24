"use client"
import AccountPageDesign from "../AccountPageDesign"
import LogInForm from "./Form/LogInForm"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { MobileAuthentication } from "@/components/mobile-authentication"


export default function LogIn() {
  const { theme } = useTheme()

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <title>Musée Clio: Sign In</title>
      <AccountPageDesign>
        <LogInForm/>
      </AccountPageDesign>

      <MobileAuthentication mounted={mounted}>
        <LogInForm />
      </MobileAuthentication>
    </>
  )
}