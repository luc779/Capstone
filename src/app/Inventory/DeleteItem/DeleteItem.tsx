
import { GetInventoryItemApiCall } from "@/Api/AWS/database/GetInventoryItem";
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { getCookie } from "@/Security/GetCookie";
import Image from 'next/image';

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

  const vin = await getCookie("DetailedView")
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
      // console.log(test.body)
      return(test)
    })
    .catch(error => {
      console.error(error);
    });
}

export default async function DeleteItem() {
  
  const response = await getInventoryItem() as ApiResponse;
}