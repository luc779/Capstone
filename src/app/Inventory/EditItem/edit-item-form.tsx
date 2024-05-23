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
import { GetInventoryItemApiCall } from "@/Api/AWS/database/GetInventoryItem"
import { getCookie } from "@/Security/GetCookie"
import Image from "next/image"
import { EditItemApiCall } from "@/Api/AWS/database/EditItem"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const profileFormSchema = z.object({
    museum_name: z.string().default("TestMuseum"),
    make: z.string().max(160).min(4).optional(),
    model: z.string().optional(),
    car_year: z.string().optional(),
    image_base64: z
        .any()
        .refine((file) => {
            if (!file) return true; // If file is not provided, let other validations handle it
            const acceptedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']; // accepted file types
            return acceptedTypes.includes(file[0]?.type);
        }, 'Only image files are allowed.'),
    color: z.string().optional(),
    VIN: z.string().optional(),
    original_VIN: z.string().optional(),
    location: z.string().optional(),
    insurance_company: z.string().optional(),
    policy_number: z.string().optional(),
    car_value: z.string().optional(),
})

interface InventoryItem {
    model: string;
    location: string;
    image_base64: string;
    insurance_company: string;
    car_value: string;
    policy_number: string;
    car_year: string;
    museum_name: string;
    VIN: string;
    color: string;
    make: string;
    original_VIN: string;
}

interface ApiResponse {
    statusCode: number;
    body: InventoryItem;
    base64_image: string;
}

async function getInventoryItem() {

    const vin = await getCookie("EditItem")
      .then(async response => {
        return response;
      })
      .catch(error => {
        console.error(error);
      });
  
    return getCookie("accessToken")
      .then(async response => {
        if (response == undefined) {
          throw Error;
        }
        const test = await GetInventoryItemApiCall({ accessToken: response, VIN: vin || ""}) as ApiResponse;
        console.log(test.body)
        return(test)
      })
      .catch(error => {
        console.error(error);
      });
}

type ProfileFormValues = z.infer<typeof profileFormSchema>

export function ItemEditForm({ className, ...props }: UserAuthFormProps) {

    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [carData, setCarData] = useState<ApiResponse | null>(null)
    const [originalValues, setOriginalValues] = useState<InventoryItem | null>(null)

    useEffect(() => {
        async function fetchInventoryItem() {
          try {
            const data = await getInventoryItem() as ApiResponse;
            setCarData(data);
            setOriginalValues(data.body)
            form.reset({
                model: data.body.model,
                location: data.body.location,
                image_base64: "",
                insurance_company: data.body.insurance_company,
                car_value: data.body.car_value,
                policy_number: data.body.policy_number,
                car_year: data.body.car_year,
                museum_name: data.body.museum_name,
                VIN: data.body.VIN,
                color: data.body.color,
                make: data.body.make,
                original_VIN: data.body.VIN,
            });
          } catch (error) {
            console.error(error);
          }
        }
        fetchInventoryItem();
      }, []);

    const form = useForm<ProfileFormValues>({
      resolver: zodResolver(profileFormSchema)
    })

    const readFileAsBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (reader.result) {
                    resolve(reader.result.toString().split(",")[1]);
                } else {
                    reject(new Error("Failed to read file"));
                }
            };
            reader.readAsDataURL(file);
        });
    };

    async function onSubmit(data: ProfileFormValues) {
        setIsLoading(true)
        const changedData: Partial<InventoryItem> = {};

        // toast({
        //     title: "Changes:",
        //     description: (
        //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        //         <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        //     </pre>
        //     ),
        // });
        // setIsLoading(false)

        const promises = Object.entries(data).map(async ([key, value]) => {
            if (originalValues && originalValues[key as keyof InventoryItem] !== value) {
                if (key === "image_base64" && value !== "") {
                    const file = value[0];
                    const base64Image = await readFileAsBase64(file);
                    changedData.image_base64 = base64Image;
                } else if (key !== "image_base64") {
                    changedData[key as keyof InventoryItem] = value;
                }
            }
        });

        // await the getting of the base64 of an image
        await Promise.all(promises)

        if (Object.keys(changedData).length > 1) {
            changedData.museum_name = data.museum_name;
            const response = await EditItemApiCall(changedData) as { statusCode: number, body: string }
            console.log(response.body)
            toast({
                title: "Changes:",
                description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(response.body, null, 2)}</code>
                </pre>
                ),
            });
            setIsLoading(false)
        } else {
            toast({
                title: "No Changes",
                description: "No changes were made.",
            });
            setIsLoading(false)
        }
    } 
  
    return (
        <div className={cn("grid gap-8", className)} {...props}>
            <Form {...form}>
                <form  className="grid grid-cols-4 gap-6">
                    <div className="space-y-2">
                        <FormLabel className="font-medium">Original Image</FormLabel>
                        <Image
                            src={`data:image/png;base64, ${carData?.base64_image}`}
                            alt="Base64 Image"
                            width="360"
                            height="60"
                            style={{
                                aspectRatio: "500/300",
                                objectFit: "cover",
                            }}
                            className="rounded-lg"
                        /> 
                    </div>
                    <div className="space-y-6">
                        <FormField
                            control={form.control}
                            name="make"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Make</FormLabel>
                                <FormControl>
                                    <Input placeholder="Make" type="text" autoCapitalize="none" autoCorrect="off" defaultValue={carData?.body.make} {...field} />
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
                                    <Input placeholder="Model" type="text" autoCapitalize="none" autoCorrect="off" defaultValue={carData?.body.model} {...field} />
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
                                    <Input placeholder="Year" type="number" defaultValue={carData?.body.car_year} {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="space-y-6">
                        <FormField
                            control={form.control}
                            name="color"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Color</FormLabel>
                                <FormControl>
                                    <Input placeholder="Color" type="text" autoCapitalize="none" autoCorrect="off" defaultValue={carData?.body.color} {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="car_value"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Estimated Car Value</FormLabel>
                                <FormControl>
                                    <Input placeholder="Value" type="text" defaultValue={carData?.body.car_value} {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="image_base64"
                            render={({ field }) => {
                                return (
                                <FormItem>
                                    <FormLabel>New Image (leave blank to keep original)</FormLabel>
                                <FormControl>
                                    <Input type="file" placeholder="" onChange={(e) => field.onChange(e.target.files)} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                                );
                            }} 
                        />
                    </div>

                    <div className="space-y-6">
                        <FormField
                            control={form.control}
                            name="insurance_company"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Insurance Company</FormLabel>
                                <FormControl>
                                    <Input placeholder="Insurance Information" type="text" defaultValue={carData?.body.insurance_company} {...field} />
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
                                    <Input placeholder="Policy Number" type="text" defaultValue={carData?.body.policy_number} {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />     

                        <FormField
                            control={form.control}
                            name="location"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Location in Museum</FormLabel>
                                <FormControl>
                                    <Input placeholder="Location in Museum" type="text" defaultValue={carData?.body.location} {...field} />
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
                    Edit Item
                </Button> 
            </Form>
        </div>
    )
  }
