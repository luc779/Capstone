import AccountPageDesign from "../AccountPageDesign"
import LogInForm from "./Form/LogInForm"
import { useTheme } from "next-themes"
import { Metadata } from "next"
import { MobileAuthentication } from "@/components/mobile-authentication"

export const metadata: Metadata = {
  title: "Musée Clio: Sign In",
  description: "Sign Up page.",
}

export default function LogIn() {
  return (
    <>
      <AccountPageDesign>
        <LogInForm/>
      </AccountPageDesign>

      <MobileAuthentication >
        <LogInForm />
      </MobileAuthentication>
    </>
  )
}