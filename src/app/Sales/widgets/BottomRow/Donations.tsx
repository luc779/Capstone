import { DonationIcon } from "@/components/CustomIcons/CustomIcons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResizablePanel } from "@/components/ui/resizable";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

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

export const Donations = () => (
    <ResizablePanel defaultSize={50} className="">
      <Card className="h-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-4">
          <CardTitle>
            Donations
          </CardTitle>
          <DonationIcon />
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
  