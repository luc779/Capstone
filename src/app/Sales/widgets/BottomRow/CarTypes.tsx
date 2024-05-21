import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResizablePanel } from "@/components/ui/resizable";
import { CarIcon } from "lucide-react";
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip } from "recharts";

const carData = [
    {
      carType: 'American Classics',
      carsOfType: 20,
      B: 15,
      totalCars: 250,
    },
    {
      carType: 'European Sports Cars',
      carsOfType: 34,
      totalCars: 250,
    },
    {
      carType: 'Japanese Icons',
      carsOfType: 41,
      totalCars: 250,
    },
    {
      carType: 'Vintage Luxury Cars',
      carsOfType: 27,
      totalCars: 250,
    },
    {
      carType: 'Muscle Cars',
      carsOfType: 36,
      totalCars: 250,
    },
    {
      carType: 'Racing Legends',
      carsOfType: 42,
      totalCars: 250,
    },
    {
      carType: 'Modern Supercars',
      carsOfType: 49,
      totalCars: 250,
    },
  ];
  

export const CarTypes = () => (
    <ResizablePanel defaultSize={50} className="">
      <Card className="h-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-4">
          <CardTitle>
            Cars Types
          </CardTitle>
          <CarIcon />
        </CardHeader>
        <CardContent className="flex h-full items-center justify-center">
        <ResponsiveContainer width="100%" height="80%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={carData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="carType" />
            <PolarRadiusAxis />
            <Tooltip />
            <Radar name="Cars" dataKey="carsOfType" stroke="#7c3aed" fill="#7c3aed" fillOpacity={0.6} />
          </RadarChart>
        </ResponsiveContainer>
        </CardContent>
      </Card>
    </ResizablePanel>
  );