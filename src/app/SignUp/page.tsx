import { Metadata } from "next"
import SignUpForm from "./Form/SignUpForm"
import AccountPageDesign from "../AccountPageDesign"

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Sign Up page.",
}

export default function SignUp() {
  return (
    <>
      <AccountPageDesign>
        <SignUpForm/>
      </AccountPageDesign>
    </>
  )
}