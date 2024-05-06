import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendars } from '@/components/Calendars';
import { EventInterface, PanelProps } from '../Interfaces/Event';

const CalendarCard: React.FC<Pick<PanelProps, 'date' | 'setDate'>> = ({ date, setDate }) => (
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
    </CardContent>
  </Card>
);

export default CalendarCard;