import { useAuth } from "@/apiCalls/authentication/UseAuth";
import { Progress } from "./ui/progress";


const LoadingIndicator = ({ progressValue }: { progressValue: number }) => {
return (
    <div className="flex items-center justify-center h-screen">
    <Progress value={progressValue} className="w-[60%]" />
    </div>
);
};

export default LoadingIndicator;