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
import { useState } from "react"

export const personInfoSchema = z.object({
    email: z.string().email(),
    family_name: z.string().max(160).min(2)
      .regex(/^[^0-9]+$/, 'Can only contain letters')
      .regex(/^[^\s]+$/, "Cannot contain spaces"),
    given_name: z.string().max(160).min(2)
      .regex(/^[^0-9]+$/, 'Can only contain letters')
      .regex(/^[^\s]+$/, "Cannot contain spaces"),
    'custom:user_type': z.string(),
    'custom:museum_name': z.string()
})

const newPasswordSchema = z.object({
  password: z.string()
    .min(8, 'Password must be at least 8 characters long.')
    .regex(/[0-9]/, 'Password must contain at least 1 number.')
    .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least 1 special character.')
    .regex(/[A-Z]/, 'Password must contain at least 1 uppercase letter.')
    .regex(/[a-z]/, 'Password must contain at least 1 lowercase letter.'),
  confirmPassword: z.string()
    .min(8, 'Password must be at least 8 characters long.')
    .regex(/[0-9]/, 'Password must contain at least 1 number.')
    .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least 1 special character.')
    .regex(/[A-Z]/, 'Password must contain at least 1 uppercase letter.')
    .regex(/[a-z]/, 'Password must contain at least 1 lowercase letter.')
  }).superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match"
      });
    }
});

type NewUserPassword = z.infer<typeof newPasswordSchema>
type UserProfile = z.infer<typeof personInfoSchema>

export function UserInfoForm({ userInfo }: { userInfo?: UserProfile }) {
  const [showForm, setShowForm] = useState(false);
  const [showPasswordChangeForm, setShowPasswordChangeForm] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(false);

  const [originalFormValues] = useState<UserProfile>({
    email: userInfo?.email || '',
    family_name: userInfo?.family_name || '',
    given_name: userInfo?.given_name || '',
    'custom:user_type': userInfo?.['custom:user_type'] || '',
    'custom:museum_name': userInfo?.['custom:museum_name'] || '',
  });

  const userProfile = useForm<UserProfile>({
    resolver: zodResolver(personInfoSchema),
    defaultValues: originalFormValues,
  })

  const passwordForm = useForm<NewUserPassword>({
    resolver: zodResolver(newPasswordSchema),
  }) 

  const handleEditInfoClick = () => {
    setShowForm(!showForm);
    setShowPasswordChangeForm(false);
  };

  const handleChangePasswordClick = () => {
    setShowPasswordChangeForm(!showPasswordChangeForm);
    setShowForm(false);
  };

  async function onSubmitPassword(data: NewUserPassword) {
    toast({
        title: "New Password:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
    });
  }

  async function onSubmitInfo(data: UserProfile) {
    const changedData: Partial<UserProfile> = {};

    Object.entries(data).forEach(([key, value]) => {
        if (originalFormValues && originalFormValues[key as keyof UserProfile] !== value) {
            changedData[key as keyof UserProfile] = value;
        }
    });

    if (Object.keys(changedData).length > 0) {
        toast({
            title: "Changes:",
            description: (
              <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <code className="text-white">{JSON.stringify(changedData, null, 2)}</code>
              </pre>
            ),
        });
    } else {
        toast({
            title: "No Changes",
            description: "No changes were made.",
        });
    }
  }

  return (
    <div>
      <div className="flex justify-between pt-8">
        <Button variant='default' onClick={handleEditInfoClick}>Edit Info</Button>
        <Button variant='secondary' onClick={handleChangePasswordClick}>Change Password</Button> 
      </div>
      {showForm && (
        <Form {...userProfile}>
          <form onSubmit={userProfile.handleSubmit(onSubmitInfo)} className="space-y-4 pl-2 pr-2 pt-4 overflow-auto">
            <FormField
              control={userProfile.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      defaultValue={userInfo?.email}
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={userProfile.control}
              name="family_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Family Name</FormLabel>
                  <FormControl>
                    <Input
                      defaultValue={userInfo?.family_name}
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={userProfile.control}
              name="given_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      defaultValue={userInfo?.given_name}
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
      )}
      {showPasswordChangeForm && (
        <Form {...passwordForm}>
          <form onSubmit={passwordForm.handleSubmit(onSubmitPassword)} className="space-y-4 pl-2 pr-2 pt-4 overflow-auto">
            <FormField
              control={passwordForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={passwordForm.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      className="resize-none"
                      {...field}
                      onChange={(e) => {
                        const confirmPasswordValue = e.target.value;
                        const passwordValue = passwordForm.getValues().password
                        // Compare the passwords
                        if (confirmPasswordValue !== passwordValue) {
                          setPasswordsMatch(false);
                        } else {
                          setPasswordsMatch(true);
                        }
                        field.onChange(e);
                      }}
                    />
                  </FormControl>
                  {!passwordsMatch && (
                    <p className="text-sm font-medium text-destructive">Passwords don&apos;t match</p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Change Password</Button>
          </form>
        </Form>
      )}
    </div>
  )
}