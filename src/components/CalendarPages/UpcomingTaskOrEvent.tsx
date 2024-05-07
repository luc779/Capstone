import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarInterface } from './Interface/CalendarInterfaces';
import { ScrollArea } from '@/components/ui/scroll-area';
import TaskCard from '../../app/Tasks/widgets/TaskCard';
import EventCard from '@/app/Events/widgets/EventCard';

const UpcomingTaskOrEvent: React.FC<{ items: CalendarInterface[], currentPanelName: string }> = ({ items, currentPanelName }) => {
  const sortedEvents = items.sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime());
  
  return (
    <Card className="h-full p-4">
      <CardHeader>
        <CardTitle>Upcoming {currentPanelName}</CardTitle>
        <CardDescription>A place to see upcoming {currentPanelName.toLowerCase()}.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-grow gap-y-4 h-full w-full">
        <ScrollArea className="flex flex-col overlflow-y-auto h-full w-full pb-20 pr-2">
          <div className="pb-1.5 space-y-4">
            {sortedEvents.map((items, index) => (
              currentPanelName === "Tasks" ? (
                <TaskCard key={items.ID} task={items} index={index}/>
              ) : (
                <EventCard key={items.ID} event={items} index={index}/>
              )
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

export default UpcomingTaskOrEvent;