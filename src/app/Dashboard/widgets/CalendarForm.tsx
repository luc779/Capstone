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

const profileFormSchema = z.object({
  dateStart: z.date({
    required_error: "A date required.",
  }),
  dateEnd: z.date({
    required_error: "A date required.",
  }),
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
          name="dateStart"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Starting Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date()
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Starting date and time of {calendarType}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
      />
      <FormField
        control={form.control}
        name="dateEnd"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>End Date</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[240px] pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value ? (
                      format(field.value, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={(date) =>
                    date < new Date()
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <FormDescription>
              End date and time of {calendarType}
            </FormDescription>
            <FormMessage />
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