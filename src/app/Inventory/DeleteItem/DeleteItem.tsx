import { DeleteItemApiCall } from "@/Api/AWS/database/DeleteItem";
import { getCookie } from "@/Security/GetCookie";

interface ApiResponse {
  statusCode: number;
  body: string;
}

export async function DeleteItem(vin: string) {
  
  console.log("delete item: " + vin)

  return getCookie("accessToken")
    .then(async response => {
      if (response == undefined) {
        throw Error;
      }
      const test = await DeleteItemApiCall({ accessToken: response, VIN: vin || ""}) as ApiResponse;
      console.log(test.body)
      return(test)
    })
    .catch(error => {
      console.error(error);
    });
}