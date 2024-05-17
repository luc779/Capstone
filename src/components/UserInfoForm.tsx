"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import {  useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"

export const personInfoSchema = z.object({
    email: z.string(),
    family_name: z.string(),
    given_name: z.string(),
    'custom:user_type': z.string(),
    'custom:museum_name': z.string()
})

type UserProfile = z.infer<typeof personInfoSchema>

export function UserInfoForm({ userInfo }: { userInfo?: UserProfile }) {
  const form = useForm<UserProfile>({
    resolver: zodResolver(personInfoSchema),
  })

  async function onSubmit(data: UserProfile) {
    toast({
        title: "Error:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pl-2 pr-2">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder={userInfo?.email}
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="family_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Family Name</FormLabel>
              <FormControl>
                <Input
                  placeholder={userInfo?.family_name}
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="given_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input
                  placeholder={userInfo?.given_name}
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="custom:user_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User Type</FormLabel>
              <FormControl>
                <Input
                  placeholder={userInfo?.["custom:user_type"]}
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="custom:museum_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Museum Name</FormLabel>
              <FormControl>
                <Input
                  placeholder={userInfo?.["custom:museum_name"]}
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Edit</Button>
      </form>
    </Form>
  )
}