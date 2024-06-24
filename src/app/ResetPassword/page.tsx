import { MobileAuthentication } from "@/components/mobile-authentication"
import { Metadata } from "next"
import AccountPageDesign from "../AccountPageDesign"
import ResetPassword from "./Form/ResetPassowrdForm"

export const metadata: Metadata = {
  title: "Log In",
  description: "Log In page.",
}

export default function LogIn() {
  return (
    <>
      <AccountPageDesign>
        <ResetPassword />
      </AccountPageDesign>

      <MobileAuthentication>
        <ResetPassword />
      </MobileAuthentication>
    </>
  )
}