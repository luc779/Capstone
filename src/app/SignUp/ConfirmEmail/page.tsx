import { Metadata } from "next"
import AccountPageDesign from "../../../components/Templates/AccountPageDesign"
import ConfirmUserForm from "./ConfirmUserForm"

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