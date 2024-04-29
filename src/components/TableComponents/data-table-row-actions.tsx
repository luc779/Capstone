"use client"

import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Row } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { taskSchema } from "../../Api/inventoryData/schema"
import { setCookie } from "@/Security/SetCookie"

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

const handleDetailedViewClick = async (task: string) => {
  localStorage.setItem('DetailedView', task)
  console.log("clicked on: ", task)
  await setCookie('DetailedView', task)
  window.location.href = "/Inventory/DetailedView";
};

const handleEditClick = async (task: string) => {
  window.location.href = "/Inventory/EditItem";
};

const handleDeleteClick = async (task: string) => {
  window.location.href = "/Inventory/DetailedView";
};

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const task = taskSchema.parse(row.original)
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem onSelect={() => handleDetailedViewClick(task.VIN)}>Detailed View</DropdownMenuItem>
        <DropdownMenuItem>Share</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleEditClick(task.VIN)}>Edit</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleDeleteClick(task.VIN)}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
