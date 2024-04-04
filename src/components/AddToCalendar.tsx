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
import { DatePickerWithRange } from "./DatePickerWithRange"

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
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <DatePickerWithRange />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddToCalendar;