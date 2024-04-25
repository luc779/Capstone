'use client'

import { ResizablePanel } from "@/components/ui/resizable";
import PageBaseDesign from "@/components/Templates/SoftwareDesign";
import { useAuth } from "@/Api/AWS/authentication/UseAuth";
import LoadingIndicator from "@/components/LoadingIndicator";

const currentPanelName: string = "Sales";

export default function Sales() {
  const { loading, progressValue } = useAuth();

  if (loading) {
    return (
      <LoadingIndicator progressValue={progressValue} />
    );
  }

  return (
    <main>
      <PageBaseDesign panelName={currentPanelName}>
        <BottomContentPanel />
      </PageBaseDesign>
    </main>
  );
}

// space for inventory
const BottomContentPanel = () => (
  <ResizablePanel defaultSize={90} className="flex h-full items-center justify-center p-6">
      <span className="font-semibold">Sales</span>
  </ResizablePanel>
);