import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PopoverTrigger, PopoverContent, Popover } from "@/components/ui/popover"
import { EventInterface } from "../Interfaces/Event";

const formatTimestamp = (timestamp: string) => {
  const date = new Date(parseInt(timestamp) * 1000);
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${monthNames[date.getMonth()]} ${date.getDate()}`;
};

const formatTime = (timestamp: string) => {
  const date = new Date(parseInt(timestamp) * 1000);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
};

const getBadgeColor = (priority: string) => {
  switch (priority) {
    case 'High':
      return 'bg-red-500 text-black';
    case 'Medium':
      return 'bg-yellow-500 text-black';
    case 'Low':
      return 'bg-green-500 text-black';
    default:
      return 'bg-gray-500';
  }
};

export default function EventCard({ event, index }: { event: EventInterface; index: number; }) {
  return (
     <div key={index} className="w-full max-w-md">
       <Card>
         <CardHeader className="flex items-center text-center">
           <CardTitle>{event.title}</CardTitle>
           <Badge className={getBadgeColor(event.priority)} variant="outline">
             {event.priority} Priority
           </Badge>
         </CardHeader>
         <CardContent className=" md:grid md:grid-cols-2 md:gap-4">
           <div className="space-y-1">
             <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Location</p>
             <p>{event.location}</p>
           </div>
           <div className="space-y-1">
             <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Dates</p>
             <p>
                {formatTimestamp(event.start_date)} - {formatTimestamp(event.end_date)} (
                {formatTime(event.start_date)} - {formatTime(event.end_date)})
             </p>
           </div>
           <div className="md:col-span-2 md:flex md:justify-between">
             <Popover>
               <PopoverTrigger asChild>
                 <Button size="sm" variant="outline">
                   Description
                 </Button>
               </PopoverTrigger>
               <PopoverContent className="w-full max-w-md p-6">
                 <div className="space-y-4">
                   <div className="space-y-1">
                     <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Description</p>
                     <p>
                       {event.description}
                     </p>
                   </div>
                 </div>
               </PopoverContent>
             </Popover>
             <Popover>
               <PopoverTrigger asChild>
                 <Button size="sm" variant="outline">
                   Featured Cars
                 </Button>
               </PopoverTrigger>
               <PopoverContent className="w-full max-w-md p-6">
                 <div className="space-y-1">
                   <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Featured Cars</p>
                   <ul className="list-disc pl-4 space-y-1">
                     <li>1962 Chevrolet Corvette</li>
                     <li>1967 Ford Mustang</li>
                     <li>1955 Mercedes-Benz 300SL</li>
                     <li>1964 Aston Martin DB5</li>
                     <li>1970 Dodge Challenger</li>
                   </ul>
                 </div>
               </PopoverContent>
             </Popover>
           </div>
         </CardContent>
       </Card>
     </div>
   )
}