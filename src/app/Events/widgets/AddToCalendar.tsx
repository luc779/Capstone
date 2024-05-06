import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DatePickerWithRange } from "../../../components/DatePickerWithRange"

export function AddToCalendar() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add to Events Calendar.</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] pt-4">
        <DialogHeader>
          <DialogTitle>Add to Events Calendar.</DialogTitle>
          <DialogDescription>
            Add an Event to the calendar. Then press submit.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddToCalendar;