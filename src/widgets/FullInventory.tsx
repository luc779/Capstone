"use client"
import React, { useState } from 'react';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import Link from 'next/link';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Post {
  link: string,
  linkLabel: string,
  make: string,
  model: string,
  year: string,
  color: string,
  VIN: string
}

const inventoryData = [
  {
    link: "/inventory/item1",
    linkLabel: "View Item 1",
    make: "Bugatti",
    model: "Veyron",
    year: "2014",
    color: "Black",
    VIN: "32d3228g7f2g"
  },
  {
    link: "/inventory/item2",
    linkLabel: "View Item 2",
    make: "Ferrari",
    model: "458 Italia",
    year: "2012",
    color: "Red",
    VIN: "78c93hj3g5r6"
  },
  {
    link: "/inventory/item3",
    linkLabel: "View Item 3",
    make: "Lamborghini",
    model: "Aventador",
    year: "2018",
    color: "Yellow",
    VIN: "54s12g76s9d0"
  },
  {
    link: "/inventory/item4",
    linkLabel: "View Item 4",
    make: "Porsche",
    model: "911 GT3",
    year: "2020",
    color: "White",
    VIN: "23g7hj2g1d5h"
  },
  {
    link: "/inventory/item5",
    linkLabel: "View Item 5",
    make: "McLaren",
    model: "720S",
    year: "2019",
    color: "Blue",
    VIN: "89f32g7h6s9k"
  },
  {
    link: "/inventory/item6",
    linkLabel: "View Item 6",
    make: "Aston Martin",
    model: "DB11",
    year: "2017",
    color: "Silver",
    VIN: "12f6gh3s9g8k"
  },
  {
    link: "/inventory/item7",
    linkLabel: "View Item 7",
    make: "Rolls-Royce",
    model: "Phantom",
    year: "2021",
    color: "Gold",
    VIN: "87c32g1d9s5t"
  },
  {
    link: "/inventory/item8",
    linkLabel: "View Item 8",
    make: "Bentley",
    model: "Continental GT",
    year: "2016",
    color: "Green",
    VIN: "45h7j2g9f3d2"
  },
  {
    link: "/inventory/item9",
    linkLabel: "View Item 9",
    make: "Mercedes-Benz",
    model: "S-Class",
    year: "2022",
    color: "Gray",
    VIN: "76c3g5f9g2d1"
  },
  {
    link: "/inventory/item10",
    linkLabel: "View Item 10",
    make: "BMW",
    model: "M5",
    year: "2020",
    color: "Orange",
    VIN: "32s78f5g9h3t"
  },
  {
    link: "/inventory/item11",
    linkLabel: "View Item 11",
    make: "Audi",
    model: "R8",
    year: "2015",
    color: "Purple",
    VIN: "90c21g7h3f6s"
  },
  {
    link: "/inventory/item12",
    linkLabel: "View Item 12",
    make: "Tesla",
    model: "Model S",
    year: "2023",
    color: "Turquoise",
    VIN: "90c21g753f6s"
  } 
];

// creates a card component which holds a table component on a few vehicles, at the bottom of the card contains a button to direct to inventory
function InventorySnapshot() {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const totalDataitems = inventoryData.length;
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(totalDataitems/8);
  const [data, setData] = useState<Post[]>([]);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(rowsPerPage);

  return (
    <Card className='overflow-auto h-full'>
      <CardContent>
      <div className="p-6">
          <Table>
            <TableCaption>A list of your recent items.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Make</TableHead>
                <TableHead>Model</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Color</TableHead>
                <TableHead className="text-right">VIN</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventoryData.slice(startIndex, endIndex).map((item) => (
                <TableRow key={item.VIN}>
                  <TableCell className="font-medium">{item.make}</TableCell>
                  <TableCell>{item.model}</TableCell>
                  <TableCell>{item.year}</TableCell>
                  <TableCell>{item.color}</TableCell>
                  <TableCell className="text-right">{item.VIN}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={5}>...</TableCell>
              </TableRow>
            </TableFooter>
          </Table>  
          <Pagination className=''>
            <PaginationContent className="w-full flex justify-between">
              <div className="flex justify-start">
                <p>Total Inventory: {totalDataitems}</p>
              </div>
              <div className="flex justify-end items-center ">
                <div className='flex justify-end items-center pr-4'>
                  <p className='pr-4'>Rows per Page</p>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder={rowsPerPage} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem onClick={() => setRowsPerPage(rowsPerPage - 2)} value="page">{rowsPerPage - 2}</SelectItem>
                        <SelectItem value="banana">{rowsPerPage}</SelectItem>
                        <SelectItem value="blueberry">{rowsPerPage + 2}</SelectItem>
                        <SelectItem value="grapes">{rowsPerPage + 4}</SelectItem>
                        <SelectItem value="pineapple">{rowsPerPage + 8}</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <p className='pr-4'>Page {currentPage} of {totalPages}</p>
                <PaginationItem  className='pr-2'>
                  <PaginationPrevious
                    className={
                      startIndex === 0 ? "pointer-events-none opacity-50" : undefined
                    }
                    onClick={() => {
                      setStartIndex(startIndex - rowsPerPage);
                      setEndIndex(endIndex - rowsPerPage);
                      setCurrentPage(currentPage - 1);
                    }} />
                </PaginationItem>
                
                <PaginationItem>
                  <PaginationNext
                    className={
                      endIndex >= totalDataitems ? "pointer-events-none opacity-50" : undefined
                    }
                    onClick={() => {
                      setStartIndex(startIndex + rowsPerPage); //10
                      setEndIndex(endIndex + rowsPerPage); //10 + 10 = 20
                      setCurrentPage(currentPage + 1);
                    }} />
                </PaginationItem>
              </div>
            </PaginationContent>
          </Pagination>
        </div>
      </CardContent>
    </Card>
  );
}

export default InventorySnapshot;