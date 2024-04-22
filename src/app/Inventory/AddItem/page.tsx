import InventoryTest from "@/components/SoftwareDesign";
import FullInventoryShow from "@/app/Inventory/widgets/FullInventory";

// adding async makes the card weird
const currentPanelName: string = "Inventory -> AddItem";

export default function AddItem() {
  return (
    <main >
      <InventoryTest panelName={currentPanelName}>
        <div className="h-full">
          <BottomContentPanel />
        </div>
      </InventoryTest>
    </main>
  );
}

// space for inventory
const BottomContentPanel = () => (
  <div className="h-full">
    <p>test</p>
  </div>  
);