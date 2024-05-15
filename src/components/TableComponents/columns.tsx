"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Task } from "../../Api/inventoryDataSchema/schema"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "make",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Make" />
    ),
    cell: ({ row }) => <div className="flex w-[90px]">{row.getValue("make")}</div>
  },
  {
    accessorKey: "model",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Model" />
    ),
    cell: ({ row }) => <div className="flex max-w-[100px] font-medium">{row.getValue("model")}</div>
  },
  {
    accessorKey: "year",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Year" />
    ),
    cell: ({ row }) => <div className="flex w-[50px] truncate items-center justify-center">{row.getValue("year")}</div>
  },
  {
    accessorKey: "color",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Color" />
    ),
    cell: ({ row }) => <div className="flex w-[100px]">{row.getValue("color")}</div>
  },
  {
    accessorKey: "VIN",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="VIN" />
    ),
    cell: ({ row }) => <div className="flex w-[200px] truncate">{row.getValue("VIN")}</div>
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]


// can add icons for coupe, sedan, suv
{/* <div className="flex space-x-2">
  {label && <Badge variant="outline">{label.label}</Badge>}
  <span className="max-w-[500px] truncate font-medium">
    {row.getValue("title")}
  </span>
</div> */}