import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendars } from '@/components/Calendars';
import { EventInterface, PanelProps } from '../Interfaces/Event';
import EventCard from './EventCard';

const CalendarCard: React.FC<Pick<PanelProps, 'date' | 'setDate'> & { event: EventInterface[] }> = ({ date, setDate, event }) => {

  const eventsOnSelectedDate = event.filter(e => {
    const startDate = new Date(e.start_date);
    const endDate = new Date(e.end_date);
    const selectedDate = date || new Date();

    return selectedDate >= startDate && selectedDate <= endDate;
  });

  return (
    <Card className="overflow-auto border p-4 h-full">
      <CardHeader>
        <CardTitle>Events Calendars</CardTitle>
        <CardDescription>A place to organize events.</CardDescription>
      </CardHeader>
      <CardContent className="inline-block">
        <div className="pb-4"> 
          <Calendars date={date} setDate={setDate} />
        </div>
        <p>Events on {date ? date.toLocaleDateString() : 'No date selected'}</p>
        {eventsOnSelectedDate.length > 0 ? (
          <div>
            {eventsOnSelectedDate.map(event => (
              <div className="pt-4" key={event.ID}>
                <EventCard event={event} index={0} />
              </div>
            ))}
          </div>
        ) : (
          <p>No event on selected date</p>
        )}
      </CardContent>
    </Card>
  );
}

export default CalendarCard;

