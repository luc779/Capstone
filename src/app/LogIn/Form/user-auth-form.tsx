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
  FormDescription,
  FormLabel,
} from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import { Icons } from "../../../components/icons"
import React from "react"
import { LogInApiCall } from "@/Api/AWS/authentication/LogInApiCall"
import { setCookie } from "../../../Security/SetCookie"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const profileFormSchema = z.object({
    username: z.string().min(1, "Username can't be empty"),
    password: z.string().min(1, "Password can't be empty"),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>
  
export function UserAuthForm({ className, ...props }: UserAuthFormProps) {

    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const router = useRouter();

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: { // Initialize default values for form fields
            username: '',
            password: ''
        }
    })

    async function onSubmit(data: ProfileFormValues) {
        
        setIsLoading(true)
        try {
            const response = await LogInApiCall(data) as { statusCode: number, body: string, accessToken: string, idToken: string  };

        if (response.statusCode === 200) {
            setCookie('accessToken', response.accessToken);
            router.push('/Dashboard');
        }
        
        // to-DO with resend confitmation code if needed
        if (response.statusCode === 403) {
            toast({
                title: "Need to confirm Email:",
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(response, null, 2)}</code>
                    </pre>
                ),
            });
        }

        if (response.statusCode === 404 || response.statusCode === 401) {
            toast({
                title: "Error:",
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(response, null, 2)}</code>
                    </pre>
                ),
            });
        }

        if (response.statusCode === 500) {
          toast({
              title: "Internal Server Error:",
              description: (
                  <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                  <code className="text-white">{JSON.stringify(response, null, 2)}</code>
                  </pre>
              ),
          });
      }
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false)
    }
  
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
          form.handleSubmit(onSubmit)();
        }
    };

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <Form {...form}>
                <form  className="space-y-8">
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
                                <Input placeholder="Password" type="password" autoCapitalize="none" autoCorrect="off" {...field} onKeyPress={handleKeyPress} />
                            </FormControl>
                            <FormMessage />
                            <FormDescription>
                                <Link 
                                    href="/ResetPassword"
                                    className="pl-2 underline underline-offset-4 hover:text-primary"
                                    >
                                    Forgot Password
                                </Link>
                            </FormDescription>
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

