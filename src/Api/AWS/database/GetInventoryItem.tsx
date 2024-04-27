import { z } from "zod"

type ItemFormValues = z.infer<typeof itemFormSchema>

const itemFormSchema = z.object({
    accessToken: z.string(),
    VIN: z.string(),
})
 
export const GetInventoryItemApiCall = async (passedData: ItemFormValues) => {
    const axios = require('axios');
    let data = JSON.stringify(passedData, null, 0)

    let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://ajdg3owxqe.execute-api.us-west-2.amazonaws.com/test/GetInventoryItem',
    headers: { 
        'x-api-key': process.env.NEXT_PUBLIC_AWS_API_KEY, 
        'Content-Type': 'application/json'
    },
    data : data
    };

    return new Promise(async (resolve, reject) => {
        await axios.request(config)
        .then((response: { data: any }) => {
            // console.log('here' , response.data);
            resolve(response.data);
        })
        .catch((error: any) => {
            console.log(error);
            reject('test');
        });
    });
}