import { promises as fs } from "fs"
import path from "path"
import { z } from "zod"

import { columns } from "@/components/TableComponents/columns"
import { DataTable } from "@/components/TableComponents/data-table"
import { taskSchema } from "@/Api/inventoryData/schema"
import { Card, CardContent } from "@/components/ui/card"
import { getCookie } from "@/Security/GetCookie"
import { GetInventoryApiCall } from "@/Api/AWS/database/GetInventory"

// Simulate a database read for inventory.
async function getInventory() {
  
  return getCookie("accessToken")
    .then(async response => {
        if (response == undefined) {
          throw Error;
        }
        const test = await GetInventoryApiCall({ accessToken: response}) as { statusCode: number, body: string};
        // console.log('response api: ' , test.body)
        // console.log('worked');
       return z.array(taskSchema).parse(test.body)
    })
    .catch(error => {
        console.error(error);
        return z.array(taskSchema).parse(JSON.parse("[]"))
    });
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