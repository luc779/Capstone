
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

export default async function DetailedViewCard() {
  
  const response = await getInventoryItem() as ApiResponse;

  return (
    <Card className="overflow-auto h-full pt-4 flex">
      <CardContent>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          {response.body.car_year} {response.body.make} {response.body.model}
        </h1>
        <br></br>
        <div className="border border-blue overflow-hidden" style={{  height: "325px", padding: "4px" }}>
          {CardVersion(response)}
        </div>
        <div className="flex pt-4 space-x-4">
          <Card className="w-[280px]">
            <CardHeader>
            Location in Museum:
            </CardHeader>
            <CardContent>
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight truncate">
              {response.body.location}
              </h4>
            </CardContent>
          </Card>
          <Card className="w-[280px]">
            <CardHeader>
            Insurance Company:
            </CardHeader>
            <CardContent>
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight truncate">
              {response.body.insurance_company}
              </h4>
            </CardContent>
          </Card>
          <Card className="w-[280px]">
            <CardHeader>
            Policy Number:
            </CardHeader>
            <CardContent>
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight truncate">
              {response.body.policy_number}
              </h4>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  )
}

export function CardVersion(response: ApiResponse) {
  return (
    <div className="flex">
      <div className="mr-4 flex-shrink-0">
        <Image
          src={`data:image/png;base64, ${response.base64_image}`}
          alt="Base64 Image"
          width={500} 
          height={400}
          className="rounded-lg"
        />
      </div>
      <div className="flex-grow">
        <div className="flex pb-4 space-x-4">
          <Card className="w-[280px]">
            <CardHeader>
            Color:
            </CardHeader>
            <CardContent>
              <div className="flex whitespace-no-wrap overflow-x-auto">
                <div
                  className="w-6 h-6 mr-2 flex items-center justify-center border border-white"
                  style={{ backgroundColor: response.body.color, borderRadius: '50%' }}
                >
                  ?
                </div>
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight whitespace-no-wrap overflow-x-auto">
                  {response.body.color}
                </h4>
              </div>
            </CardContent>
          </Card>
          
          <Card className="w-[150px]">
            <CardHeader>
              Car Value:
            </CardHeader>
            <CardContent>
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight whitespace-no-wrap">
                  {'$' + Number(response.body.car_value).toLocaleString()}
                </h4>
            </CardContent>
          </Card>
        </div>
        <Card className="w-[280px]">
          <CardHeader>
          VIN:
          </CardHeader>
          <CardContent>
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight truncate">
              {response.body.VIN}
            </h4>
          </CardContent>
        </Card>
      </div>
    </div>  
  )
}