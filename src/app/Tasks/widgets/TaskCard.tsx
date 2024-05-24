import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PopoverTrigger, PopoverContent, Popover } from "@/components/ui/popover"
import { CalendarInterface } from "../../../components/CalendarPages/Interface/CalendarInterfaces";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import React from "react";
import { Icons } from "@/components/icons";
import { toast } from "@/components/ui/use-toast";
import { EditTaskForm } from "./edit-task-form";
import { format } from "date-fns"
import { DeleteCalendarItem } from "@/Api/AWS/calendar/DeleteCalendarItem";
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

export default function TaskCard({ task, index, popover }: { task: CalendarInterface; index: number; popover: boolean; }) {
  return (
    <div key={index} className="w-full max-w-md">
      <Card>
        <CardHeader className="flex items-center text-center">
          <CardTitle>{task.title}</CardTitle>
          <Badge className={getBadgeColor(task.priority)} variant="outline">
            {task.priority} Priority
          </Badge>
        </CardHeader>
        <CardContent className=" md:grid md:grid-cols-2 md:gap-4">
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Location</p>
            <p>{task.location}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Dates</p>
            <p>
              {format(task.start_date, "MMM dd")} - {format(task.end_date, "MMM dd")}
            </p>
            <p>
              ({format(task.start_date, "p")} - {format(task.end_date, "p")})
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
                      {task.description}
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
            <BottomButtons calendarData={task} index={0} currentPanelName={"WOO"} />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
