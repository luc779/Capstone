'use client'

import { z } from "zod"

import { columns } from "@/components/TableComponents/columns"
import { DataTable } from "@/components/TableComponents/data-table"
import { taskSchema } from "@/Api/inventoryData/schema"
import { Card, CardContent } from "@/components/ui/card"
import { getCookie } from "@/Security/GetCookie"
import { GetInventoryApiCall } from "@/Api/AWS/database/GetInventory"
import { useEffect, useState } from "react"

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

  useEffect(() => {
    const fetchData = async () => {

      try {
        const accessToken = await getCookie("accessToken");
  
        if (!accessToken) {
          setTasks(z.array(taskSchema).parse(JSON.parse("[]")))
          return;
        }
  
        const data = await GetInventoryApiCall({ accessToken: accessToken}) as ApiResponse;
        const post = z.array(taskSchema).parse(data.body)
        setTasks(post);
      } catch (error) {
        console.error("Error fetching inventory item:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Card className="overflow-auto h-full pt-4">
      <CardContent>
        <DataTable data={tasks} columns={columns} />
      </CardContent>
    </Card>
  )
}