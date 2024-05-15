import { toast } from "./ui/use-toast"

export const ErrorToast = (description: string) => {
    toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong:",
        description: description,
    })
}

export const AuthenticationErrorToast = (description: string) => {
    toast({
        variant: "destructive",
        title: "Authentication Expired:",
        description: description,
    })
}