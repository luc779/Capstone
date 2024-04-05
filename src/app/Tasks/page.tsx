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

// base panel
export default function Tasks() {
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
      <ResizableHandle />
      <BottomContentPanel date={date} setDate={setDate} />
    </ResizablePanelGroup>
  </ResizablePanel>
);

// top panel for user
const TopContentPanel = () => (
  <ResizablePanel defaultSize={10}>
    {TopBar("Tasks")}
  </ResizablePanel>
);

// space for Tasks
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
      <CardTitle>Tasks Calendars</CardTitle>
      <CardDescription>A place to organize tasks.</CardDescription>
    </CardHeader>
    <CardContent className="inline-block">
      <div className="pb-4"> 
        <Calendars date={date} setDate={setDate} />
      </div>
      <p>Tasks on {date ? date.toLocaleDateString() : 'No date selected'}</p>
    </CardContent>
  </Card>
);

const UpcomingEvent = () => (
  <Card className=" overflow-auto border p-4 h-full">
    <CardHeader>
      <CardTitle>UpComing Tasks</CardTitle>
      <CardDescription>A place to see upcomming tasks.</CardDescription>
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
      <CardTitle>Add Task</CardTitle>
      <CardDescription>A place to add tasks.</CardDescription>
    </CardHeader>
    <CardContent className="inline-block">
      <AddToCalendarForm calendarType="Task" />
    </CardContent>
  </Card>
);