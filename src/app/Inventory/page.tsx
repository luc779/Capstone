import InventoryTest from "@/components/SoftwareDesign";
import FullInventoryShow from "@/app/Inventory/widgets/FullInventory";

// adding async makes the card weird
const currentPanelName: string = "Inventory";

export default async function Inventory() {
  return (
    <main >
      <InventoryTest panelName={currentPanelName}>
        <div className="h-full">
          {await BottomContentPanel()} 
        </div>
      </InventoryTest>
    </main>
  );
}

// space for inventory
const BottomContentPanel = async () => (
  <div className="h-full">
    {await FullInventoryShow()} 
  </div>  
);