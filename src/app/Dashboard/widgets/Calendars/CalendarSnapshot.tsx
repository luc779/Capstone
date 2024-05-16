import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from 'next/link';
import { ScrollArea } from '@/components/ui/scroll-area';

// uses a card component 
function CalendarSnapshot() {
  return (
    <Card className="h-full">
        <div className="h-1/2">
            <CardHeader>
            <CardTitle>Events Calendars</CardTitle>
            <CardDescription>A place to organize events.</CardDescription>
            </CardHeader>
            <ScrollArea className="flex flex-col overlflow-y-auto h-full w-full pb-20 pr-2">
                <CardContent className="inline-block">
                <div className="pb-4"> 
                </div>
                </CardContent>
            </ScrollArea>
            </div>
            <div className="h-1/2">
            <CardHeader>
                <CardTitle>Tasks Calendars</CardTitle>
                <CardDescription>A place to list tasks.</CardDescription>
            </CardHeader>
            <ScrollArea className="flex flex-col overlflow-y-auto h-full w-full pb-20 pr-2">
                <CardContent className="inline-block">
                <div className="pb-4"> 
                </div>
                </CardContent>
            </ScrollArea>
        </div>
    </Card>
  );
}

export default CalendarSnapshot;