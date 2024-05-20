'use client'

import PageBaseDesign from "@/components/Templates/SoftwareDesign";
import { useAuth } from "@/Api/AWS/authentication/UseAuth";
import LoadingIndicator from "@/components/LoadingIndicator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

import { Bar, BarChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    total: Math.floor(Math.random() * 20000) + 1000,
  },
  {
    name: "Feb",
    total: Math.floor(Math.random() * 20000) + 1000,
  },
  {
    name: "Mar",
    total: Math.floor(Math.random() * 20000) + 1000,
  },
  {
    name: "Apr",
    total: Math.floor(Math.random() * 20000) + 1000,
  },
  {
    name: "May",
    total: Math.floor(Math.random() * 20000) + 1000,
  },
  {
    name: "Jun",
    total: Math.floor(Math.random() * 20000) + 1000,
  },
  {
    name: "Jul",
    total: Math.floor(Math.random() * 20000) + 1000,
  },
  {
    name: "Aug",
    total: Math.floor(Math.random() * 20000) + 1000,
  },
  {
    name: "Sep",
    total: Math.floor(Math.random() * 20000) + 1000,
  },
  {
    name: "Oct",
    total: Math.floor(Math.random() * 20000) + 1000,
  },
  {
    name: "Nov",
    total: Math.floor(Math.random() * 20000) + 1000,
  },
  {
    name: "Dec",
    total: Math.floor(Math.random() * 20000) + 1000,
  },
]


const data01 = [
  { name: 'Endowment', value: 3166.2323 }, // 7%
  { name: 'Admissions', value: 5880.1457 }, //13%
  { name: 'Memorabilia Sales', value: 3166.2323 }, // 7%
  { name: 'Donations', value: 13117.2481 }, // 29%
  { name: 'Fundraising Events', value: 19902.0316 } // 44%
];


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
      <LeftTopData  />
      <MiddleLeftTopData />
      <MiddleRightTopData />
      <RightTopData />
    </ResizablePanelGroup>
  </ResizablePanel>
);

const LeftTopData = () => (
  <ResizablePanel defaultSize={33} className="">
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-4">
        <CardTitle className="text-sm font-medium">
          Total Revenue
        </CardTitle>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="h-4 w-4 text-muted-foreground"
        >
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="text-2xl font-bold">$45,231.89</div>
        <p className="text-xs text-muted-foreground">
          +20.1% from last month
        </p>
      </CardContent>
    </Card>
  </ResizablePanel>
);

const MiddleLeftTopData = () => (
  <ResizablePanel defaultSize={33} className="">
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Subscriptions
        </CardTitle>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="h-4 w-4 text-muted-foreground"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">+2350</div>
        <p className="text-xs text-muted-foreground">
          +180.1% from last month
        </p>
      </CardContent>
    </Card>
  </ResizablePanel>
);

const MiddleRightTopData = () => (
  <ResizablePanel defaultSize={33} className="">
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Sales</CardTitle>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="h-4 w-4 text-muted-foreground"
        >
          <rect width="20" height="14" x="2" y="5" rx="2" />
          <path d="M2 10h20" />
        </svg>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">+12,234</div>
        <p className="text-xs text-muted-foreground">
          +19% from last month
        </p>
      </CardContent>
    </Card>
  </ResizablePanel>
);

const RightTopData = () => (
  <ResizablePanel defaultSize={33} className="">
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Active Now
        </CardTitle>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="h-4 w-4 text-muted-foreground"
        >
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">+573</div>
        <p className="text-xs text-muted-foreground">
          +201 since last hour
        </p>
      </CardContent>
    </Card>
  </ResizablePanel>
);

const BottomData = () => (
  <ResizablePanel defaultSize={85} className="">
    <ResizablePanelGroup direction="horizontal" className="space-x-4">
      <BottomRowsData  />
      <BigRightData />
    </ResizablePanelGroup>
  </ResizablePanel>
);

const BigRightData = () => (
  <ResizablePanel defaultSize={33} className="">
    <Card className="h-full pb-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-4">
        <CardTitle>
          Monthly Revenue
        </CardTitle>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="h-4 w-4 text-muted-foreground"
        >
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      </CardHeader>
      <CardContent className="flex h-full items-center justify-center">
        <ResponsiveContainer className="items-center" width="100%" height="100%">
          <BarChart data={data}>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip />
            <Bar
              dataKey="total"
              fill="currentColor"
              radius={[4, 4, 0, 0]}
              className="fill-primary"
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
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
      <LeftMiddleData />
      <MiddleData />
    </ResizablePanelGroup>
  </ResizablePanel>
);

const LeftMiddleData = () => (
  <ResizablePanel defaultSize={50} className="">
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-4">
        <CardTitle>
          Revenue Breakdown
        </CardTitle>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="h-4 w-4 text-muted-foreground"
        >
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      </CardHeader>
      <CardContent className="flex h-full items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={400} height={400}>
            <Pie
              dataKey="value"
              isAnimationActive={false}
              data={data01}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  </ResizablePanel>
);

const MiddleData = () => (
  <ResizablePanel defaultSize={50} className="">
    <Card className="h-full">
      <CardContent>
        MiddleData
      </CardContent>
    </Card>
    
  </ResizablePanel>
);

const BottomRowData = () => (
  <ResizablePanel defaultSize={33} className="">
    <ResizablePanelGroup direction="horizontal" className="space-x-4">
      <LeftBottomData />
      <MiddleBottomData />
    </ResizablePanelGroup>
  </ResizablePanel>
);

const LeftBottomData = () => (
  <ResizablePanel defaultSize={50} className="">
    <Card className="h-full">
      <CardContent>
      LeftBottomData
      </CardContent>
    </Card>
  </ResizablePanel>
);

const MiddleBottomData = () => (
  <ResizablePanel defaultSize={50} className="">
    <Card className="h-full">
      <CardContent>
        MiddleBottomData
      </CardContent>
    </Card>
  </ResizablePanel>
);
