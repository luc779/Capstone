"use client"
import { ResizablePanel } from "@/components/ui/resizable";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Calendars } from "@/components/Calendars";
import { useState } from "react";
import PageBaseDesign from "@/components/Templates/SoftwareDesign";
import { useAuth } from "@/Api/AWS/authentication/UseAuth";
import LoadingIndicator from "@/components/LoadingIndicator";
import { AddToCalendarForm } from "../Dashboard/widgets/CalendarForm";

const currentPanelName: string = "Tasks";

interface PanelProps {
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

// base panel
export default function Tasks() {
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

// space for Tasks
const BottomContentPanel: React.FC<PanelProps> = ({ date, setDate }) => (
  <ResizablePanel defaultSize={90} className="flex h-full">
    <div className="flex-1 pr-4 ">
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