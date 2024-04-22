// 'use client'

import InventoryTest from "@/components/SoftwareDesign";
import { useEffect } from "react";
import DetailedViewCard from "./widgets/DetailedViewCard";
import GetVin from "./widgets/GetVin";

// Define currentPanelName
const currentPanelName: string = "Inventory -> Detailed View";

export default function DetailedView() {

  // const { content } = GetVin()

  // useEffect(() => {
  //   console.log(content);
  // }, [content]);

  // const content = 'test'
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
    <div className="h-full">
      <DetailedViewCard />
    </div>  
  );
};