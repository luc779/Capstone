import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from 'next/link';

// uses a card component 
function SalesPreformance() {
  return (
    <Card className="h-full overflow-auto">
        <CardHeader>
            <CardTitle>Sales Preformance</CardTitle>
            <CardDescription>Statisics.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
            <div className=" flex items-center space-x-4 rounded-md border p-4">
              <p>test</p>
            </div>
        </CardContent>
        <CardFooter>
            <Button variant="default">
                <Link href="/Sales">Direct to Sales Preformance Page</Link>
            </Button>
        </CardFooter>
    </Card>
  );
}

export default SalesPreformance;