"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"
import { CalendarIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Popover, PopoverContent, PopoverTrigger } from "../../../components/ui/popover"
import { Calendar } from "../../../components/ui/calendar"
import { format } from "date-fns"
import { Input } from "@/components/ui/input"
import { TimePicker } from "@/components/TimePicker/time-picker"

const profileFormSchema = z.object({
  title: z.string(),
  dateTime: z.date(),
  description: z.string().max(160).min(4),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

export function AddToCalendarForm({ calendarType }: { calendarType: string }) {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema)
  })

  function onSubmit(data: ProfileFormValues) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input
                placeholder={calendarType + " Title"}
                className="resize-none"
                {...field}
              />
            </FormControl>
            <FormDescription>
              The title of the {calendarType}.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
        />
        <FormField
          control={form.control}
          name="dateTime"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-left">Start Date</FormLabel>
              <Popover>
                <FormControl>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-[280px] justify-start text-left bg-secondary font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? (
                        format(field.value, "PPP HH:mm:ss")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                </FormControl>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                  <div className="p-3 border-t border-border">
                    <TimePicker
                      setDate={field.onChange}
                      date={field.value}
                    />
                  </div>
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>About the {calendarType}</FormLabel>
            <FormControl>
              <Textarea
                placeholder={"Short description of " + calendarType}
                className="resize-none"
                {...field}
              />
            </FormControl>
            <FormDescription>
              The description of the {calendarType}.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
        />
        <Button type="submit">Upload {calendarType}</Button>
      </form>
    </Form>
  )
}