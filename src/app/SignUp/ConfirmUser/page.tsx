import { Metadata } from "next"
import AccountPageDesign from "../../AccountPageDesign"
import ConfirmUserForm from "./ConfirmUserForm"

export const metadata: Metadata = {
  title: "Confirm Email",
  description: "Confirm Email page.",
}

export default function ConfirmEmail() {
  return (
    <>
      <AccountPageDesign children={<ConfirmUserForm/>} />
    </>
  )
}