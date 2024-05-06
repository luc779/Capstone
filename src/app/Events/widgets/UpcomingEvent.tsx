import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import EventCard from './EventCard';
import { EventInterface } from '../Interfaces/Event';

const UpcomingEvent: React.FC<{ event: EventInterface[] }> = ({ event }) => {
  const sortedEvents = event.sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime());
  
  return (
  <Card className="p-4 h-full">
    <CardHeader>
      <CardTitle>Upcoming Events</CardTitle>
      <CardDescription>A place to see upcoming events.</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="overflow-auto h-[600px] w-full">
        <div className="space-y-4">
          {sortedEvents.map((event, index) => (
            <EventCard key={index} event={event} index={index}/>
          ))}
        </div>
      </div>
    </CardContent>
  </Card>
  );
}

export default UpcomingEvent;