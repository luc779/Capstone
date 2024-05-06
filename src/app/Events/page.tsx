"use client"
import { ResizablePanel } from "@/components/ui/resizable";
import PageBaseDesign from "@/components/Templates/SoftwareDesign";
import { useAuth } from "@/Api/AWS/authentication/UseAuth";
import LoadingIndicator from "@/components/LoadingIndicator";
import { useEffect, useState } from "react";
import { getCookie } from "@/Security/GetCookie";
import { ErrorToast } from "@/components/ErrorToast";
import { GetCalendarApiCall } from "@/Api/AWS/calendar/GetCalendarApiCall";
import AddEvent from "./widgets/AddEvent";
import UpcomingEvent from "./widgets/UpcomingEvent";
import CalendarCard from "./widgets/CalendarCard";
import { ApiResponse, EventInterface, PanelProps } from "./Interfaces/Event";

const currentPanelName: string = "Events";

// base panel
export default function Events() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { loading, progressValue } = useAuth();
  const [response, setResponse] = useState<EventInterface[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response_accessToken = await getCookie("accessToken");
  
        if (!response_accessToken) {
          ErrorToast("Account not signed in.");
          throw new Error("Access token is missing");
        }
  
        const data = await GetCalendarApiCall({ accessToken: response_accessToken, item_type: "TASK" }) as ApiResponse;
        setResponse(data.body);
        console.log(response)
      } catch (error) {
        console.error("Error fetching inventory item:", error);
      }
    };
  
    fetchData();
  }, []);

  // if (loading) {
  //   return (
  //     <LoadingIndicator progressValue={progressValue} />
  //   );
  // }
  
  return (
    <main>
      <PageBaseDesign panelName={currentPanelName}>
        <BottomContentPanel date={date} setDate={setDate} event={response}/>
      </PageBaseDesign>
    </main>
  );
}

// space for events
const BottomContentPanel: React.FC<PanelProps> = ({ date, setDate, event }) => (
  <ResizablePanel defaultSize={90} className="flex h-full">
    <div className="flex-1 pr-4">
      <CalendarCard date={date} setDate={setDate} event={event}/>
    </div>
    <div className="flex-1 pr-4">
      <UpcomingEvent event={event}/>
    </div>
    <div className="flex-1">
      <AddEvent />
    </div>
  </ResizablePanel>
);