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
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import React, { useEffect, useState } from "react"
import { Icons } from "@/components/icons"
import { AddItemApiCall } from "@/Api/AWS/database/AddItem"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const profileFormSchema = z.object({
    museum_name: z.string().default("TestMuseum"), // to change
    make: z.string().max(160).min(4),
    model: z.string(),
    car_year: z.string()
        .regex(/^\d{4}$/, { message: 'Year must be a four-digit number.' }),
    image: z
        .any()
        .refine((file) => file?.length == 1, 'File is required.')
        .refine((file) => {
            if (!file) return true; // If file is not provided, let other validations handle it
            const acceptedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']; // accepted file types
            return acceptedTypes.includes(file[0]?.type);
      }, 'Only image files are allowed.'),
    color: z.string(),
    vin: z.string(),
    location: z.string(),
    insurance_company: z.string(),
    policy_number: z.string(),
    value: z.string(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

export function InventoryAddForm({ className, ...props }: UserAuthFormProps) {

    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    const form = useForm<ProfileFormValues>({
      resolver: zodResolver(profileFormSchema)
    })

    async function onSubmit(data: ProfileFormValues) {
        setIsLoading(true)
        const file = data.image[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        var image_base64 = ''
        reader.onload = async function () {
            if (reader.result != null) {
                image_base64 = reader.result.toString().split(",")[1]; // base 64 of the inputted image
                data.image = image_base64;
                try {
                    {/* @ts-ignore */}
                    const response = await AddItemApiCall(data) as { statusCode: number, body: string };
                    form.reset();
                        toast({
                            title: "Success:",
                            description: (
                                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                                <code className="text-white">{JSON.stringify(response, null, 2)}</code>
                                </pre>
                            ),
                        });
                } catch (error) {
                    console.error(error);
                }

            } else {
                toast({
                    title: "Image Error:",
                    description: (
                        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                        <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                        </pre>
                    ),
                });
            }
            setIsLoading(false) 
        }; 
    } 
  
    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <Form {...form}>
                <form  className="grid grid-cols-2 gap-6">
                <FormField
                    control={form.control}
                    name="make"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Make</FormLabel>
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
                            <FormLabel>Model</FormLabel>
                        <FormControl>
                            <Input placeholder="Model" type="text" autoCapitalize="none" autoCorrect="off" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="car_year"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Year</FormLabel>
                        <FormControl>
                            <Input placeholder="Year" type="number" {...field} />
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
                            <FormLabel>Color</FormLabel>
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
                            <FormLabel>VIN</FormLabel>
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
                            <FormLabel>Picture of Car</FormLabel>
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
                            <FormLabel>Location in Museum</FormLabel>
                        <FormControl>
                            <Input placeholder="Location in Museum" type="text" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="insurance_company"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Insurance Company</FormLabel>
                        <FormControl>
                            <Input placeholder="Insurance Information" type="text" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="policy_number"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Policy Number</FormLabel>
                        <FormControl>
                            <Input placeholder="Policy Number" type="text" {...field} />
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
                            <FormLabel>Estimated Car Value</FormLabel>
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
                Add Item
            </Button> 
        </Form>
      </div>
    )
  }
