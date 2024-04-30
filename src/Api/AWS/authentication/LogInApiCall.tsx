import { z } from "zod"

type ProfileFormValues = z.infer<typeof profileFormSchema>

const profileFormSchema = z.object({
    username: z.string(),
    password: z.string()
})

export const LogInApiCall = async (passedData: ProfileFormValues) => {
    const axios = require('axios');
    let data = JSON.stringify(passedData, null, 0)

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://ajdg3owxqe.execute-api.us-west-2.amazonaws.com/test/SignIn',
        headers: { 
        'x-api-key': process.env.NEXT_PUBLIC_AWS_API_KEY, 
        'Content-Type': 'application/json'
        },
        data : data
    };
    console.log(process.env.NEXT_PUBLIC_AWS_API_KEY)
    console.log(NEXT_PUBLIC_AWS_API_KEY)
    console.log(config);

    return new Promise(async (resolve, reject) => {
        await axios.request(config)
        .then((response: { data: any }) => {
            console.log(JSON.stringify(response.data));
            resolve(response.data);
        })
        .catch((error: any) => {
            console.log(error);
            reject('test');
        });
    });
}