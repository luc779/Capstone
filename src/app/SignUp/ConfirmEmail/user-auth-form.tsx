"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"
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
import { toast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import { Icons } from "../icons"
import React, { useState } from "react"
import { ConfirmEmailApiCall } from "@/apiCalls/authentication/ConfirmEmail"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const profileFormSchema = z.object({
    username: z.string().max(160).min(4),
    confirmation_code: z.string()
})
  
type ProfileFormValues = z.infer<typeof profileFormSchema>
  
export function UserAuthForm({ className, ...props }: UserAuthFormProps) {

    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    const form = useForm<ProfileFormValues>({
      resolver: zodResolver(profileFormSchema)
    })
  
    async function onSubmit(data: ProfileFormValues) {
      setIsLoading(true)
      try {
          console.log(data)
          {/* @ts-ignore */}
          const response = await ConfirmEmailApiCall(data) as { statusCode: number, body: string };
          console.log("Response from call: " + response);
          console.log("Response from call: " + response.statusCode);

          if (response.statusCode === 200) {
            window.location.href = "/LogIn";
          }

          // 401 = not found, 404 = need new code
          if (response.statusCode === 401 || response.statusCode === 404) {
              toast({
                  title: "Error:",
                  description: (
                      <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                      <code className="text-white">{JSON.stringify(response.body, null, 2)}</code>
                      </pre>
                  ),
              });
          }

          if (response.statusCode === 500) {
            toast({
                title: "Internal Server Error:",
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(response.body, null, 2)}</code>
                    </pre>
                ),
            });
          }
          
      } catch (error) {
          console.error(error);
      }
      setIsLoading(false)
    }
  
    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <Form {...form}>
                <form  className="space-y-8">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                        <FormControl>
                            <Input placeholder="Username" type="text" autoCapitalize="none" autoCorrect="off" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="confirmation_code"
                    render={({ field }) => (
                        <FormItem>
                        <FormControl>
                            <Input placeholder="Confirmation Code" type="text" autoCapitalize="none" autoCorrect="off" {...field} />
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
                Confirm
            </Button> 
        </Form>
      </div>
    )
  }

