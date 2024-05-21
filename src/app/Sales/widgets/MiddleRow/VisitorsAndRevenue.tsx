import { SalesIcon } from "@/components/CustomIcons/CustomIcons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResizablePanel } from "@/components/ui/resizable";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

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

export const VisitorsAndRevenue = () => (
    <ResizablePanel defaultSize={50} className="">
      <Card className="h-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-4">
          <CardTitle>
            7-Day Visitors & Revenue
          </CardTitle>
          <SalesIcon />
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