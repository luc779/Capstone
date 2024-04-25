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
import { Icons } from "./icons"
import React, { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
  } from "@/components/ui/input-otp"
import { PhoneInput } from "@/components/ui/phone-input"
import { isValidPhoneNumber } from "react-phone-number-input"
import { SignUpApiCall } from "@/Api/AWS/authentication/SignUpApiCall"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const profileFormSchema = z.object({
    isAdmin: z.boolean().default(false).optional(),
    email: z.string().email(),
    username: z.string().max(160).min(4),
    full_name: z.string().max(160).min(4)
        .refine(value => {
            const names = value.split(' ');
            return names.length === 2 && names[1].trim() !== '';
        }, {
            message: 'First and last only, separated by a space.'
        }),
    phone_number: z.string()
        .refine(isValidPhoneNumber, { message: "Invalid phone number" })
        .or(z.literal("")),
    password: z.string()
        .min(8, 'Password must be at least 8 characters long.')
        .regex(/[0-9]/, 'Password must contain at least 1 number.')
        .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least 1 special character.')
        .regex(/[A-Z]/, 'Password must contain at least 1 uppercase letter.')
        .regex(/[a-z]/, 'Password must contain at least 1 lowercase letter.'),
    museum_name: z.string().max(160).min(4)
        .regex(/^\S*$/, 'Museum name cannot contain spaces'),
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
            console.log(data)
            {/* @ts-ignore */}
            const response = await SignUpApiCall(data) as { statusCode: number, body: string };
            console.log("Response from call: " + response);
            console.log("Response from call: " + response.statusCode);

            if (response.statusCode === 200) {
                window.location.href = "/SignUp/ConfirmEmail";
            }

            if (response.statusCode === 400) {
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
                <FormField
                    control={form.control}
                    name="full_name"
                    render={({ field }) => (
                        <FormItem>
                        <FormControl>
                            <Input placeholder="John Doe" type="text" autoCapitalize="none" autoCorrect="off" {...field} />
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
                        <FormControl>
                            <Input placeholder="name@exmaple.com" autoCapitalize="none" autoComplete="email" autoCorrect="off" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phone_number"
                    render={({ field }) => (
                        <FormItem>
                        <FormControl>
                            <PhoneInput placeholder="Enter phone number" {...field} />
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
                        <FormControl>
                            <Input placeholder="Museum Name" type="text" autoCapitalize="none" autoCorrect="off" {...field} />
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
                Sign Up
            </Button> 
        </Form>
      </div>
    )
  }

