import { Metadata } from "next"
import AccountPageDesign from "../AccountPageDesign"
import SignInForm from "./SignInForm"

export const metadata: Metadata = {
  title: "Log In",
  description: "Log In page.",
}

export default function SignIn() {
  return (
    <>
      <AccountPageDesign>
        <SignInForm/>
      </AccountPageDesign>
    </>
  )
}