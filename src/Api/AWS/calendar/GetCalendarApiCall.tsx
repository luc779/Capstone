import { z } from "zod"

type ProfileFormValues = z.infer<typeof profileFormSchema>

const profileFormSchema = z.object({
    accessToken: z.string(),
    item_type: z.string(),
})

export const GetCalendarApiCall = async (passedData: ProfileFormValues) => {
    const axios = require('axios');
    let data = JSON.stringify(passedData, null, 0)

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://ajdg3owxqe.execute-api.us-west-2.amazonaws.com/test/Calendars/GetCalendar',
        headers: { 
        'x-api-key': process.env.NEXT_PUBLIC_AWS_API_KEY, 
        'Content-Type': 'application/json'
        },
        data : data
    };

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