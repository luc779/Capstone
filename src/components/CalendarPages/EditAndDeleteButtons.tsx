import { Button } from "@/components/ui/button"
import { CalendarInterface } from "@/components/CalendarPages/Interface/CalendarInterfaces";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import { Icons } from "@/components/icons";
import React from "react";
import { DeleteCalendarItem } from "@/Api/AWS/calendar/DeleteCalendarItem";
import { toast } from "@/components/ui/use-toast";
import { EditEventForm } from "@/app/Events/widgets/edit-event-form";
import EventCard from "@/app/Events/widgets/EventCard";
import TaskCard from "@/app/Tasks/widgets/TaskCard";
import { EditTaskForm } from "@/app/Tasks/widgets/edit-task-form";

export function BottomButtons({ calendarData, currentPanelName }: { calendarData: CalendarInterface; index: number; currentPanelName: string; }) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
  
    async function onSubmit(data: CalendarInterface) {
      setIsLoading(true)
      const response = await DeleteCalendarItem(data) as { statusCode: number, body: string }
      if (response.statusCode === 200) {
        toast({
          title: "Successful Change",
          description: "Refresh page to see changes",
        });
      } else {
        toast({
          title: "Error",
          description: response.body,
        });
      }
      setIsLoading(false)
    } 
  
    return (
      <>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="secondary">Edit</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit {currentPanelName}</DialogTitle>
              <DialogDescription>
                Make changes to your {currentPanelName} here.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                {currentPanelName == "tasks" ? (
                    <EditTaskForm location={calendarData.location} end_date={calendarData.end_date} start_date={calendarData.start_date} priority={calendarData.priority} museum_name={calendarData.museum_name} description={calendarData.description} ID={calendarData.ID} item_type={calendarData.item_type} title={calendarData.title} />
                ) : (
                    <EditEventForm location={calendarData.location} end_date={calendarData.end_date} start_date={calendarData.start_date} priority={calendarData.priority} museum_name={calendarData.museum_name} description={calendarData.description} ID={calendarData.ID} item_type={calendarData.item_type} title={calendarData.title} />
                )}
            </div>
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="destructive">Delete</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Delete {currentPanelName}</DialogTitle>
              <DialogDescription>
                Delete your {currentPanelName} here.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                {currentPanelName == "tasks" ? (
                    <TaskCard task={calendarData} index={0} popover={true} />
                ) : (
                    <EventCard event={calendarData} index={0} popover={true} />
                )}
            </div>
            <DialogFooter className="w-full">
              <DialogClose asChild>
                <Button className="w-full" variant='destructive' disabled={isLoading}
                  onClick={() => {
                      onSubmit(calendarData);
                  }}
                  >
                  {isLoading && (    
                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Confirm Delete
                </Button> 
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    )
  }