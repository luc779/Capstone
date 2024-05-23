import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

// gets API call
import { WeatherApiCall } from '@/Api/Misc/WeatherApiCall';
import { ScrollArea } from '@/components/ui/scroll-area';

// uses a card component to display the recieved upcoming 7 day forcast from weatherAPI
function Weather() {
  return (
      <Card className="h-full overflow-hidden">
        <CardHeader>
          <CardTitle>Weather</CardTitle>
          <CardDescription>Next 14 day weather.</CardDescription>
        </CardHeader>
        <CardContent className="h-full">
          <ScrollArea className="h-full w-full overflow-y-auto pb-20 pr-2o">
            <WeatherApiCall></WeatherApiCall>
          </ScrollArea>
        </CardContent>
      </Card>
  );
}

export default Weather;