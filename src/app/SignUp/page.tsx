import { Metadata } from "next"
import SignUpForm from "./Form/SignUpForm"
import AccountPageDesign from "../AccountPageDesign"
import { MobileAuthentication } from "@/components/mobile-authentication"

export const metadata: Metadata = {
  title: "Musée Clio: Sign Up",
  description: "Sign Up page.",
}

export default function SignUp() {
  return (
    <>
      <AccountPageDesign>
        <SignUpForm/>
      </AccountPageDesign>

      <MobileAuthentication >
        <SignUpForm />
      </MobileAuthentication>
    </>
  )
}