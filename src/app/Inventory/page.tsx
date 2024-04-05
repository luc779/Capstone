import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

import SideBar from "@/widgets/SideBar";
import TopBar from "@/widgets/TopBar";
import FullInventory from "@/widgets/FullInventory";
import InventoryTest from "@/widgets/Design";

const currentPanelName: string = "Inventory";

export default function Inventory() {
  return (
    <main >
      <InventoryTest panelName={currentPanelName}>
        <BottomContentPanel />
      </InventoryTest>
    </main>
  );
}

// bottom panel will hold the full Inventory
const BottomContentPanel = () => (
    <FullInventory />
);