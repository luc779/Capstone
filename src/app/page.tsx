

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

import Weather from '@/widgets/Weather';
import SalesPreformance from "@/widgets/SalesPreformance";
import Employees from "@/widgets/Employees";
import InventorySnapshot from "@/widgets/InventorySnapshot";
import SideBar from "@/widgets/SideBar";

export default function Home() {
  return (
    <main>
      <ResizablePanelGroup direction="horizontal">
        <SidebarPanel />
        <MainContentPanel />
      </ResizablePanelGroup>
    </main>
  );
};

const SidebarPanel = () => (
  <ResizablePanel defaultSize={10}>
    <div className="flex h-screen justify-center py-4 pl-4">
      <SideBar />
    </div>
  </ResizablePanel>
);

const MainContentPanel = () => (
  <ResizablePanel defaultSize={90}>
    <ResizablePanelGroup direction="vertical">
      <TopContentPanel />
      <ResizableHandle />
      <BottomContentPanel />
    </ResizablePanelGroup>
  </ResizablePanel>
);

const TopContentPanel = () => (
  <ResizablePanel defaultSize={10}>
    <div className="flex h-full items-center justify-center p-6">
      <span className="font-semibold">Two</span>
    </div>
  </ResizablePanel>
);

const BottomContentPanel = () => (
  <ResizablePanel defaultSize={90}>
    <ResizablePanelGroup direction="horizontal">
      <LeftMainPanel />
      <ResizableHandle />
      <RightMainPanel />
    </ResizablePanelGroup>
  </ResizablePanel>
);

const LeftMainPanel = () => (
  <ResizablePanel defaultSize={70}>
    <ResizablePanelGroup direction="vertical">
      <SalesPreformancePanel />
      <WeatherPanel />
    </ResizablePanelGroup>
  </ResizablePanel>
);

const RightMainPanel = () => (
  <ResizablePanel defaultSize={30}>
    <div className="flex h-screen items-center justify-center p-6">
      <span className="font-semibold">Three</span>
    </div>
  </ResizablePanel>
);

const SalesPreformancePanel = () => (
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

const WeatherPanel = () => (
  <ResizablePanel defaultSize={62}>
    <ResizablePanelGroup direction="vertical">
      <EmployeesPanel />
      <InventorySnapshotPanel />
    </ResizablePanelGroup>
  </ResizablePanel>
);

const EmployeesPanel = () => (
  <ResizablePanel defaultSize={40} className="min-h-[100px]">
    <div className="h-full w-full px-4 pb-4">
      <Employees />
    </div>
  </ResizablePanel>
);

const InventorySnapshotPanel = () => (
  <ResizablePanel defaultSize={60} className="min-h-[100px]">
    <div className="h-full px-4 pb-4">
      <InventorySnapshot />
    </div>
  </ResizablePanel>
);
