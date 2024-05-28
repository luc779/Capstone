import { getCookie } from "@/Security/GetCookie";
import { z } from "zod";

const profileFormSchema = z.object({
    accessToken: z.string()
})

export const SignOutApiCall = async () => {
    const axios = require('axios');
    const accessToken = await getCookie("accessToken");
    const profileData = {
        accessToken: accessToken
    };
    let data = JSON.stringify(profileData, null, 0)

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://ajdg3owxqe.execute-api.us-west-2.amazonaws.com/test/SignOut',
        headers: { 
        'x-api-key': process.env.NEXT_PUBLIC_AWS_API_KEY, 
        'Content-Type': 'application/json'
        },
        data : accessToken
    };

    return new Promise(async (resolve, reject) => {
        await axios.request(config)
        .then((response: { data: any }) => {
            resolve(response.data);
        })
        .catch((error: any) => {
            console.error(error);
            reject('test');
        });
    });
}