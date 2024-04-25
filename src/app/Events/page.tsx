"use client"
import { ResizablePanel } from "@/components/ui/resizable";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Calendars } from "@/components/Calendars";
import { useState } from "react";
import { AddToCalendarForm } from "@/app/Dashboard/widgets/CalendarForm";
import PageBaseDesign from "@/components/Templates/SoftwareDesign";
import { useAuth } from "@/Api/AWS/authentication/UseAuth";
import LoadingIndicator from "@/components/LoadingIndicator";

const currentPanelName: string = "Events";

interface PanelProps {
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

// base panel
export default function Events() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { loading, progressValue } = useAuth();

  if (loading) {
    return (
      <LoadingIndicator progressValue={progressValue} />
    );
  }
  
  return (
    <main>
      <PageBaseDesign panelName={currentPanelName}>
        <BottomContentPanel date={date} setDate={setDate}/>
      </PageBaseDesign>
    </main>
  );
}

// space for events
const BottomContentPanel: React.FC<PanelProps> = ({ date, setDate }) => (
  <ResizablePanel defaultSize={90} className="flex h-full">
    <div className="flex-1 pr-4">
      <CalendarCard date={date} setDate={setDate} />
    </div>
    <div className="flex-1 pr-4">
      <UpcomingEvent />
    </div>
    <div className="flex-1">
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