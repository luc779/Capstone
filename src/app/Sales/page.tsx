'use client'

import PageBaseDesign from "@/components/Templates/SoftwareDesign";
import { useAuth } from "@/Api/AWS/authentication/UseAuth";
import LoadingIndicator from "@/components/LoadingIndicator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

import { Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

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

const COLORS = ['#7c3aed', '#00C49F', '#FFBB28', '#FF8042' , '#FF4042'];

const donationsData = [
  { month: 'Jan', donations: 500 },
  { month: 'Feb', donations: 700 },
  { month: 'Mar', donations: 900 },
  { month: 'Apr', donations: 600 },
  { month: 'May', donations: 800 },
  { month: 'Jun', donations: 1000 },
  { month: 'Jul', donations: 1200 },
  { month: 'Aug', donations: 1500 },
  { month: 'Sep', donations: 1100 },
  { month: 'Oct', donations: 1300 },
  { month: 'Nov', donations: 1400 },
  { month: 'Dec', donations: 1600 },
];

const carData = [
  {
    carType: 'American Classics',
    carsOfType: 20,
    B: 15,
    totalCars: 250,
  },
  {
    carType: 'European Sports Cars',
    carsOfType: 34,
    totalCars: 250,
  },
  {
    carType: 'Japanese Icons',
    carsOfType: 41,
    totalCars: 250,
  },
  {
    carType: 'Vintage Luxury Cars',
    carsOfType: 27,
    totalCars: 250,
  },
  {
    carType: 'Muscle Cars',
    carsOfType: 36,
    totalCars: 250,
  },
  {
    carType: 'Racing Legends',
    carsOfType: 42,
    totalCars: 250,
  },
  {
    carType: 'Modern Supercars',
    carsOfType: 49,
    totalCars: 250,
  },
];

interface DataPoint {
  date: Date;
  visitors: number;
  revenue: number;
}

const visitorData: DataPoint[] = Array.from({ length: 7 }, (_, index) => {
  const date = new Date();
  date.setDate(date.getDate() - (14 - index));
  const visitors = Math.floor(Math.random() * 100) + 50
  const revenue = Math.floor(Math.random() * 200) + 50
  return { date, visitors, revenue }
});

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
          Visitors
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
        <div className="text-2xl font-bold">2,350</div>
        <p className="text-xs text-muted-foreground">
          +18.1% from last month
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
          Cars in Museum
        </CardTitle>
        <svg 
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          stroke-width="2" 
          stroke-linecap="round" 
          stroke-linejoin="round" 
          className="h-4 w-4 text-muted-foreground"
        >
            <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/>
            <circle cx="7" cy="17" r="2"/><path d="M9 17h6"/>
            <circle cx="17" cy="17" r="2"/>
        </svg>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">250</div>
        <p className="text-xs text-muted-foreground">
          +10 since last month
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
          Month by Month Revenue
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
          <PieChart width={200} height={200}>
            <Pie
              dataKey="value"
              isAnimationActive={false}
              data={data01}
              cx="50%"
              cy="50%"
              outerRadius={50}
              fill="#8884d8"
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  </ResizablePanel>
);

const MiddleData = () => (
  <ResizablePanel defaultSize={50} className="">
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-4">
        <CardTitle>
          7-Day Visitors & Revenue
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
        <ResponsiveContainer width="100%" height="80%">
          <LineChart
            data={visitorData}
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="visitors" stroke="#7c3aed" />
            <Line type="monotone" dataKey="revenue" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
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
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-4">
        <CardTitle>
          Cars Types
        </CardTitle>
        <svg 
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          stroke-width="2" 
          stroke-linecap="round" 
          stroke-linejoin="round" 
          className="h-4 w-4 text-muted-foreground"
        >
          <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/>
          <circle cx="7" cy="17" r="2"/><path d="M9 17h6"/>
          <circle cx="17" cy="17" r="2"/>
        </svg>
      </CardHeader>
      <CardContent className="flex h-full items-center justify-center">
      <ResponsiveContainer width="100%" height="80%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={carData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="carType" />
          <PolarRadiusAxis />
          <Tooltip />
          <Radar name="Cars" dataKey="carsOfType" stroke="#7c3aed" fill="#7c3aed" fillOpacity={0.6} />
        </RadarChart>
      </ResponsiveContainer>
      </CardContent>
    </Card>
  </ResizablePanel>
);

const MiddleBottomData = () => (
  <ResizablePanel defaultSize={50} className="">
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-4">
        <CardTitle>
          Donations
        </CardTitle>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          stroke-width="2"
          stroke-linecap="round" 
          stroke-linejoin="round"
          className="h-4 w-4 text-muted-foreground"
          >
          <path d="m11 17 2 2a1 1 0 1 0 3-3"/>
          <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/>
          <path d="m21 3 1 11h-2"/>
          <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"/>
          <path d="M3 4h8"/>
        </svg>
      </CardHeader>
      <CardContent className="flex h-full items-center justify-center">
      <ResponsiveContainer width="100%" height="80%">
        <LineChart
          data={donationsData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="donations" stroke="#7c3aed" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
      </CardContent>
    </Card>
  </ResizablePanel>
);
