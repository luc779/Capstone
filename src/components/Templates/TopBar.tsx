import { Separator } from "@/components/ui/separator";
import UserSettings from "../UserSettings"

export function TopBar(page: string) {

  return (
    <div className="flex justify-between h-full p-8">
      <span className="font-semibold text-2xl">{page}</span>
      <UserSettings />
    </div>
  )
}

export default TopBar;
