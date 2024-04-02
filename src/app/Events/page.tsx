import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

import SideBar from "@/widgets/SideBar";
import TopBar from "@/widgets/TopBar";

// base panel
export default function Sales() {
  return (
    <main>
      <ResizablePanelGroup direction="horizontal">
        <SidebarPanel />
        <MainContentPanel />
      </ResizablePanelGroup>
    </main>
  );
}

// same side bar panel
const SidebarPanel = () => (
    <ResizablePanel defaultSize={10}>
      <div className="flex h-screen justify-center py-4 pl-4">
        <SideBar />
      </div>
    </ResizablePanel>
);

// main content next to the sidebar
const MainContentPanel = () => (
  <ResizablePanel defaultSize={90}>
    <ResizablePanelGroup direction="vertical">
      <TopContentPanel />
      <ResizableHandle />
      <BottomContentPanel />
    </ResizablePanelGroup>
  </ResizablePanel>
);

// top panel for user
const TopContentPanel = () => (
  <ResizablePanel defaultSize={10}>
    {TopBar("Events")}
  </ResizablePanel>
);

// space for events
const BottomContentPanel = () => (
  <ResizablePanel defaultSize={90}>
    <div className="flex h-full items-center justify-center p-6">
      <span className="font-semibold">Events</span>
    </div>
  </ResizablePanel>
);