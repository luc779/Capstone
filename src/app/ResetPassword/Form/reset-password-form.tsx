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
import { TestFormExample } from "./test"

interface ResetPasswordFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const initateResetPasswordForm = z.object({
    username: z.string().min(1, "Username can't be empty"),
})

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

type InitiateResetPasswordValues = z.infer<typeof initateResetPasswordForm>
  
export function ResetPasswordForm({ className, ...props }: ResetPasswordFormProps) {

    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [isInitiate, setIsInitate] = React.useState<boolean>(true)
    const [username, setUsername] = React.useState<string>("");
    const router = useRouter();

    const initiateResetPasswordForm = useForm<InitiateResetPasswordValues>({
        resolver: zodResolver(initateResetPasswordForm),
        defaultValues: { // Initialize default values for form fields
            username: '',
        }
    })

    const ResetPasswordForm = useForm<ResetPasswordValues>({
        resolver: zodResolver(resetPasswordForm),
        defaultValues: { // Initialize default values for form fields
            confirmation_code: '',
            password: '',
        }
    })

    async function initiateOnSubmit(data: InitiateResetPasswordValues) {
        
        setIsLoading(true)

        toast({
            title: "Test:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        });

        setUsername(data.username)
        setIsInitate(false);
        setIsLoading(false)
    }

    return (
        <div>
            {isInitiate ? (
                 <div className={cn("grid gap-6", className)} {...props}>
                <Form {...initiateResetPasswordForm}>
                    <form  className="space-y-8">
                        <FormField
                            control={initiateResetPasswordForm.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Username
                                    </FormLabel>
                                    <FormControl>
                                        <Input placeholder="Username" type="text" autoCapitalize="none" autoCorrect="off"  {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                    <Button disabled={isLoading}
                        onClick={() => {
                            // Manually trigger form submission
                            initiateResetPasswordForm.handleSubmit(initiateOnSubmit)();
                        }}
                        >
                        {isLoading && (    
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Log In
                    </Button> 
                </Form>
                </div>
            ) : (
                <TestFormExample inputtedUsername={username} />
            )}
      </div>
    )
  }

