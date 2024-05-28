'use client'

import React, { useEffect, useState } from 'react';
import Image from "next/image"
import { GetWeatherApiCall } from '../AWS/weather/GetWeather';

interface WeatherData {
  forecast: {
    forecastday: ForecastDay[];
  };
}

interface ForecastDay {
  date: string;
  day: {
    condition: {
      icon: string;
    };
  };
}

export interface ApiResponse {
  statusCode: number;
  body: ForecastDay[];
}

const formatDate = (dateString: string) => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const date = new Date(dateString + 'T00:00');
  const currentDate = new Date();

  // Check if the date is today
  if (date.toDateString() === currentDate.toDateString()) {
    return 'Today';
  }

  // Check if the date is within the current week
  const dayOfWeek = daysOfWeek[date.getDay()];
  const diffInDays = Math.floor((date.getTime() - currentDate.getTime()) / (1000 * 3600 * 24));
  if (diffInDays >= 0 && diffInDays < 7) {
    return dayOfWeek;
  }

  // If the date is in the future weeks, return in the format MM/DD
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${month}/${day}`;
};

function WeatherApiCall() {

  const [newWeatherData, setNewWeatherData] = useState<ForecastDay[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const locationTest = "Seattle"
      const dataTest = await GetWeatherApiCall({ location: locationTest }) as ApiResponse;
      console.log("WeatherData")
      console.log(dataTest)
      setNewWeatherData(dataTest.body)
    };
    fetchData();
  }, []);

  return (
    <div>
      {newWeatherData ? (
        <div>
          {newWeatherData.map((forecast: ForecastDay, index: number) => (
            <div className="inline-block text-center pb-2" key={index}>
              <p>{formatDate(forecast.date)}</p>
              <Image src={'https:' + forecast.day.condition.icon} alt="Weather Icon" width={64} height={64} />
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export { WeatherApiCall }