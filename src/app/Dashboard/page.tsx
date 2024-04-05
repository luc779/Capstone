
// page for the softwares dashboard

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
import { CalendarForm } from "@/components/CalendarForm";
import { AddToCalendar } from "@/components/AddToCalendar";
import FullInventory from "@/widgets/FullInventory";
import { Separator } from "@/components/ui/separator";


export default function Dashboard() {
  return (
    <main>
      <ResizablePanelGroup direction="horizontal">
        <SidebarPanel />
        <MainContentPanel />
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
const MainContentPanel = () => (
  <ResizablePanel defaultSize={90}>
    <ResizablePanelGroup direction="vertical">
      <TopContentPanel />
      <div className="pl-4">
        <Separator />
      </div>
      <BottomContentPanel />
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
const BottomContentPanel = () => (
  <ResizablePanel defaultSize={90}>
    <ResizablePanelGroup direction="horizontal">
      <LeftMainPanel />
      <RightMainPanel />
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
  <ResizablePanel defaultSize={30} className="pt-4 pb-4 pr-4">
    <CalendarPanel />
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

// panel to display inventory
const InventorySnapshotPanel = () => (
  <ResizablePanel defaultSize={60}>
    <div className=" h-full pb-4 px-4">
      <InventorySnapshot />
    </div>
  </ResizablePanel>
);

const CalendarPanel = () => (
  <Card className="h-full overflow-auto">
      <CardHeader>
        <CardTitle>Events Calendars</CardTitle>
        <CardDescription>A place to organize events.</CardDescription>
      </CardHeader>
      <CardContent className="inline-block">
        <div className="pb-4"> 
          <Calendars />
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
          <Calendars />
        </div>
        <AddToCalendar />
      </CardContent>
    </Card>
)
