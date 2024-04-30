import InventoryTest from "@/components/Templates/SoftwareDesign";
import FullInventoryShow from "@/app/Inventory/widgets/FullInventory";

// adding async makes the card weird
const currentPanelName: string = "Inventory";

export default function Inventory() {
  // const { loading, progressValue } = useAuth();

  // if (loading) {
  //   return (
  //     <LoadingIndicator progressValue={progressValue} />
  //   );
  // }

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
    <FullInventoryShow />
  </div>  
);