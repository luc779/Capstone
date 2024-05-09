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
import { GetInventoryItemApiCall } from "@/Api/AWS/database/GetInventoryItem"
import { getCookie } from "@/Security/GetCookie"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const profileFormSchema = z.object({
    museum_name: z.string().default("TestMuseum"),
    make: z.string().max(160).min(4).optional(),
    model: z.string().optional(),
    car_year: z.string().optional(),
    image: z.any().optional(),
    color: z.string().optional(),
    VIN: z.string().optional(),
    location: z.string().optional(),
    insurance_company: z.string().optional(),
    policy_number: z.string().optional(),
    car_value: z.string().optional(),
})

interface InventoryItem {
    model: string;
    location: string;
    image_location: string;
    insurance_company: string;
    car_value: string;
    policy_number: string;
    car_year: string;
    museum_name: string;
    VIN: string;
    color: string;
    make: string;
}

interface ApiResponse {
    statusCode: number;
    body: InventoryItem;
    base64_image: string;
}

async function getInventoryItem() {

    const vin = await getCookie("EditItem")
      .then(async response => {
        console.log(response);
        return response;
      })
      .catch(error => {
        console.error(error);
      });
  
    console.log("running with: " + vin)
  
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
    const [carData, setCarData] = useState<ApiResponse | null>(null);


    useEffect(() => {
        async function fetchInventoryItem() {
          try {
            const data = await getInventoryItem() as ApiResponse;
            setCarData(data);
          } catch (error) {
            console.error(error);
          }
        }
        fetchInventoryItem();
      }, []);

    const form = useForm<ProfileFormValues>({
      resolver: zodResolver(profileFormSchema)
    })

    async function onSubmit(data: ProfileFormValues) {
        // setIsLoading(true)
        console.log(data);

        for (let key in data) {
            //@ts-ignore
            if (data[key] == undefined) {
                //@ts-ignore
                console.log(data[key] + " " + key);
                //@ts-ignore
                data[key] = carData.body[key];
            }
        }

        console.log(data);

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
                            <Input  type="text" autoCapitalize="none" autoCorrect="off" defaultValue={carData?.body.make} {...field} />
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
                    name="VIN"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>VIN</FormLabel>
                        <FormControl>
                            <Input placeholder="VIN" type="text" defaultValue={carData?.body.VIN} {...field} />
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
                            <Input type="file" placeholder="" defaultValue={carData?.base64_image} onChange={(e) => field.onChange(e.target.files)} />
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
                            <Input placeholder="Location in Museum" type="text" defaultValue={carData?.body.location} {...field} />
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
