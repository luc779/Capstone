// page for the softwares dashboard
"use client"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Weather from '@/app/Dashboard/widgets/Weather';
import SalesPreformance from "@/app/Dashboard/widgets/SalesPreformance";
import Employees from "@/app/Dashboard/widgets/Employees";
import InventorySnapshot from "@/app/Dashboard/widgets/InventorySnapshot";
import SideBar from "@/components/Templates/SideBar";
import { TopBar } from "@/components/Templates/TopBar";
import { Calendars } from "@/components/Calendars";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { useAuth } from "@/Api/AWS/authentication/UseAuth";
import LoadingIndicator from "@/components/LoadingIndicator";
import PageBaseDesign from "@/components/Templates/SoftwareDesign";
import { ScrollArea } from "@/components/ui/scroll-area";

const currentPanelName: string = "Dashboard";

interface PanelProps {
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

export default function Dashboard() {
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
};

// bottom section will be split again
const BottomContentPanel : React.FC<PanelProps> = ({ date, setDate }) => (
  <ResizablePanel defaultSize={90} className='flex h-full p-4'>
    <ResizablePanelGroup direction="horizontal">
      <LeftMainPanel />
      <RightMainPanel date={date} setDate={setDate} />
    </ResizablePanelGroup>
  </ResizablePanel>
);

// where sales and weather are shown
const LeftMainPanel = () => (
  <ResizablePanel defaultSize={70}>
    <ResizablePanelGroup direction="vertical">
      <SalesAndWeatherPanel />
      <EmployeeAndInventoryPanel />
    </ResizablePanelGroup>
  </ResizablePanel>
);

// where the calendars will go
const RightMainPanel: React.FC<PanelProps> = ({ date, setDate }) => (
  <ResizablePanel defaultSize={30}>
    <CalendarPanel date={date} setDate={setDate} />
  </ResizablePanel>
);

// sales and weather panel
const SalesAndWeatherPanel = () => (
  <ResizablePanel defaultSize={38}>
    <div className="flex h-full pb-4">
      <div className="w-1/2">
        <SalesPreformance />
      </div>
      <div className="w-1/2 pr-4 pl-4">
        <Weather />
      </div>
    </div>
  </ResizablePanel>
);

// section of both employee and inventory
const EmployeeAndInventoryPanel = () => (
  <ResizablePanel defaultSize={62}>
    <ResizablePanelGroup direction="vertical">
      <EmployeesPanel />
      <InventorySnapshotPanel />
    </ResizablePanelGroup>
  </ResizablePanel>
);

// panel to display employees 
const EmployeesPanel = () => (
  <ResizablePanel defaultSize={40}>
    <div className="h-full w-full pr-4 pb-4">
      <Employees />
    </div>
  </ResizablePanel>
);

// panel to display inventory
const InventorySnapshotPanel = () => (
  <ResizablePanel defaultSize={60}>
    <div className=" h-full pr-4">
      <InventorySnapshot />
    </div>
  </ResizablePanel>
);

const CalendarPanel : React.FC<PanelProps> = ({ date, setDate }) => (
  <Card className="h-full">
    <div className="h-1/2">
        <CardHeader>
          <CardTitle>Events Calendars</CardTitle>
          <CardDescription>A place to organize events.</CardDescription>
        </CardHeader>
      <ScrollArea className="flex flex-col overlflow-y-auto h-full w-full pb-20 pr-2">
        <CardContent className="inline-block">
          <div className="pb-4"> 
            <Calendars date={date} setDate={setDate} />
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
            <Calendars date={date} setDate={setDate} />
          </div>
        </CardContent>
      </ScrollArea>
    </div>
  </Card>
)
