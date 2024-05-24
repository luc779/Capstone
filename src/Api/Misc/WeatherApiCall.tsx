'use client'

import React, { useEffect, useState } from 'react';
import Image from "next/image"

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

const callAPI = async () => {
  try {
    const city = "Seattle";
    const key = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
    const day = "14";
    const res = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${city}&days=${day}&aqi=no&tides=no&hour=12`
    );
    const data = await res.json();
    // console.log(JSON.stringify(data))
    return data;
  } catch (err) {
    return null;
  }
}

function WeatherApiCall() {

  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await callAPI();
      setWeatherData(data); 
    };
    fetchData();
  }, []);

  return (
    <div>
      {weatherData && weatherData.forecast && (
        <div>
          {weatherData.forecast.forecastday.map((day: ForecastDay) => ( 
            <div className="inline-block text-center pb-2" key={day.date}>
                <p>{formatDate(day.date)}</p>
                <Image src={'https:' + day.day.condition.icon} alt="Weather Icon" width={64} height={64} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export { WeatherApiCall }