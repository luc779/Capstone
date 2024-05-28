import { DeleteItemApiCall } from "@/Api/AWS/database/DeleteItem";
import { getCookie } from "@/Security/GetCookie";

interface ApiResponse {
  statusCode: number;
  body: string;
}

export async function DeleteItem(vin: string) {

  return getCookie("accessToken")
    .then(async response => {
      if (response == undefined) {
        throw Error;
      }
      const test = await DeleteItemApiCall({ accessToken: response, VIN: vin || ""}) as ApiResponse;
      return(test)
    })
    .catch(error => {
      console.error(error);
    });
}