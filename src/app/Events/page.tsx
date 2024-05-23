"use client"

import PageBaseDesign from "@/components/Templates/SoftwareDesign";
import { useAuth } from "@/Api/AWS/authentication/UseAuth";
import LoadingIndicator from "@/components/LoadingIndicator";
import { useEffect, useState } from "react";
import { getCookie } from "@/Security/GetCookie";
import { ErrorToast } from "@/components/ErrorToast";
import { GetCalendarApiCall } from "@/Api/AWS/calendar/GetCalendarApiCall";
import { ApiResponse, CalendarInterface, PanelProps } from "../../components/CalendarPages/Interface/CalendarInterfaces";
import TaskOrEventCalendarCard from "../../components/CalendarPages/TaskOrEventCalendarCard";
import UpcomingTaskOrEvent from "../../components/CalendarPages/UpcomingTaskOrEvent";
import AddTaskOrEvent from "../../components/CalendarPages/AddTaskOrEvent";

const currentPanelName: string = "Events";

// base panel
export default function Events() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { loading, progressValue } = useAuth();
  const [response, setResponse] = useState<CalendarInterface[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response_accessToken = await getCookie("accessToken");
  
        if (!response_accessToken) {
          ErrorToast("Account not signed in.");
          throw new Error("Access token is missing");
        }
  
        const data = await GetCalendarApiCall({ accessToken: response_accessToken, item_type: "EVENT" }) as ApiResponse;
        setResponse(data.body);
        console.log(data.body)
      } catch (error) {
        console.error("Error fetching Events item:", error);
      }
    };
  
    fetchData();
  }, []);

  if (loading) {
    return (
      <LoadingIndicator progressValue={progressValue} />
    );
  }
  
  return (
    <main>
      <PageBaseDesign panelName={currentPanelName}>
        <BottomContentPanel date={date} setDate={setDate} items={response} currentPanelName={currentPanelName}/>
      </PageBaseDesign>
    </main>
  );
}

// space for events
const BottomContentPanel: React.FC<PanelProps> = ({ date, setDate, items, currentPanelName }) => (
    <div className="flex h-full p-4">
      <div className="flex-1 pr-4">
        <TaskOrEventCalendarCard date={date} setDate={setDate} items={items} currentPanelName={currentPanelName} />
      </div><div className="flex-1 pr-4">
        <UpcomingTaskOrEvent items={items} currentPanelName={currentPanelName} />
      </div><div className="flex-1">
        <AddTaskOrEvent currentPanelName={currentPanelName} />
      </div>
    </div>
);