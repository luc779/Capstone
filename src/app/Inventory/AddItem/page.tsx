import InventoryTest from "@/components/Templates/SoftwareDesign";
import AddItemForm from "./AddItemForm";

// adding async makes the card weird
const currentPanelName: string = "Inventory -> Add Item";

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
  <div className="h-full p-4">
    <AddItemForm />
  </div>  
);