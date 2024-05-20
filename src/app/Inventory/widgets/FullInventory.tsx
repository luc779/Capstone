'use client'

import { z } from "zod"
import { columns } from "@/components/TableComponents/columns"
import { DataTable } from "@/components/TableComponents/data-table"
import { taskSchema } from "@/Api/inventoryDataSchema/schema"
import { Card, CardContent } from "@/components/ui/card"
import { getCookie } from "@/Security/GetCookie"
import { GetInventoryApiCall } from "@/Api/AWS/database/GetInventory"
import { useEffect, useState } from "react"
import { DataTableSkeleton } from "@/components/TableComponents/data-table-skeleton"
import { ErrorToast } from "@/components/ErrorToast"

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

export default function FullInventoryShow() {
  const [tasks, setTasks] = useState<InventoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchData = async () => {

      try {
        const accessToken = await getCookie("accessToken");
  
        if (!accessToken) {
          ErrorToast("Account not signed in.");
          setTasks(z.array(taskSchema).parse(JSON.parse("[]")))
          setIsLoading(false);
          return;
        }
  
        const data = await GetInventoryApiCall({ accessToken: accessToken}) as ApiResponse;
        const post = z.array(taskSchema).parse(data.body)
        setTasks(post);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching full inventory:", error);
        ErrorToast("Server ran into an issue.");
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Card className="overflow-auto h-full pt-4">
      <CardContent>
        {isLoading ? (
          <DataTableSkeleton />
        ) : (
          <DataTable data={tasks} columns={columns} />
        )}
      </CardContent>
    </Card>
  )
}