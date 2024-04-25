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

// uses a card component to display the recieved upcoming 7 day forcast from weatherAPI
function Weather() {
  return (
      <Card className="h-full overflow-auto">
        <CardHeader>
          <CardTitle>Weather</CardTitle>
          <CardDescription>Next 7 day weather.</CardDescription>
        </CardHeader>
        <CardContent>
          <WeatherApiCall></WeatherApiCall>
        </CardContent>
      </Card>
  );
}

export default Weather;