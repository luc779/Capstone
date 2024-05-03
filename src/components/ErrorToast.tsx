import { toast } from "./ui/use-toast"

export const ErrorToast = (description: string) => {
    toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: description,
    })
}