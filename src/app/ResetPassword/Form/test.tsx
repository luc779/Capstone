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
  FormLabel,
  FormDescription,
} from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import { Icons } from "../../../components/icons"
import React from "react"
import { LogInApiCall } from "@/Api/AWS/authentication/LogInApiCall"
import { setCookie } from "../../../Security/SetCookie"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"

interface ResetPasswordFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const resetPasswordForm = z.object({
    username: z.string().optional(),
    confirmation_code: z.string().min(6, {
        message: "Your one-time password must be 6 characters.",
    }),
    password: z.string()
        .min(8, 'Password must be at least 8 characters long.')
        .regex(/[0-9]/, 'Password must contain at least 1 number.')
        .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least 1 special character.')
        .regex(/[A-Z]/, 'Password must contain at least 1 uppercase letter.')
        .regex(/[a-z]/, 'Password must contain at least 1 lowercase letter.'),
})

type ResetPasswordValues = z.infer<typeof resetPasswordForm>
  
export function TestFormExample({ className, inputtedUsername, ...props }: ResetPasswordFormProps & { inputtedUsername: string}) {

    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const router = useRouter();

    const ResetPasswordForm = useForm<ResetPasswordValues>({
        resolver: zodResolver(resetPasswordForm),
        defaultValues: { // Initialize default values for form fields
            username: inputtedUsername,
            confirmation_code: '',
            password: '',
        }
    })

    async function resetOnSubmit(data: ResetPasswordValues) {
        data.username = inputtedUsername
        setIsLoading(true)
        
        toast({
            title: "Test:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        });
        setIsLoading(false)
    }

    return (
        <div className={cn("grid gap-6", className)} {...props}>
        <Form {...ResetPasswordForm}>
            <form  className="space-y-8">
                <FormField
                    control={ResetPasswordForm.control}
                    name="confirmation_code"
                    
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>One-Time Password</FormLabel>
                        <FormControl>
                            <InputOTP className="w-full" maxLength={6} {...field}>
                            <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                            </InputOTPGroup>
                            </InputOTP>
                        </FormControl>
                        <FormDescription>
                            Please enter the one-time password sent to your email.
                        </FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={ResetPasswordForm.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Password
                            </FormLabel>
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
                    ResetPasswordForm.handleSubmit(resetOnSubmit)();
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

