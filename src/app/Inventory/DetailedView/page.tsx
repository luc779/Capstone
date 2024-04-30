import InventoryTest from "@/components/Templates/SoftwareDesign";
import DetailedViewCard from "./widgets/DetailedViewCard";

// Define currentPanelName
const currentPanelName: string = "Inventory -> Detailed View";

export default async function DetailedView() {
  return (
    <main>
      <InventoryTest panelName={currentPanelName}>
        <div className="h-full">
          {await BottomContentPanel()} 
        </div>
      </InventoryTest>
    </main>
  );
}

// Define BottomContentPanel as a separate component
const BottomContentPanel = async () => {
  return (
    <div className="h-full">
      {await DetailedViewCard()}
    </div>  
  );
};