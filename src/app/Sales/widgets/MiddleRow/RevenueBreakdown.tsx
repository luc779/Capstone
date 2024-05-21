import { SalesIcon } from "@/components/CustomIcons/CustomIcons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResizablePanel } from "@/components/ui/resizable";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const data01 = [
    { name: 'Endowment', value: 3166.2323 }, // 7%
    { name: 'Admissions', value: 5880.1457 }, //13%
    { name: 'Memorabilia Sales', value: 3166.2323 }, // 7%
    { name: 'Donations', value: 13117.2481 }, // 29%
    { name: 'Fundraising Events', value: 19902.0316 } // 44%
];
  
const COLORS = ['#7c3aed', '#00C49F', '#FFBB28', '#FF8042' , '#FF4042'];

export const RevenueBreakdown = () => (
    <ResizablePanel defaultSize={50} className="">
      <Card className="h-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-4">
          <CardTitle>
            Revenue Breakdown
          </CardTitle>
          <SalesIcon />
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
                {data01.map((entry, index) => (
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