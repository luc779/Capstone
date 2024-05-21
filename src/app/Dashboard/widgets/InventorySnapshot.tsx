"use client"

import React, { useEffect, useState } from 'react';
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
import { getCookie } from '@/Security/GetCookie';
import { AuthenticationErrorToast, ErrorToast } from '@/components/ErrorToast';
import { z } from 'zod';
import { taskSchema } from '@/Api/inventoryDataSchema/schema';
import { GetInventoryApiCall } from '@/Api/AWS/database/GetInventory';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useRouter } from "next/navigation";

interface ApiResponse {
  statusCode: number;
  body: string;
}

interface InventoryItem {
  VIN: string;
  make: string;
  model: string;
  year: string;
  color: string;
}

// creates a card component which holds a table component on a few vehicles, at the bottom of the card contains a button to direct to inventory
function InventorySnapshot() {
  const router = useRouter();
  const [inventory, setInventory] = useState<InventoryItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {

      try {
        const accessToken = await getCookie("accessToken");
  
        if (!accessToken) {
          ErrorToast("Account not signed in.");
          setInventory(z.array(taskSchema).parse(JSON.parse("[]")))
          return;
        }
  
        const data = await GetInventoryApiCall({ accessToken: accessToken}) as ApiResponse;
        if (data.statusCode == 401) {
          AuthenticationErrorToast("Please log in to get a new token.");
          router.push('/LogIn');
          return;
        }
        const post = z.array(taskSchema).parse(data.body);
        // console.log("inventory Array: " + post);
        setInventory(post);
      } catch (error) {
        console.error("Error fetching inventory snapshot:", error);
        console.log("Error here is the inventory: " + JSON.stringify(inventory));
        ErrorToast("Server ran into an issue.");
      }
    };

    fetchData();
  }, []);

  return (
    <Card className="h-full">
        <CardHeader>
            <CardTitle>Inventory Snapshot</CardTitle>
            <CardDescription>Recent inventory changes.</CardDescription>
        </CardHeader>
        <CardContent className="inline-block h-full w-full items-center">
          <ScrollArea className="flex flex-col overlflow-y-auto h-full w-full pb-20 pr-2">
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
                {inventory.map((item) => (
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
            <Button variant="default">
              <Link href="/Inventory">Direct to Inventory</Link>
            </Button>
          </ScrollArea>
        </CardContent>
    </Card>
  );
}

export default InventorySnapshot;