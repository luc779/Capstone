import InventoryTest from "@/components/Templates/SoftwareDesign";
import EditItemForm from "./EditItemForm";

// adding async makes the card weird
const currentPanelName: string = "Inventory -> Edit Item";

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
    <EditItemForm />
  </div>  
);