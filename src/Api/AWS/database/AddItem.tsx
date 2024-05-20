import { z } from "zod"

type ItemFormValues = z.infer<typeof itemFormSchema>

const itemFormSchema = z.object({
    make: z.string().max(160).min(4),
    model: z.string(),
    year: z.string(),
    image: z.string(),
    color: z.string(),
    vin: z.string(),
    location: z.string(),
    insurance_company: z.string(),
    policy_number: z.string(),
    value: z.string(),
})

export const AddItemApiCall = async (passedData: ItemFormValues) => {
    const axios = require('axios');
    let data = JSON.stringify(passedData, null, 0)

    let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://ajdg3owxqe.execute-api.us-west-2.amazonaws.com/test/AddItemToInventory',
    headers: { 
        'x-api-key': process.env.NEXT_PUBLIC_AWS_API_KEY, 
        'Content-Type': 'application/json'
    },
    data : data
    };

    return new Promise(async (resolve, reject) => {
        await axios.request(config)
        .then((response: { data: any }) => {
            resolve(response.data);
        })
        .catch((error: any) => {
            console.log(error);
            reject('test');
        });
    });
}