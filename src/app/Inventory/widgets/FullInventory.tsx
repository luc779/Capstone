import { promises as fs } from "fs"
import path from "path"
import { z } from "zod"

import { columns } from "@/components/TableComponents/columns"
import { DataTable } from "@/components/TableComponents/data-table"
import { taskSchema } from "@/Api/inventoryData/schema"
import { Card, CardContent } from "@/components/ui/card"

// Simulate a database read for inventory.
async function getInventory() {
  const data = await fs.readFile(
    path.join(process.cwd(), "./src/Api/inventoryData/tasks.json")
  )

  const tasks = JSON.parse(data.toString())

  // let tasks: unknown[] = [];
  // getCookie("accessToken")
  //   .then(async response => {
  //       const test = await GetInventoryApiCall({ accessToken: response}) as { statusCode: number, body: string};
  //       console.log('response api' , test.body)
  //       // tasks = test;
  //       console.log('worked');
  //       return z.array(taskSchema).parse(tasks.toString());
  //   })
  //   .catch(error => {
  //       console.error(error);
  //       return z.array(taskSchema).parse(tasks.toString());
  //   });

  return z.array(taskSchema).parse(tasks)
}

export default async function FullInventoryShow() {
  const tasks = await getInventory()

  return (
    <Card className="overflow-auto h-full pt-4">
      <CardContent>
        <DataTable data={tasks} columns={columns} />
      </CardContent>
    </Card>
  )
}