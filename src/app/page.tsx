'use client'

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

import Weather from '@/widgets/Weather';
import SalesPreformance from "@/widgets/SalesPreformance";
import Employees from "@/widgets/Employees";
import InventorySnapshot from "@/widgets/InventorySnapshot";
import SideBar from "@/widgets/SideBar";
import { useEffect, useState } from "react";

// interface WeatherData {
//   forecast: {
//     forecastday: ForecastDay[];
//   };
// }

// interface ForecastDay {
//   date: string;
//   day: {
//     condition: {
//       text: string;
//       icon: string;
//     };
//   };
// }

// const callAPI = async () => {
//   try {
//     const res = await fetch(
//       `http://api.weatherapi.com/v1/forecast.json?key=427e509e4ec7471e95615748243103&q=Seattle&days=6&aqi=no&tides=no&hour=12`
//     );
//     const data = await res.json();
//     return data;
//   } catch (err) {
//     return null;
//   }
// }

export default function Home() {

  // const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await callAPI();
  //     setWeatherData(data); 
  //   };
  //   fetchData();
  // }, []);

  return (
    <main>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={10}>
          <div className="flex h-screen justify-center py-4 pl-4">
            <SideBar></SideBar>
          </div>
          </ResizablePanel>
        <ResizablePanel defaultSize={90}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={10}>
              <div className="flex h-full items-center justify-center p-6">
                <span className="font-semibold">Two</span>
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={90}>
              <ResizablePanelGroup direction="horizontal">
                 <ResizablePanel defaultSize={70}> 
                    <ResizablePanelGroup direction="vertical">
                      <ResizablePanel defaultSize={38}> 
                        <div className="flex h-full">
                          <div className="w-1/2 py-4 pl-4">
                            <SalesPreformance></SalesPreformance>
                          </div>
                          <div className="w-1/2 p-4" >
                            <Weather></Weather> 
                          </div>
                        </div>
                      </ResizablePanel>
                      <ResizablePanel defaultSize={62}>
                        <ResizablePanelGroup direction="vertical">
                          <ResizablePanel defaultSize={40} className="min-h-[100px]">
                            <div className="h-full w-full px-4 pb-4">
                              <Employees></Employees>
                            </div>
                          </ResizablePanel>
                          <ResizablePanel defaultSize={60} className="min-h-[100px]">
                          <div className="h-full px-4 pb-4">
                            <InventorySnapshot></InventorySnapshot>
                          </div>
                          </ResizablePanel>
                        </ResizablePanelGroup>

                      </ResizablePanel>
                    </ResizablePanelGroup>
                  </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={30}>
                  <div className="flex h-screen items-center p-6">
                      {/* {weatherData && weatherData.forecast && (
                        <div>
                          {weatherData.forecast.forecastday.map((day: ForecastDay) => ( 
                            <div key={day.date}>
                              <p>Date: {day.date}</p>
                              <p>Weather Condition: {day.day.condition.text}</p>
                              <img src={'https:' + day.day.condition.icon} alt="Weather Icon" />
                            </div>
                          ))}
                        </div>
                      )} */}
                  </div>
                  </ResizablePanel>
              </ResizablePanelGroup>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
}
