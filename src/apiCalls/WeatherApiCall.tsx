'use client'

import React, { useEffect, useState } from 'react';

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
  const dayOfWeek = daysOfWeek[date.getDay()];
  return `${dayOfWeek}`;
};

const callAPI = async () => {
  try {
    const city = "Seattle";
    const day = "7";
    const res = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=427e509e4ec7471e95615748243103&q=${city}&days=${day}&aqi=no&tides=no&hour=12`
    );
    const data = await res.json();
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
            <div className="inline-block text-center" key={day.date}>
                <p>{formatDate(day.date)}</p>
                <img src={'https:' + day.day.condition.icon} alt="Weather Icon" />
            </div>
            ))}
        </div>
        )}
    </div>
  );
}

export { WeatherApiCall }