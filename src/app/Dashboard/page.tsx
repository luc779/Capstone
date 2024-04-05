
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
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import Weather from '@/widgets/Weather';
import SalesPreformance from "@/widgets/SalesPreformance";
import Employees from "@/widgets/Employees";
import InventorySnapshot from "@/widgets/InventorySnapshot";
import SideBar from "@/widgets/SideBar";
import { TopBar } from "@/widgets/TopBar";
import { Calendars } from "@/widgets/Calendars";
import { AddToCalendar } from "@/components/AddToCalendar";
import FullInventory from "@/widgets/FullInventory";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";


export default function Dashboard() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <main>
      <ResizablePanelGroup direction="horizontal">
        <SidebarPanel />
        <MainContentPanel date={date} setDate={setDate}/>
      </ResizablePanelGroup>
    </main>
  );
};

// content fo the sidebar panel
const SidebarPanel = () => (
  <ResizablePanel defaultSize={10}>
    <div className="flex h-screen justify-center py-4 pl-4">
      <SideBar />
    </div>
  </ResizablePanel>
);

// main overview
const MainContentPanel : React.FC<PanelProps> = ({ date, setDate }) => (
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

// top of th page content
const TopContentPanel = () => (
  <ResizablePanel defaultSize={10}>
    {TopBar("Dashboard")}
  </ResizablePanel>
);

// bottom section will be split again
const BottomContentPanel : React.FC<PanelProps> = ({ date, setDate }) => (
  <ResizablePanel defaultSize={90}>
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
  <ResizablePanel defaultSize={30} className="pt-4 pb-4 pr-4">
    <CalendarPanel date={date} setDate={setDate} />
  </ResizablePanel>
);

// sales and weather panel
const SalesAndWeatherPanel = () => (
  <ResizablePanel defaultSize={38}>
    <div className="flex h-full">
      <div className="w-1/2 py-4 pl-4">
        <SalesPreformance />
      </div>
      <div className="w-1/2 p-4">
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
    <div className="h-full w-full px-4 pb-4">
      <Employees />
    </div>
  </ResizablePanel>
);

interface PanelProps {
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

// panel to display inventory
const InventorySnapshotPanel = () => (
  <ResizablePanel defaultSize={60}>
    <div className=" h-full pb-4 px-4">
      <InventorySnapshot />
    </div>
  </ResizablePanel>
);

const CalendarPanel : React.FC<PanelProps> = ({ date, setDate }) => (
  <Card className="h-full overflow-auto">
      <CardHeader>
        <CardTitle>Events Calendars</CardTitle>
        <CardDescription>A place to organize events.</CardDescription>
      </CardHeader>
      <CardContent className="inline-block">
        <div className="pb-4"> 
          <Calendars date={date} setDate={setDate} />
        </div>
        {/* <CalendarForm /> */}
        <AddToCalendar />
      </CardContent>
      <CardHeader>
        <CardTitle>Tasks Calendars</CardTitle>
        <CardDescription>A place to list tasks.</CardDescription>
      </CardHeader>
      <CardContent className="inline-block">
        <div className="pb-4"> 
          <Calendars date={date} setDate={setDate} />
        </div>
        <AddToCalendar />
      </CardContent>
    </Card>
)
