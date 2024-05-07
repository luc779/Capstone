import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AddTaskToCalendarForm } from '../../app/Tasks/widgets/TaskCalendarForm';
import { AddEventToCalendarForm } from '@/app/Events/widgets/CalendarForm';

const AddTaskOrEvent: React.FC<{ currentPanelName: string }> = ({ currentPanelName }) => (
  <Card className="p-4 h-full">
    <CardHeader>
      <CardTitle>Add {currentPanelName}</CardTitle>
      <CardDescription>A place to add a {currentPanelName.slice(0, -1).toLowerCase()}.</CardDescription>
    </CardHeader>
    <CardContent className="inline-block h-full items-center">
      <ScrollArea className="flex flex-col overlflow-y-auto h-full w-full pb-20 pr-2">
        {currentPanelName === "Events" ? (
          <AddEventToCalendarForm calendarType={currentPanelName.slice(0, -1)}/>
        ) : (
          <AddTaskToCalendarForm calendarType={currentPanelName.slice(0, -1)} />
        )}
      </ScrollArea>
    </CardContent>
  </Card>
);

export default AddTaskOrEvent;