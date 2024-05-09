import { Metadata } from "next"
import AccountPageDesign from "../../AccountPageDesign"
import ConfirmUserForm from "./Form/ConfirmUserForm"

export const metadata: Metadata = {
  title: "Confirm Email",
  description: "Confirm Email page.",
}

export default function ConfirmEmail() {
  return (
    <>
      <AccountPageDesign>
        <ConfirmUserForm/>
      </AccountPageDesign>
    </>
  )
}