import * as React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { columns } from "./columns"

export function DataTableSkeleton() {
    const skeletonColumns = [
        { key: "make", title: "Make", width: "90px" },
        { key: "model", title: "Model", width: "100px" },
        { key: "year", title: "Year", width: "50px" },
        { key: "color", title: "Color", width: "100px" },
        { key: "vin", title: "VIN", width: "200px" },
        { key: "actions", title: "Action", width: "10px" },
      ];

    const skeletonRows = Array.from({ length: 8 }); // Adjust the number of skeleton rows as needed
  
    return (
        <div>
            <div className="flex items-center justify-between pb-4">
                <div className="flex flex-1 items-center space-x-2">
                    <div className="animate-pulse h-8 bg-gray-200 rounded-md w-40"></div>
                </div>
                <div className="flex space-x-2">
                    <div className="animate-pulse h-8 bg-gray-200 rounded-md w-20"></div>
                    <div className="animate-pulse h-8 bg-gray-200 rounded-md w-20"></div>
                </div>
            </div>
        <div className="space-y-4">
            <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        {skeletonColumns.map((column) => (
                            <TableHead key={column.key} style={{ width: column.width }}>
                                {column.title}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {skeletonRows.map((_, rowIndex) => (
                        <TableRow key={rowIndex}>
                        {columns.map((_, colIndex) => (
                            <TableCell key={`${rowIndex}-${skeletonColumns[colIndex].key}`}>
                            <div className="animate-pulse h-8 bg-gray-200 rounded-md"></div>
                            </TableCell>
                        ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </div>
        </div>
        <div className="flex items-center justify-between px-2 pt-4">
            <div className="flex-1 text-sm text-muted-foreground">
                <div className="animate-pulse h-8 bg-gray-200 rounded-md w-20"></div>
            </div>
            <div className="flex items-center space-x-6 lg:space-x-8">
                <div className="flex items-center space-x-2">
                    <div className="animate-pulse h-8 bg-gray-200 rounded-md w-70"></div>
                </div>
                <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                    <div className="animate-pulse h-8 bg-gray-200 rounded-md w-20"></div>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="animate-pulse h-8 bg-gray-200 rounded-md w-8"></div>
                    <div className="animate-pulse h-8 bg-gray-200 rounded-md w-8"></div>
                    <div className="animate-pulse h-8 bg-gray-200 rounded-md w-8"></div>
                    <div className="animate-pulse h-8 bg-gray-200 rounded-md w-8"></div>
                </div>
            </div>
        </div>
        </div>
    );
  }