import { getCookie } from "@/Security/GetCookie";
import { z } from "zod"

type ProfileFormValues = z.infer<typeof profileFormSchema>

const profileFormSchema = z.object({
    title: z.string(),
    start_date: z.date(),
    end_date: z.date(),
    priority: z.string(),
    location: z.string(),
    item_type: z.string(),
    description: z.string(),
})

export const AddToCalendarApiCall = async (passedData: ProfileFormValues) => {
    const axios = require('axios');
    // add accessToken to form
    const accessToken = await getCookie("accessToken");
    const newForm = {...passedData, accessToken};
    console.log(newForm);
    let data = JSON.stringify(newForm, null, 0)
    
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://ajdg3owxqe.execute-api.us-west-2.amazonaws.com/test/Calendars/AddToCalendar',
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