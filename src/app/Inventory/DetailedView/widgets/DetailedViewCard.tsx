'use client'

import { GetInventoryItemApiCall } from "@/Api/AWS/database/GetInventoryItem";
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { getCookie } from "@/Security/GetCookie";
import Image from 'next/image';
import { useEffect, useState } from "react";

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
  const vin = await getCookie("DetailedView");
  console.log("running with: " + vin)
  const response_accessToken = await getCookie("accessToken");
  const test = await GetInventoryItemApiCall({ accessToken: response_accessToken || "", VIN: vin || ""}) as ApiResponse;
  return test;
}

export default function DetailedViewCard() {
  const [response, setResponse] = useState<ApiResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const vin = await getCookie("DetailedView");
        const response_accessToken = await getCookie("accessToken");
  
        if (!vin || !response_accessToken) {
          throw new Error("Vin or access token is missing");
        }
  
        const data = await GetInventoryItemApiCall({ accessToken: response_accessToken, VIN: vin }) as ApiResponse;
        setResponse(data);
      } catch (error) {
        console.error("Error fetching inventory item:", error);
      }
    };
  
    fetchData();
  }, []);

  const renderColor = () => {
    return (
      <Card className="w-[280px]">
        <CardHeader>
        Color:
        </CardHeader>
        <CardContent>
          <div className="flex whitespace-no-wrap overflow-x-auto">
            <div
              className="w-6 h-6 mr-2 flex items-center justify-center border border-white"
              style={{ backgroundColor: response?.body.color, borderRadius: '50%' }}
            >
              ?
            </div>
            {response ? (
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight whitespace-no-wrap overflow-x-auto">
                {response.body.color}
              </h4>
            ) : (
              <div className="w-full h-10 bg-gray-200 animate-pulse rounded-lg"></div>
            )}
          </div>

        </CardContent>
      </Card>
    )
  }

  const renderLocation = () => {
    return (
      <Card className="w-[280px]">
        <CardHeader>
        Location in Museum:
        </CardHeader>
        <CardContent>
          {response ? (
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight truncate">
              {response.body.location}
            </h4>
          ) : (
            <div className="w-full h-10 bg-gray-200 animate-pulse rounded-lg"></div>
          )}
        </CardContent>
      </Card>
    )
  }

  const renderVin = () => {
    return (
      <Card className="w-[280px]">
        <CardHeader>
        VIN:
        </CardHeader>
        <CardContent>
          {response ? (
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight truncate">
              {response.body.VIN}
            </h4>
          ) : (
            <div className="w-full h-10 bg-gray-200 animate-pulse rounded-lg"></div>
          )}
        </CardContent>
      </Card>
    )
  }

  const renderInsuranceCompany = () => {
    return (
      <Card className="w-[280px]">
        <CardHeader>
        Insurance Company:
        </CardHeader>
        <CardContent>
          {response ? (
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight truncate">
              {response.body.insurance_company}
            </h4>
          ) : (
            <div className="w-full h-10 bg-gray-200 animate-pulse rounded-lg"></div>
          )}
        </CardContent>
      </Card>
    )
  }

  const renderPolicyNumber = () => {
    return (
      <Card className="w-[280px]">
        <CardHeader>
        Policy Number:
        </CardHeader>
        <CardContent>
          {response ? (
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight truncate">
              {response.body.policy_number}
            </h4>
          ) : (
            <div className="w-full h-10 bg-gray-200 animate-pulse rounded-lg"></div>
          )}
        </CardContent>
      </Card>
    )
  }

  const renderValue = () => {
    return (
      <Card className="w-[150px]">
        <CardHeader>
          Car Value:
        </CardHeader>
        <CardContent>
            {response ? (
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight whitespace-no-wrap">
                {'$' + Number(response.body.car_value).toLocaleString()}
              </h4>
            ) : (
              <div className="w-full h-10 bg-gray-200 animate-pulse rounded-lg"></div>
            )}
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="overflow-auto h-full pt-4 flex">
      <CardContent>
        {response ? (
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            {response.body.car_year} {response.body.make} {response.body.model}
          </h1>
        ) : (
          <div className="w-50 h-20 bg-gray-200 animate-pulse rounded-lg"></div>
        )}
        <br></br>
        <div className="overflow-hidden" style={{  height: "364px"}}>
          <div className="flex">
      <div className="mr-4 flex-shrink-0">
        {response?.base64_image ? (
          <Image
            src={`data:image/png;base64, ${response.base64_image}`}
            alt="Base64 Image"
            width="500"
            height="364"
            style={{
              aspectRatio: "500/364",
              objectFit: "cover",
            }}
            className="rounded-lg"
          />
        ) : (
          <div className="w-500 h-364 bg-gray-200 flex items-center justify-center rounded-lg">
            <div className="w-500 h-364 bg-gray-200 flex items-center justify-center rounded-lg">
            <svg
              className="text-gray-400 animate-pulse"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              width="500"
              height="364"
            >
              <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
            </div>
          </div>
        )}
      </div>
      <div className="flex-grow">
        <div className="flex pb-4 space-x-4">
          {renderColor()}
          {renderValue()}
        </div>
          {renderVin()}
      </div>
    </div>  
        </div>
        <div className="flex pt-4 space-x-4">
          {renderLocation()}
          {renderInsuranceCompany()}
          {renderPolicyNumber()}
        </div>
      </CardContent>
    </Card>
  )
}
