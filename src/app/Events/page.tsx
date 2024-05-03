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
import { AddToCalendarForm } from "@/app/Dashboard/widgets/CalendarForm";
import PageBaseDesign from "@/components/Templates/SoftwareDesign";
import { useAuth } from "@/Api/AWS/authentication/UseAuth";
import LoadingIndicator from "@/components/LoadingIndicator";
import { useEffect, useState } from "react";
import { getCookie } from "@/Security/GetCookie";
import { ErrorToast } from "@/components/ErrorToast";
import { GetCalendarApiCall } from "@/Api/AWS/calendar/GetCalendarApiCall";
import EventCard from "./EventCard";

const currentPanelName: string = "Events";

interface PanelProps {
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  event: {
    location: string;
    end_date: string;
    start_date: string;
    priority: string;
    museum_name: string;
    description: string;
    ID: string;
    item_type: string;
    title: string;
  } | null;
}

interface ApiResponse {
  statusCode: number;
  body: string;
}

// base panel
export default function Events() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { loading, progressValue } = useAuth();
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const exampleData = {
    "location": "Marketing Department",
    "end_date": "1672640800",
    "start_date": "1672530000",
    "priority": "High",
    "museum_name": "TestMuseum",
    "description": "Prepare promotional materials for new exhibition",
    "ID": "16c8f546-5565-4ada-9997-b72c90deef4d",
    "item_type": "EVENT",
    "title": "Promotional Material Preparation"
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response_accessToken = await getCookie("accessToken");
  
  //       if (!response_accessToken) {
  //         ErrorToast("Account not signed in.");
  //         throw new Error("Access token is missing");
  //       }
  
  //       const data = await GetCalendarApiCall({ accessToken: response_accessToken, ID: "", item_type: "EVENT" }) as ApiResponse;
  //       setResponse(data);
  //       console.log(response)
  //     } catch (error) {
  //       console.error("Error fetching inventory item:", error);
  //     }
  //   };
  
  //   fetchData();
  // }, []);

  // if (loading) {
  //   return (
  //     <LoadingIndicator progressValue={progressValue} />
  //   );
  // }
  
  return (
    <main>
      <PageBaseDesign panelName={currentPanelName}>
        <BottomContentPanel date={date} setDate={setDate} event={exampleData}/>
      </PageBaseDesign>
    </main>
  );
}

// space for events
const BottomContentPanel: React.FC<PanelProps> = ({ date, setDate, event }) => (
  <ResizablePanel defaultSize={90} className="flex h-full">
    <div className="flex-1 pr-4">
      <CalendarCard date={date} setDate={setDate} />
    </div>
    <div className="flex-1 pr-4">
      <UpcomingEvent event={event}/>
    </div>
    <div className="flex-1">
      <AddEvent />
    </div>
  </ResizablePanel>
);

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

const UpcomingEvent: React.FC<{ event: PanelProps['event'] }> = ({ event }) => (
  <Card className=" overflow-auto border p-4 h-full">
    <CardHeader>
      <CardTitle>UpComing Events</CardTitle>
      <CardDescription>A place to see upcomming events.</CardDescription>
    </CardHeader>
    <CardContent className="inline-block">
      <EventCard />
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