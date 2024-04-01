import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

import SideBar from "@/widgets/SideBar";

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
    <div className="flex h-full items-center justify-center p-6">
      <span className="font-semibold">Tasks</span>
    </div>
  </ResizablePanel>
);