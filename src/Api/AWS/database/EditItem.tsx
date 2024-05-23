import { z } from "zod"

type ItemFormValues = z.infer<typeof profileFormSchema>

const profileFormSchema = z.object({
    museum_name: z.string().default("TestMuseum"),
    make: z.string().max(160).min(4).optional(),
    model: z.string().optional(),
    car_year: z.string().optional(),
    image_base64: z.any().optional(),
    color: z.string().optional(),
    VIN: z.string().optional(),
    original_VIN: z.string().optional(),
    location: z.string().optional(),
    insurance_company: z.string().optional(),
    policy_number: z.string().optional(),
    car_value: z.string().optional(),
})

export const EditItemApiCall = async (passedData: Partial<ItemFormValues>) => {
    const axios = require('axios');
    let data = JSON.stringify(passedData, null, 0)
    // console.log("Passed Data: " + data)

    let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://ajdg3owxqe.execute-api.us-west-2.amazonaws.com/test/EditInventoryItem',
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