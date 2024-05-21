import { SalesIcon } from "@/components/CustomIcons/CustomIcons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResizablePanel } from "@/components/ui/resizable";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const monthSalesData = [
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
  
export const MonthByMonthRevenue = () => (
    <ResizablePanel defaultSize={33} className="">
      <Card className="h-full pb-4">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-4">
          <CardTitle>
            Month by Month Revenue
          </CardTitle>
          <SalesIcon />
        </CardHeader>
        <CardContent className="flex h-full items-center justify-center">
          <ResponsiveContainer className="items-center" width="100%" height="100%">
            <BarChart data={monthSalesData}>
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
  