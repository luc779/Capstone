import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from '@/components/ui/scroll-area';
import { ApiResponse, CalendarInterface } from '@/components/CalendarPages/Interface/CalendarInterfaces';
import { getCookie } from '@/Security/GetCookie';
import { ErrorToast } from '@/components/ErrorToast';
import { GetCalendarApiCall } from '@/Api/AWS/calendar/GetCalendarApiCall';
import SimpleEventAndTaskCard from './SimpleEventAndTaskCard';
import { SearchX } from 'lucide-react';

function CalendarSnapshot() {
    const [events, setEvents] = useState<CalendarInterface[]>([]);
    const [tasks, setTasks] = useState<CalendarInterface[]>([]);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response_accessToken = await getCookie("accessToken");
    
            if (!response_accessToken) {
                ErrorToast("Account not signed in.");
                throw new Error("Access token is missing");
            }

            const eventDataPromise = GetCalendarApiCall({ accessToken: response_accessToken, item_type: "EVENT" }) as Promise<ApiResponse>;
            const taskDataPromise = GetCalendarApiCall({ accessToken: response_accessToken, item_type: "TASK" }) as Promise<ApiResponse>;

            const eventData = await eventDataPromise;
            const taskData = await taskDataPromise;

            const today = new Date();
            const todayYear = today.getFullYear();
            const todayMonth = today.getMonth();
            const todayDay = today.getDate();

            const sortedEvents = eventData.body
                .sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime())
                .filter(event => {
                    const eventDate = new Date(event.start_date); // Convert event start date to Date object
                    const eventYear = eventDate.getFullYear();
                    const eventMonth = eventDate.getMonth();
                    const eventDay = eventDate.getDate();
                    // console.log(eventDate)
                    return (eventYear > todayYear) || 
                        (eventYear === todayYear && eventMonth > todayMonth) || 
                        (eventYear === todayYear && eventMonth === todayMonth && eventDay >= todayDay);
                });
            
            console.log("Size of taskData.body: " + taskData.body.length)
            const sortedTasks = taskData.body
                .sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime())
                .filter(event => {
                    const eventDate = new Date(event.start_date); // Convert event start date to Date object
                    const eventYear = eventDate.getFullYear();
                    const eventMonth = eventDate.getMonth();
                    const eventDay = eventDate.getDate();
                    // console.log(eventDate)
                    return (eventYear > todayYear) || 
                        (eventYear === todayYear && eventMonth > todayMonth) || 
                        (eventYear === todayYear && eventMonth === todayMonth && eventDay >= todayDay);
                });
            
            setEvents(sortedEvents);
            setTasks(sortedTasks);
            console.log("Sorted Events " +  JSON.stringify(sortedEvents));
            console.log("Sorted Tasks " + JSON.stringify(sortedTasks));
        } catch (error) {
            console.error("Error fetching calendar snapshot item:", error);
        }
        };

        fetchData();
    }, []);
    
  return (
    <Card className="h-full">
        <div className="h-1/2">
            <CardHeader>
            <CardTitle>Events Calendars</CardTitle>
            <CardDescription>List of upcoming events.</CardDescription>
            </CardHeader>
            <ScrollArea className="flex flex-col overlflow-y-auto h-full w-full pb-20 pr-2">
                <CardContent className="inline-block">
                    <div className=" space-y-4"> 
                        {events.length === 0 ? (
                            <p>No Upcoming Events</p>
                        ) : (
                            events.map((items, index) => (
                                <SimpleEventAndTaskCard key={items.ID} event={items} index={index}/>
                            ))
                        )}
                    </div>
                </CardContent>
            </ScrollArea>
            </div>
            <div className="h-1/2">
            <CardHeader>
                <CardTitle>Tasks Calendars</CardTitle>
                <CardDescription>List of upcoming tasks.</CardDescription>
            </CardHeader>
            <ScrollArea className="flex flex-col overlflow-y-auto h-full w-full pb-20 pr-2">
                <CardContent className="inline-block w-full h-full">
                    <div className="space-y-4"> 
                        {tasks.length === 0 ? (
                            <div className='flex'>
                                <SearchX className='text-primary' size={30} />
                                <p className='ml-2'>No Results</p>
                            </div>
                        ) : (
                            tasks.map((items, index) => (
                                <SimpleEventAndTaskCard key={items.ID} event={items} index={index}/>
                            ))
                        )}
                    </div>
                </CardContent>
            </ScrollArea>
        </div>
    </Card>
  );
}

export default CalendarSnapshot;