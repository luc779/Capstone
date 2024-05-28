"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
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
import { Icons } from "../../../components/icons"
import React, { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { SignUpApiCall } from "@/Api/AWS/authentication/SignUpApiCall"
import { MailIcon } from "lucide-react"
import { PasswordInput } from "@/components/ui/password-input"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const profileFormSchema = z.object({
    isAdmin: z.boolean().default(false).optional(),
    email: z.string().email(),
    username: z.string().max(160).min(4, {
        message: "Username must be at least 4 characters long"
    }),
    first_name: z.string().max(160).min(2)
        .regex(/^[^0-9]+$/, 'Can only contain letters')
        .regex(/^[^\s]+$/, "Can't contain spaces"),
    last_name: z.string().max(160).min(2)
        .regex(/^[^0-9]+$/, 'Can only contain letters')
        .regex(/^[^\s]+$/, "Can't contain spaces"),
    password: z.string()
        .min(8, 'Password must be at least 8 characters long.')
        .regex(/[0-9]/, 'Password must contain at least 1 number.')
        .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least 1 special character.')
        .regex(/[A-Z]/, 'Password must contain at least 1 uppercase letter.')
        .regex(/[a-z]/, 'Password must contain at least 1 lowercase letter.'),
    museum_name: z.string().max(128).min(4)
        .regex(/^[^\s]+$/, "Can't contain spaces")
        .transform(value => value.replace(/\s+/g, '')),
})
  
type ProfileFormValues = z.infer<typeof profileFormSchema>
  
export function UserAuthForm({ className, ...props }: UserAuthFormProps) {

    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    const form = useForm<ProfileFormValues>({
      resolver: zodResolver(profileFormSchema),
      defaultValues: {
          isAdmin: false,
      }
    })
  
    async function onSubmit(data: ProfileFormValues) {
        setIsLoading(true)
        try {
            {/* @ts-ignore */}
            const response = await SignUpApiCall(data) as { statusCode: number, body: string };

            if (response.statusCode === 200) {
                toast({
                    title: "Successful Sign Up:",
                    description: "Check email to confirm account",
                });
                window.location.href = "/SignUp/ConfirmEmail";
            }

            if (response.statusCode === 400) {
                toast({
                    title: "Error:",
                    description: (
                        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                            <code className="text-white">{response.body.replace('"', '')}</code>
                        </pre>
                    ),
                });
            }

            if (response.statusCode === 500) {
                toast({
                    title: "Internal Server Error:",
                    description: (
                        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                            <code className="text-white">{response.body.replace('"', '')}</code>
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
                <form  className="space-y-6"> 
                <FormField
                    control={form.control}
                    name="isAdmin"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 border-input bg-secondary">
                        <FormControl>
                            {/* @ts-ignore */}
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} {...field}/>
                        </FormControl>
                        <div className="space-y-1 leading-none">
                            <FormLabel>
                                Admin Account
                            </FormLabel>
                            <FormDescription>
                                This will create a new museum with the inputted museum name
                            </FormDescription>
                        </div>
                        </FormItem>
                    )}
                />
                <div className="grid grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Username
                                </FormLabel>
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
                                <FormLabel>
                                    Password
                                </FormLabel>
                            <FormControl>
                                <PasswordInput placeholder="Password" type="password" autoCapitalize="none" autoCorrect="off" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="first_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    First Name
                                </FormLabel>
                            <FormControl>
                                <Input placeholder="John" type="text" autoCapitalize="none" autoCorrect="off" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="last_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Last Name
                                </FormLabel>
                            <FormControl>
                                <Input placeholder="Doe" type="text" autoCapitalize="none" autoCorrect="off" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Email
                                </FormLabel>
                            <FormControl>
                                <Input placeholder="name@exmaple.com" autoCapitalize="none" autoComplete="email" autoCorrect="off" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="museum_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Museum Name
                                </FormLabel>
                            <FormControl>
                                <Input placeholder="Museum Name" type="text" autoCapitalize="none" autoCorrect="off" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
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
                Sign Up
            </Button> 
        </Form>
      </div>
    )
  }

