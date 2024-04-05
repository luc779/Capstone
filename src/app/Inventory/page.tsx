import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

import SideBar from "@/widgets/SideBar";
import TopBar from "@/widgets/TopBar";
import FullInventory from "@/widgets/FullInventory";

export default function Inventory() {
  return (
    <main >
      <ResizablePanelGroup direction="horizontal">
        <SidebarPanel />
        <MainContentPanel />
      </ResizablePanelGroup>
    </main>
  );
}

// side bar
const SidebarPanel = () => (
    <ResizablePanel defaultSize={10}>
      <div className="flex h-screen justify-center py-4 pl-4">
        <SideBar />
      </div>
    </ResizablePanel>
);

// main content next to sideBar
const MainContentPanel = () => (
  <ResizablePanel defaultSize={90}>
    <ResizablePanelGroup direction="vertical">
      <TopContentPanel />
      <BottomContentPanel />
    </ResizablePanelGroup>
  </ResizablePanel>
);

// top panel
const TopContentPanel = () => (
  <ResizablePanel defaultSize={10}>
    {TopBar("Inventory")}
  </ResizablePanel>
);

// space for inventory
const BottomContentPanel = () => (
  <ResizablePanel defaultSize={90} className="overflow-auto p-4">
    <FullInventory />
  </ResizablePanel>
);