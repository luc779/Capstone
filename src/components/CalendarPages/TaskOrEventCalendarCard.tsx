import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendars } from '@/components/Calendars';
import { PanelProps } from './Interface/CalendarInterfaces';
import { ScrollArea } from '@/components/ui/scroll-area';
import TaskCard from '../../app/Tasks/widgets/TaskCard';
import EventCard from '@/app/Events/widgets/EventCard';

const TaskOrEventCalendarCard: React.FC<PanelProps> = ({ date, setDate, items, currentPanelName }) => {

  const eventsOnSelectedDate = items?.filter(e => {
    // console.log("Selected Date: " + date!.toLocaleDateString())
    const parts = date?.toLocaleDateString().split("/");
    const month = parseInt(parts![0], 10) - 1; // Subtract 1 because months are zero-indexed
    const day = parseInt(parts![1], 10);
    const year = parseInt(parts![2], 10);
    const selectedDate = new Date(year, month, day);
    // console.log("Datified: " + selectedDate)
    if (e && e.start_date && e.end_date) {
        const startDate = new Date(e.start_date);
        const endDate = new Date(e.end_date);
        startDate.setHours(0, 0, 0, 0); // Set time to 00:00:00
        endDate.setHours(23, 59, 59, 999); // Set time to 23:59:59
        // console.log("Difference smaller: " + selectedDate + ">=" +  startDate)
        // console.log("Difference bigger: " + selectedDate + "<=" + endDate)
        return selectedDate >= startDate && selectedDate <= endDate;
    }
    return false;
  }) || [];
  // console.log("Fiterd event: " + eventsOnSelectedDate.length)

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{currentPanelName.slice(0, -1)} Calendar</CardTitle>
        <CardDescription>A place to organize {currentPanelName.toLowerCase()}.</CardDescription>
      </CardHeader>
      <CardContent className="inline-block h-full">
        <ScrollArea className="flex flex-col overlflow-y-auto h-full w-full pb-20 pr-4">
            <div className="pb-4"> 
              <Calendars date={date} setDate={setDate} />
            </div>
            <p>{currentPanelName} on {date ? date.toLocaleDateString() : 'No date selected'}</p>
            {eventsOnSelectedDate.length > 0 ? (
              <div>
                {eventsOnSelectedDate.map(items => (
                    currentPanelName === "Tasks" ? (
                      <div className="pt-4" key={items.ID}>
                        <TaskCard task={items} index={0} popover={false}/>
                      </div>
                    ) : (
                      <div className="pt-4" key={items.ID}>
                        <EventCard event={items} index={0}/>
                      </div>
                    )
                ))}
              </div>
            ) : (
              <p>No {currentPanelName.toLowerCase()} on selected date</p>
            )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

export default TaskOrEventCalendarCard;

