import { z } from "zod"

type ProfileFormValues = z.infer<typeof profileFormSchema>

const profileFormSchema = z.object({
    isAdmin: z.boolean(),
    email: z.string(),
    username: z.string(),
    full_name: z.string(),
    phone_number: z.string(),
    password: z.string(),
    museum_name: z.string(),
})

export const SignUpApiCall = async (passedData: ProfileFormValues) => {
    const axios = require('axios');
    let data = JSON.stringify(passedData, null, 0)

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://ajdg3owxqe.execute-api.us-west-2.amazonaws.com/test/SignUp',
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