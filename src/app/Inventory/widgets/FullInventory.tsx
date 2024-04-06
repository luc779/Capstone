import { promises as fs } from "fs"
import path from "path"
import { z } from "zod"

import { columns } from "@/components/TableComponents/columns"
import { DataTable } from "@/components/TableComponents/data-table"
import { taskSchema } from "@/apiCalls/inventoryData/schema"
import { Card, CardContent } from "@/components/ui/card"

// Simulate a database read for inventory.
async function getInventory() {
  const data = await fs.readFile(
    path.join(process.cwd(), "./src/apiCalls/inventoryData/tasks.json")
  )

  const tasks = JSON.parse(data.toString())

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