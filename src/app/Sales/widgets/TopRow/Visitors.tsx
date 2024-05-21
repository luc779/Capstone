import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResizablePanel } from "@/components/ui/resizable";
import { PersonIcon } from "@radix-ui/react-icons";

export const Visitors = () => (
    <ResizablePanel defaultSize={33} className="">
      <Card className="h-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Visitors
          </CardTitle>
          <PersonIcon />
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