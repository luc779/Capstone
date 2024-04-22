"use client"

import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"
import { PlusIcon } from "@radix-ui/react-icons"
import Link from 'next/link';

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "./data-table-view-options"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter VINs..."
          value={(table.getColumn("VIN")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("VIN")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex space-x-2">
        <Link href="/Inventory/AddItem">
          
          <Button
              variant="outline"
              size="sm"
              className="ml-auto hidden h-8 lg:flex"
            >
                <PlusIcon className="mr-2 h-4 w-4" />
                Add Item
            </Button>

        </Link>
        <DataTableViewOptions table={table} />
      </div>
    </div>
  )
}
