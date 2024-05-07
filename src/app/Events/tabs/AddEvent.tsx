import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { AddToCalendarForm } from '../widgets/CalendarForm';
import { ScrollArea } from '@/components/ui/scroll-area';

const AddEvent = () => (
  <Card className="p-4 h-full">
    <CardHeader>
      <CardTitle>Add Event</CardTitle>
      <CardDescription>A place to add events.</CardDescription>
    </CardHeader>
    <CardContent className="inline-block h-full items-center">
      <ScrollArea className="flex flex-col overlflow-y-auto h-full w-full pb-20 pr-2">
        <AddToCalendarForm calendarType="Event" />
      </ScrollArea>
    </CardContent>
  </Card>
);

export default AddEvent;