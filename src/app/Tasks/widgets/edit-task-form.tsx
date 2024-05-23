"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import { Icons } from "../../../components/icons"
import React from "react"
import { useRouter } from "next/navigation"
import { CalendarInterface } from "@/components/CalendarPages/Interface/CalendarInterfaces"
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format } from "date-fns"
import { Textarea } from "@/components/ui/textarea"

const calendarFormSchema = z.object({
    location: z.string().optional(),
    end_date: z.string().optional(),
    start_date: z.string().optional(),
    priority: z.string().optional(),
    museum_name: z.string().optional(),
    description: z.string().optional(),
    ID: z.string().optional(),
    item_type: z.string().optional(),
    title: z.string().optional(),
})

export function EditTaskForm(task: CalendarInterface) {

    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const router = useRouter();

    const form = useForm<CalendarInterface>({
        resolver: zodResolver(calendarFormSchema),
        defaultValues: { 
            location: task.location,
            end_date: format(task.end_date, "PPP HH:mm:ss"),
            start_date: format(task.start_date, "PPP HH:mm:ss"),
            priority: task.priority,
            museum_name: task.museum_name,
            description: task.description,
            ID: task.ID,
            item_type: task.item_type,
            title: task.title,
        }
    })

    async function onSubmit(data: CalendarInterface) {
        
        setIsLoading(true)

        toast({
            title: "Need to confirm Email:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        });

        setIsLoading(false)
    }
  
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
          form.handleSubmit(onSubmit)();
        }
    };

    return (
        <div className={cn("grid gap-6")} >
            <Form {...form}>
                <form  className="space-y-8">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                        <FormControl>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="title" className="text-right">
                                    Title
                                </Label>
                                <Input
                                    id="title"
                                    defaultValue={task.title}
                                    className="col-span-3" 
                                    {...field}
                                />
                            </div>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="priority"
                    render={({ field }) => (
                        <FormItem>
                        <FormControl>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="priority" className="text-right">
                                    Priority
                                </Label>
                                <Select onValueChange={field.onChange} >
                                    <FormControl>
                                    <SelectTrigger className="w-[276px]">
                                        <SelectValue defaultValue={task.priority} placeholder={task.priority} />
                                    </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="High">High</SelectItem>
                                        <SelectItem value="Medium">Medium</SelectItem>
                                        <SelectItem value="Low">Low</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                        <FormControl>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="location" className="text-right">
                                    Location
                                </Label>
                                <Input
                                    id="location"
                                    defaultValue={task.location}
                                    className="col-span-3" 
                                    {...field}
                                />
                            </div>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="start_date"
                    render={({ field }) => (
                        <FormItem>
                        <FormControl>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="start_date" className="text-right">
                                    Start Date
                                </Label>
                                <Input
                                    id="start_date"
                                    defaultValue={format(task.start_date, "PPP HH:mm:ss")}
                                    className="col-span-3" 
                                    {...field}
                                />
                            </div>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="end_date"
                    render={({ field }) => (
                        <FormItem>
                        <FormControl>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="end_date" className="text-right">
                                    End Date
                                </Label>
                                <Input
                                    id="end_date"
                                    placeholder={"test"}
                                    defaultValue={format(task.end_date, "PPP HH:mm:ss")}
                                    className="col-span-3" 
                                    {...field}
                                />
                            </div>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                        <FormControl>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="description" className="text-right">
                                    Description
                                </Label>
                                <Textarea
                                    id="description"
                                    defaultValue={task.description}
                                    className="col-span-3" 
                                    {...field}
                                />
                            </div>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
            
            <Button disabled={isLoading}
                onClick={() => {
                    // Manually trigger form submission
                    form.handleSubmit(onSubmit)();
                }}
                >
                {isLoading && (    
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Confirm Edit
            </Button> 
        </Form>
      </div>
    )
  }

