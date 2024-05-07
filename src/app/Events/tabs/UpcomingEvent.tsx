import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import EventCard from '../widgets/EventCard';
import { EventInterface } from '../Interfaces/Event';
import { ScrollArea } from '@/components/ui/scroll-area';

const UpcomingEvent: React.FC<{ event: EventInterface[] }> = ({ event }) => {
  const sortedEvents = event.sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime());
  
  return (
    <Card className="h-full p-4">
      <CardHeader>
        <CardTitle>Upcoming Events</CardTitle>
        <CardDescription>A place to see upcoming events.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-grow gap-y-4 h-full w-full">
        <ScrollArea className="flex flex-col overlflow-y-auto h-full w-full pb-20 pr-2">
          <div className="pb-1.5 space-y-4">
            {sortedEvents.map((event, index) => (
              <EventCard key={index} event={event} index={index}/>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

export default UpcomingEvent;