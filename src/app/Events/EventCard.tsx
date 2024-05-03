import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PopoverTrigger, PopoverContent, Popover } from "@/components/ui/popover"
 
export default function EventCard() {
   return (
     <div className="w-full max-w-md">
       <Card>
         <CardHeader className="flex items-center justify-between">
           <CardTitle>Van Gogh Exhibit</CardTitle>
           <Badge className="bg-yellow-500 text-white" variant="outline">
             High Priority
           </Badge>
         </CardHeader>
         <CardContent className="space-y-2 md:grid md:grid-cols-2 md:gap-4">
           <div className="space-y-1">
             <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Location</p>
             <p>New York, NY</p>
           </div>
           <div className="space-y-1">
             <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Dates</p>
             <p>May 1 - Aug 31 (10AM - 6PM)</p>
           </div>
           <div className="space-y-2 md:col-span-2 md:flex md:justify-between">
             <Popover>
               <PopoverTrigger asChild>
                 <Button size="sm" variant="outline">
                   More Info
                 </Button>
               </PopoverTrigger>
               <PopoverContent className="w-full max-w-md p-6">
                 <div className="space-y-4">
                   <div className="space-y-1">
                     <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Description</p>
                     <p>
                       Experience the captivating world of Van Gogh's masterpieces at this must-see exhibit. Immerse
                       yourself in the vibrant colors and captivating brushstrokes that defined the artist's iconic
                       style.
                     </p>
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-1">
                       <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Museum</p>
                       <p>The Metropolitan Museum of Art</p>
                     </div>
                     <div className="space-y-1">
                       <p className="text-sm font-medium text-gray-500 dark:text-gray-400">ID</p>
                       <p>12345</p>
                     </div>
                     <div className="space-y-1">
                       <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Item Type</p>
                       <p>Exhibit</p>
                     </div>
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