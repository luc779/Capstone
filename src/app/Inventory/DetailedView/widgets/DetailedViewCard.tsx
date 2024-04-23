'use client'

import { taskSchema } from "@/apiCalls/inventoryData/schema";
import { Card, CardContent } from "@/components/ui/card"
import axios from "axios";
import { useEffect, useState } from "react";
import { z } from "zod";

export default function DetailedViewCard() {
  const [data, setData] = useState<String | null>(null);

  useEffect(() => {
    const storedItem = localStorage.getItem('DetailedView');
    console.log(storedItem)
    setData(storedItem)
    // getItem(storedItem)
  }, []);

  return (
    <Card className="overflow-auto h-full pt-4">
      <CardContent>
        <p>test {data}</p>
      </CardContent>
    </Card>
  )
}

// Simulate a database read for inventory.
// async function getItem(VIN: string | null) {
//   try {
//     const parsedTasks = z.array(taskSchema).parse(tasks);

//     // Find the task with the matching VIN
//     const matchingTask = parsedTasks.find(task => task.VIN === VIN);
//     console.log(matchingTask)
//   } catch (error) {
//     console.error('Error fetching item:', error);
//     throw error; 
//   }
// }
