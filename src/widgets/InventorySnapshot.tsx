import React from 'react';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Button } from '@/components/ui/button';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from 'next/link';

// TODO: get museum inventory
const RecentInventory = [
  {
    make: "Ferrari",
    model: "488",
    year: "2019",
    color: "Red",
    VIN: "328g7f2g"
  },
  {
    make: "Lamborghini",
    model: "Huracan",
    year: "2019",
    color: "Yellow",
    VIN: "328g7wefewf2g"
  },
  {
    make: "Buggatti",
    model: "Veyron",
    year: "2014",
    color: "Black",
    VIN: "32d3228g7f2g"
  }
]

// creates a card component which holds a table component on a few vehicles, at the bottom of the card contains a button to direct to inventory
function InventorySnapshot() {
  return (
    <Card className="h-full overflow-auto">
        <CardHeader>
            <CardTitle>Inventory Snapshot</CardTitle>
            <CardDescription>Recent inventory changes.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
            <div className=" ">
            <Table>
              <TableCaption>A list of your recent items.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Make</TableHead>
                  <TableHead>Model</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead>Color</TableHead>
                  <TableHead className="text-right">VIN</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {RecentInventory.map((item) => (
                  <TableRow key={item.VIN}>
                    <TableCell className="font-medium">{item.make}</TableCell>
                    <TableCell>{item.model}</TableCell>
                    <TableCell>{item.year}</TableCell>
                    <TableCell>{item.color}</TableCell>
                    <TableCell className="text-right">{item.VIN}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={5}>...</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
            </div>
        </CardContent>
        <CardFooter>
          <Button variant="default">
            <Link href="/Inventory">Direct to Invnetory</Link>
          </Button>
        </CardFooter>
    </Card>
  );
}

export default InventorySnapshot;