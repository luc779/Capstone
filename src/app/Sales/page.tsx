'use client'

import PageBaseDesign from "@/components/Templates/SoftwareDesign";
import { useAuth } from "@/Api/AWS/authentication/UseAuth";
import LoadingIndicator from "@/components/LoadingIndicator";
import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { TotalRenevue } from "./widgets/TopRow/TotalRevenue";
import { Visitors } from "./widgets/TopRow/Visitors";
import { AllSales } from "./widgets/TopRow/AllSales";
import { TotalCars } from "./widgets/TopRow/TotalCars";
import { MonthByMonthRevenue } from "./widgets/BigSection/MonthByMonthRevenue";
import { RevenueBreakdown } from "./widgets/MiddleRow/RevenueBreakdown";
import { VisitorsAndRevenue } from "./widgets/MiddleRow/VisitorsAndRevenue";
import { CarTypes } from "./widgets/BottomRow/CarTypes";
import { Donations } from "./widgets/BottomRow/Donations";

const currentPanelName: string = "Sales";

export default function Sales() {
  const { loading, progressValue } = useAuth();

  if (loading) {
    return (
      <LoadingIndicator progressValue={progressValue} />
    );
  }

  return (
    <main>
      <PageBaseDesign panelName={currentPanelName}>
        <BottomContentPanel />
      </PageBaseDesign>
    </main>
  );
}

// space for inventory
const BottomContentPanel = () => (
  <div className="flex flex-col h-full items-center justify-center p-4">
    <ResizablePanelGroup direction="vertical" className="space-y-4">
      <TopRowData />
      <BottomData  />
    </ResizablePanelGroup>
  </div>
);

const TopRowData = () => (
  <ResizablePanel defaultSize={15} className="">
    <ResizablePanelGroup direction="horizontal" className="space-x-4 ">
      <TotalRenevue />
      <Visitors />
      <AllSales />
      <TotalCars />
    </ResizablePanelGroup>
  </ResizablePanel>
);

const BottomData = () => (
  <ResizablePanel defaultSize={85} className="">
    <ResizablePanelGroup direction="horizontal" className="space-x-4">
      <BottomRowsData  />
      <MonthByMonthRevenue />
    </ResizablePanelGroup>
  </ResizablePanel>
);

const BottomRowsData = () => (
  <ResizablePanel defaultSize={66}>
    <ResizablePanelGroup direction="vertical" className="space-y-4">
      <BottomTopLeftData />
      <BottomRowData />
    </ResizablePanelGroup>
  </ResizablePanel>
);

const BottomTopLeftData = () => (
  <ResizablePanel defaultSize={33} className="">
    <ResizablePanelGroup direction="horizontal" className="space-x-4">
      <RevenueBreakdown />
      <VisitorsAndRevenue />
    </ResizablePanelGroup>
  </ResizablePanel>
);

const BottomRowData = () => (
  <ResizablePanel defaultSize={33} className="">
    <ResizablePanelGroup direction="horizontal" className="space-x-4">
      <CarTypes />
      <Donations />
    </ResizablePanelGroup>
  </ResizablePanel>
);
