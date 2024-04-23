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
} from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import React, { useEffect, useState } from "react"
import { LogInApiCall } from "@/apiCalls/authentication/LogInApiCall"
import { Icons } from "@/app/SignUp/icons"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const profileFormSchema = z.object({
    make: z.string().max(160).min(4),
    model: z.string(),
    year: z.string(),
    image: z
      .any()
      .refine((file) => file?.length == 1, 'File is required.')
      .refine((file) => {
        if (!file) return true; // If file is not provided, let other validations handle it
        const acceptedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']; // Add more image MIME types if needed
        return acceptedTypes.includes(file[0]?.type);
      }, 'Only image files are allowed.'),
    color: z.string(),
    vin: z.string(),
    location: z.string(),
    insurance: z.string(),
    value: z.string(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

export function InventoryAddForm({ className, ...props }: UserAuthFormProps) {

    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    // const fileRef = form.register('file', { required: true });

    const form = useForm<ProfileFormValues>({
      resolver: zodResolver(profileFormSchema)
    })

    async function onSubmit(data: ProfileFormValues) {
        console.log(data.image[0])
        toast({
            title: "Input:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        });
    }
  
    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <Form {...form}>
                <form  className="space-y-8">
                <FormField
                    control={form.control}
                    name="make"
                    render={({ field }) => (
                        <FormItem>
                        <FormControl>
                            <Input placeholder="Make" type="text" autoCapitalize="none" autoCorrect="off" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="model"
                    render={({ field }) => (
                        <FormItem>
                        <FormControl>
                            <Input placeholder="Model" type="text" autoCapitalize="none" autoCorrect="off" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                        <FormItem>
                        <FormControl>
                            <Input placeholder="Year" type="text" autoCapitalize="none" autoCorrect="off" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="color"
                    render={({ field }) => (
                        <FormItem>
                        <FormControl>
                            <Input placeholder="Color" type="text" autoCapitalize="none" autoCorrect="off" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="vin"
                    render={({ field }) => (
                        <FormItem>
                        <FormControl>
                            <Input placeholder="VIN" type="text" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />

                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => {
                            return (
                            <FormItem>
                            <FormControl>
                                <Input type="file" placeholder="" onChange={(e) => field.onChange(e.target.files)} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                            );
                        }} 
                    />

                    <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                        <FormControl>
                            <Input placeholder="Location in Museum" type="text" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />

                    <FormField
                    control={form.control}
                    name="insurance"
                    render={({ field }) => (
                        <FormItem>
                        <FormControl>
                            <Input placeholder="Insurance Information" type="text" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />

                    <FormField
                    control={form.control}
                    name="value"
                    render={({ field }) => (
                        <FormItem>
                        <FormControl>
                            <Input placeholder="Value" type="text" {...field} />
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




// "use client"

// import { zodResolver } from "@hookform/resolvers/zod"
// import { useFieldArray, useForm } from "react-hook-form"
// import { z } from "zod"
// import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form"
// import { toast } from "@/components/ui/use-toast"
// import { Input } from "@/components/ui/input"
// import React, { useState } from "react"
// import { Checkbox } from "@/components/ui/checkbox"
// import {
//     InputOTP,
//     InputOTPGroup,
//     InputOTPSeparator,
//     InputOTPSlot,
//   } from "@/components/ui/input-otp"
// import { PhoneInput } from "@/components/ui/phone-input"
// import { isValidPhoneNumber } from "react-phone-number-input"
// import { SignUpApiCall } from "@/apiCalls/authentication/SignUpApiCall"
// import { Icons } from "@/app/SignUp/icons"

// interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

// const profileFormSchema = z.object({
//     make: z.string(),
//     model: z.string(),
//     year: z.string(),
//     color: z.string(),
//     vin: z.string(),
//     // image: z.instanceof(FileList),
//     condition: z.string(),
//     location: z.string(),
//     insurance: z.string(),
//     value: z.string(),
// })
  
// type ProfileFormValues = z.infer<typeof profileFormSchema>
  
// export function InventoryAddForm({ className, ...props }: UserAuthFormProps) {

//     const [isLoading, setIsLoading] = React.useState<boolean>(false)

//     const form = useForm<ProfileFormValues>({
//       resolver: zodResolver(profileFormSchema),
//     })
  
//     async function onSubmit(data: ProfileFormValues) {
//         console.log(data)
//         toast({
//             title: "Entered:",
//             description: (
//                 <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
//                 <code className="text-white">{JSON.stringify(data, null, 2)}</code>
//                 </pre>
//             ),
//         });
//     }
  
//     return (
//         <div className={cn("grid gap-6", className)} {...props}>
//             <Form {...form}>
//                 <form  className="grid grid-cols-3 gap-6">
//                 <FormField
//                     control={form.control}
//                     name="make"
//                     render={({ field }) => (
//                         <FormItem>
//                         <FormControl>
//                             <Input placeholder="Make" type="text" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                         </FormItem>
//                     )}
//                     />

//                     <FormField
//                     control={form.control}
//                     name="model"
//                     render={({ field }) => (
//                         <FormItem>
//                         <FormControl>
//                             <Input placeholder="Model" type="text" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                         </FormItem>
//                     )}
//                     />

//                     <FormField
//                     control={form.control}
//                     name="year"
//                     render={({ field }) => (
//                         <FormItem>
//                         <FormControl>
//                             <Input placeholder="Year" type="text" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                         </FormItem>
//                     )}
//                     />

//                     <FormField
//                     control={form.control}
//                     name="color"
//                     render={({ field }) => (
//                         <FormItem>
//                         <FormControl>
//                             <Input placeholder="Color" type="text" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                         </FormItem>
//                     )}
//                     />

//                     <FormField
//                     control={form.control}
//                     name="vin"
//                     render={({ field }) => (
//                         <FormItem>
//                         <FormControl>
//                             <Input placeholder="VIN" type="text" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                         </FormItem>
//                     )}
//                     />

//                      {/* <FormField
//                         control={form.control}
//                         name="image"
//                         render={({ field }) => {
//                             return (
//                             <FormItem>
//                             <FormControl>
//                                 <Input type="file" placeholder="" onChange={(e) => field.onChange(e.target.files)} />
//                             </FormControl>
//                             <FormMessage />
//                             </FormItem>
//                             );
//                         }} 
//                     /> */}

//                     <FormField
//                     control={form.control}
//                     name="location"
//                     render={({ field }) => (
//                         <FormItem>
//                         <FormControl>
//                             <Input placeholder="Location in Museum" type="text" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                         </FormItem>
//                     )}
//                     />

//                     <FormField
//                     control={form.control}
//                     name="insurance"
//                     render={({ field }) => (
//                         <FormItem>
//                         <FormControl>
//                             <Input placeholder="Insurance Information" type="text" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                         </FormItem>
//                     )}
//                     />

//                     <FormField
//                     control={form.control}
//                     name="value"
//                     render={({ field }) => (
//                         <FormItem>
//                         <FormControl>
//                             <Input placeholder="Value" type="text" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                         </FormItem>
//                     )}
//                     />
//             </form>
//             <Button disabled={isLoading}
//                 onClick={() => {
//                     // Manually trigger form submission
//                     form.handleSubmit(onSubmit)();
//                 }}
//                 >
//                 {isLoading && (    
//                 <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
//                 )}
//                 Sign Up
//             </Button> 
//         </Form>
//       </div>
//     )
//   }

