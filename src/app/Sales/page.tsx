import { ResizablePanel } from "@/components/ui/resizable";
import PageBaseDesign from "@/widgets/SoftwareDesign";

const currentPanelName: string = "Sales";

export default function Sales() {
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