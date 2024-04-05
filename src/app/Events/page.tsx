"use client"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

import SideBar from "@/widgets/SideBar";
import TopBar from "@/widgets/TopBar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Calendars } from "@/widgets/Calendars";
import { useState } from "react";
import { AddToCalendarForm } from "@/components/CalendarForm";
import { Separator } from "@/components/ui/separator";

// base panel
export default function Events() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <main>
      <ResizablePanelGroup direction="horizontal">
        <SidebarPanel />
        <MainContentPanel date={date} setDate={setDate} />
      </ResizablePanelGroup>
    </main>
  );
}

// same side bar panel
const SidebarPanel = () => (
    <ResizablePanel defaultSize={10}>
      <div className="flex h-screen justify-center py-4 pl-4">
        <SideBar />
      </div>
    </ResizablePanel>
);

interface PanelProps {
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

// main content next to the sidebar
const MainContentPanel: React.FC<PanelProps> = ({ date, setDate }) => (
  <ResizablePanel defaultSize={90}>
    <ResizablePanelGroup direction="vertical">
      <TopContentPanel />
      <div className="pl-4">
        <Separator />
      </div>
      <BottomContentPanel date={date} setDate={setDate} />
    </ResizablePanelGroup>
  </ResizablePanel>
);

// top panel for user
const TopContentPanel = () => (
  <ResizablePanel defaultSize={10}>
    {TopBar("Events")}
  </ResizablePanel>
);

// space for events
const BottomContentPanel: React.FC<PanelProps> = ({ date, setDate }) => (
  <ResizablePanel defaultSize={90} className="flex p-4">
    <div className="flex-1 pr-4 ">
      <CalendarCard date={date} setDate={setDate} />
    </div>
    <div className="flex-1 pr-4">
      <UpcomingEvent />
    </div>
    <div className="flex-1 pr-4">
      <AddEvent />
    </div>
  </ResizablePanel>
);


const CalendarCard: React.FC<PanelProps> = ({ date, setDate }) => (
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

const UpcomingEvent = () => (
  <Card className=" overflow-auto border p-4 h-full">
    <CardHeader>
      <CardTitle>UpComing Events</CardTitle>
      <CardDescription>A place to see upcomming events.</CardDescription>
    </CardHeader>
    <CardContent className="inline-block">
      <div className="pb-4"> 
      </div>
    </CardContent>
  </Card>
);

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