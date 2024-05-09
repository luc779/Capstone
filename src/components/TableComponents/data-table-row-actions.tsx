"use client"

import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Row } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Label } from "@/components/ui/label"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { taskSchema } from "../../Api/inventoryData/schema"
import { setCookie } from "@/Security/SetCookie"
import { Copy } from "lucide-react"
import { useState } from "react"
import { DeleteItem } from "@/app/Inventory/DeleteItem/DeleteItem"
import { Icons } from "@/components/icons"

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

const handleDetailedViewClick = async (task: string) => {
  await setCookie('DetailedView', task)
  window.location.href = "/Inventory/DetailedView";
};

const handleEditClick = async (task: string) => {
  await setCookie('EditItem', task)
  window.location.href = "/Inventory/EditItem";
};

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const task = taskSchema.parse(row.original)
  const [open, setOpen] = useState(false);
  const [deleteVIN, setDeleteVIN] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleDeleteClick = (task: string) => {
    setOpen(true);
    setDeleteVIN(task);
  };

  const handleDeleteConfirm = async () => {
    console.log("attempt")
    setIsLoading(true)
    const response = await DeleteItem(deleteVIN);
    setOpen(false);
    toast({
      title: "Response:",
      description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(response, null, 2)}</code>
          </pre>
      ),
    });
    setIsLoading(false)
    window.location.reload();
  };
  
  return (
    <>
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

    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogTitle>
          Are you sure you want to delete {deleteVIN}?
        </AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete the data from the server. 
        </AlertDialogDescription>
        <AlertDialogFooter>
            <Button onClick={() => setOpen(false)} variant="secondary">
              Cancel
            </Button>
            <Button disabled={isLoading} onClick={handleDeleteConfirm} variant="destructive">
                {isLoading && (    
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Delete
            </Button> 
          </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </>
  )
}
