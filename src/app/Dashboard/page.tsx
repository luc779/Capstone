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
import CalendarSnapshot from "./widgets/Calendars/CalendarSnapshot";

const currentPanelName: string = "Dashboard";

export default function Dashboard() {
  const { loading, progressValue } = useAuth();

  if (loading) {
    return (
      <LoadingIndicator progressValue={progressValue} />
    );
  }

  return (
    <main>
      <PageBaseDesign panelName={currentPanelName}>
        <BottomContentPanel/>
      </PageBaseDesign>
    </main>
  );
};

// bottom section will be split again
const BottomContentPanel = () => (
  <ResizablePanel defaultSize={90} className='flex h-full p-4'>
    <ResizablePanelGroup direction="horizontal">
      <LeftMainPanel />
      <RightMainPanel  />
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
const RightMainPanel = () => (
  <ResizablePanel defaultSize={30}>
    <CalendarSnapshot/>
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
