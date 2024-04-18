import { Metadata } from "next"
import AccountPageDesign from "../AccountPageDesign"
import LogInForm from "./LogInForm"

export const metadata: Metadata = {
  title: "Log In",
  description: "Log In page.",
}

export default function LogIn() {
  return (
    <>
      <AccountPageDesign>
        <LogInForm/>
      </AccountPageDesign>
    </>
  )
}