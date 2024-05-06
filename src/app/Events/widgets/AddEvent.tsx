import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { AddToCalendarForm } from './CalendarForm';

const AddEvent = () => (
  <Card className="overflow-auto border p-4 h-full">
    <CardHeader>
      <CardTitle>Add Event</CardTitle>
      <CardDescription>A place to add events.</CardDescription>
    </CardHeader>
    <CardContent className="inline-block">
      <AddToCalendarForm calendarType="Event" />
    </CardContent>
  </Card>
);

export default AddEvent;