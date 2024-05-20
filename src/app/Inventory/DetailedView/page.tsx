import InventoryTest from "@/components/Templates/SoftwareDesign";
import DetailedViewCard from "./widgets/DetailedViewCard";

// Define currentPanelName
const currentPanelName: string = "Inventory -> Detailed View";

export default function DetailedView() {
  return (
    <main>
      <InventoryTest panelName={currentPanelName}>
        <div className="h-full">
          <BottomContentPanel />
        </div>
      </InventoryTest>
    </main>
  );
}

// Define BottomContentPanel as a separate component
const BottomContentPanel = () => {
  return (
    <div className="h-full p-4">
      <DetailedViewCard />
    </div>  
  );
};