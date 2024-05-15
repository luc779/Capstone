"use client"
import PageBaseDesign from "@/components/Templates/SoftwareDesign";
import FullInventoryShow from "@/app/Inventory/widgets/FullInventory";
import LoadingIndicator from "@/components/LoadingIndicator";
import { useAuth } from "@/Api/AWS/authentication/UseAuth";

// adding async makes the card weird
const currentPanelName: string = "Inventory";

export default function Inventory() {
  const { loading, progressValue } = useAuth();

  if (loading) {
    return (
      <LoadingIndicator progressValue={progressValue} />
    );
  }

  return (
    <main >
      <PageBaseDesign panelName={currentPanelName}>
        <div className="h-full">
          <BottomContentPanel />
        </div>
      </PageBaseDesign>
    </main>
  );
}

// space for inventory
const BottomContentPanel = () => (
  <div className="h-full">
    <FullInventoryShow />
  </div>  
);