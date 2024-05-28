import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PopoverTrigger, PopoverContent, Popover } from "@/components/ui/popover"
import { CalendarInterface } from "@/components/CalendarPages/Interface/CalendarInterfaces";
import { format } from "date-fns"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { EditEventForm } from "./edit-event-form";
import { Icons } from "@/components/icons";
import React from "react";
import { DeleteCalendarItem } from "@/Api/AWS/calendar/DeleteCalendarItem";
import { toast } from "@/components/ui/use-toast";
import { BottomButtons } from "@/components/CalendarPages/EditAndDeleteButtons";

const getBadgeColor = (priority: string) => {
  switch (priority) {
    case 'High':
      return 'bg-red-500 text-black';
    case 'Medium':
      return 'bg-yellow-500 text-black';
    case 'Low':
      return 'bg-green-500 text-black';
    default:
      return 'bg-gray-500';
  }
};

export default function EventCard({ event, index, popover }: { event: CalendarInterface; index: number; popover: boolean; }) {
  return (
     <div key={index} className="w-full max-w-md">
       <Card>
         <CardHeader className="flex items-center text-center">
           <CardTitle>{event.title}</CardTitle>
           <Badge className={getBadgeColor(event.priority)} variant="outline">
             {event.priority} Priority Event
           </Badge>
         </CardHeader>
         <CardContent className="md:grid md:grid-cols-2 md:gap-4">
           <div className="space-y-1">
             <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Location</p>
             <p>{event.location}</p>
           </div>
           <div className="space-y-1">
             <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Dates</p>
             <p>
                {format(event.start_date, "MMM dd")} - {format(event.end_date, "MMM dd")}
             </p>
             <p>
               ({format(event.start_date, "p")} - {format(event.end_date, "p")})
              </p>
           </div>
           <div className="md:col-span-2 md:flex md:justify-between">
             <Popover>
               <PopoverTrigger asChild>
                 <Button size="sm" variant="outline">
                   Description
                 </Button>
               </PopoverTrigger>
               <PopoverContent className="w-full max-w-md p-6">
                 <div className="space-y-4">
                   <div className="space-y-1">
                     <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Description</p>
                     <p>
                       {event.description}
                     </p>
                   </div>
                 </div>
               </PopoverContent>
             </Popover>
             <Popover>
               <PopoverTrigger asChild>
                 <Button size="sm" variant="outline">
                   Featured Cars
                 </Button>
               </PopoverTrigger>
               <PopoverContent className="w-full max-w-md p-6">
                 <div className="space-y-1">
                   <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Featured Cars (Comming soon)</p>
                   <ul className="list-disc pl-4 space-y-1">
                     <li>1962 Chevrolet Corvette</li>
                     <li>1967 Ford Mustang</li>
                     <li>1955 Mercedes-Benz 300SL</li>
                     <li>1964 Aston Martin DB5</li>
                     <li>1970 Dodge Challenger</li>
                   </ul>
                 </div>
               </PopoverContent>
             </Popover>
           </div>
           {!popover && (
              <BottomButtons calendarData={event} index={0} currentPanelName={"event"} />
           )}
         </CardContent>
       </Card>
     </div>
   )
}