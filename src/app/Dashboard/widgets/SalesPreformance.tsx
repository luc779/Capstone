import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { TotalRenevue } from '@/app/Sales/widgets/TopRow/TotalRevenue';
import { TotalCars } from '@/app/Sales/widgets/TopRow/TotalCars';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { AllSales } from '@/app/Sales/widgets/TopRow/AllSales';
import { Visitors } from '@/app/Sales/widgets/TopRow/Visitors';
import { ScrollBar } from '@/components/ui/scroll-area';

// uses a card component 
function SalesPreformance() {
  return (
    <Card className="h-full overflow-hidden">
        <CardHeader>
            <CardTitle>Sales Preformance</CardTitle>
            <CardDescription>Snapshot of Sales Data.</CardDescription>
        </CardHeader>
        <CardContent className=" h-full">
          <ScrollArea className="h-full w-full overflow-y-auto pb-20 pr-2">
            <div className='flex flex-col space-y-4'>
              <div className='flex space-x-4'>
                <TotalRenevue />
                <TotalCars />
              </div>
              <div className='flex space-x-4'>
                <AllSales />
                <Visitors />
              </div>
            </div>
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </CardContent>
    </Card>
  );
}

export default SalesPreformance;