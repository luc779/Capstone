import { CalendarInterface } from "@/components/CalendarPages/Interface/CalendarInterfaces";

export const DeleteCalendarItem = async (passedData: CalendarInterface) => {
    const axios = require('axios');
    let data = JSON.stringify(passedData, null, 0)

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://ajdg3owxqe.execute-api.us-west-2.amazonaws.com/test/Calendars/DeleteFromCalendar',
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
            console.error(error);
            reject('test');
        });
    });
}