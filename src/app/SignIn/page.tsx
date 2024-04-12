import { Metadata } from "next"
import AccountPageDesign from "../AccountPageDesign"
import SignInForm from "./SignInForm"

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Sign Up page.",
}

export default function SignIn() {
  return (
    <>
      <AccountPageDesign children={<SignInForm/>} />
    </>
  )
}