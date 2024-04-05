import FullInventory from "@/widgets/FullInventory";
import PageBaseDesign from "@/widgets/SoftwareDesign";

const currentPanelName: string = "Inventory";

export default function Inventory() {
  return (
    <main >
      <PageBaseDesign panelName={currentPanelName}>
        <BottomContentPanel />
      </PageBaseDesign>
    </main>
  );
}

// bottom panel will hold the full Inventory
const BottomContentPanel = () => (
    <FullInventory />
);