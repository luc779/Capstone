import InventoryTest from "@/components/Templates/SoftwareDesign";
import DetailedViewCard from "./widgets/DetailedViewCard";

// Define currentPanelName
const currentPanelName: string = "Inventory -> Detailed View";

export default function DetailedView() {
  return (
    <main>
      <InventoryTest panelName={currentPanelName}>
        <div className="h-full">
          {/* {await BottomContentPanel()}  */}
          <BottomContentPanel />
        </div>
      </InventoryTest>
    </main>
  );
}

// Define BottomContentPanel as a separate component
const BottomContentPanel = () => {
  return (
    <div className="h-full">
      {/* {await DetailedViewCard()} */}
      <DetailedViewCard />
    </div>  
  );
};