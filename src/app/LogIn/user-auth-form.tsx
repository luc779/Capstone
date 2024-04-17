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
import { Icons } from "../SignUp/icons"
import React, { useEffect, useState } from "react"
import loginApiCall from "@/apiCalls/LogInApiCall"
import Axios from 'axios';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const profileFormSchema = z.object({
    username: z.string().max(160).min(4),
    password: z.string()
        // .min(8, 'Password must be at least 8 characters long.')
        // .regex(/[0-9]/, 'Password must contain at least 1 number.')
        // .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least 1 special character.')
        // .regex(/[A-Z]/, 'Password must contain at least 1 uppercase letter.')
        // .regex(/[a-z]/, 'Password must contain at least 1 lowercase letter.')
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

const callAPI = async (passedData: ProfileFormValues) => {
  const axios = require('axios');
  let data = JSON.stringify(passedData, null, 0)

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://ajdg3owxqe.execute-api.us-west-2.amazonaws.com/test/SignIn',
    headers: { 
      'x-api-key': '5CKGXHFWSX8pz21XwgJtC1V18Fi6k9Mnb73Yl3E3', 
      'Content-Type': 'application/json'
    },
    data : data
  };

  return new Promise(async (resolve, reject) => {
    await axios.request(config)
      .then((response: { data: any }) => {
        console.log(JSON.stringify(response.data));
        resolve(response.data);
      })
      .catch((error: any) => {
        console.log(error);
        reject('test');
      });
  });
}

  
export function UserAuthForm({ className, ...props }: UserAuthFormProps) {

    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    const form = useForm<ProfileFormValues>({
      resolver: zodResolver(profileFormSchema)
    })

    async function onSubmit(data: ProfileFormValues) {
      setIsLoading(true)
      try {
        const response = await callAPI(data);
        console.log("Response from call: " + response)
        const toastPromise = toast({
          title: "Submitted values:",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{JSON.stringify(response, null, 2)}</code>
            </pre>
          ),
        });
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
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                        <FormControl>
                            <Input placeholder="Password" type="password" autoCapitalize="none" autoCorrect="off" {...field} />
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
                Log In
            </Button> 
        </Form>
      </div>
    )
  }

