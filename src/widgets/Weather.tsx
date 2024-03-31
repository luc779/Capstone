import React from 'react';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { WeatherApiCall } from '@/apiCalls/WeatherApiCall';

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