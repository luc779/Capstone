import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

import SideBar from "@/widgets/SideBar";
import TopBar from "@/widgets/TopBar";
import { ReactNode } from "react";
import { Separator } from "@/components/ui/separator";

interface PanelProps {
    children: ReactNode;
    panelName: string;
}

export default function PageBaseDesign({ children, panelName }: PanelProps) {
  return (
    <main >
      <ResizablePanelGroup direction="horizontal">
        <SidebarPanel />
        <MainContentPanel children={children} panelName={panelName}/>
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
const MainContentPanel: React.FC<PanelProps> = ({ children, panelName }) => (
  <ResizablePanel defaultSize={90}>
    <ResizablePanelGroup direction="vertical">
      <TopContentPanel panelName={panelName}/>
      <div className="pl-4">
        <Separator />
      </div>
      <BottomContentPanel children={children} panelName={panelName}/>
    </ResizablePanelGroup>
  </ResizablePanel>
);

// top panel
const TopContentPanel: React.FC<{ panelName: string }> = ({ panelName }) => (
  <ResizablePanel defaultSize={10}>
    {TopBar(panelName)}
  </ResizablePanel>
);

// space for inventory
const BottomContentPanel: React.FC<PanelProps> = ({ children }) => (
  <ResizablePanel defaultSize={90} className="overflow-auto p-4">
    {children}
  </ResizablePanel>
);