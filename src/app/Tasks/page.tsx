"use client"
import { ResizablePanel } from "@/components/ui/resizable";
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

const currentPanelName: string = "Tasks";

// base panel
export default function Tasks() {
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
  
        const data = await GetCalendarApiCall({ accessToken: response_accessToken, item_type: "TASK" }) as ApiResponse;
        setResponse(data.body);
        console.log(response)
      } catch (error) {
        console.error("Error fetching inventory item:", error);
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
  <ResizablePanel defaultSize={90} className="flex h-full">
    <div className="flex-1 pr-4">
      <TaskOrEventCalendarCard date={date} setDate={setDate} items={items} currentPanelName={currentPanelName}/>
    </div>
    <div className="flex-1 pr-4">
      <UpcomingTaskOrEvent items={items} currentPanelName={currentPanelName}/>
    </div>
    <div className="flex-1">
      <AddTaskOrEvent currentPanelName={currentPanelName}/>
    </div>
  </ResizablePanel>
);