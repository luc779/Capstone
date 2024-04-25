import { Metadata } from "next"
import SignUpForm from "./SignUpForm"
import AccountPageDesign from "../../components/Templates/AccountPageDesign"

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