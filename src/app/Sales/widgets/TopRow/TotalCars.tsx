import { CarIcon } from "@/components/CustomIcons/CustomIcons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResizablePanel } from "@/components/ui/resizable";

export const TotalCars = () => (
    <ResizablePanel defaultSize={33} className="">
      <Card className="h-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Cars in Museum
          </CardTitle>
          <CarIcon />
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
  