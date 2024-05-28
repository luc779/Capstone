import * as React from "react"

import { cn } from "@/lib/utils"
import { Input } from "./input";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    return (
      <Input 
        type={showPassword ? "text" : "password"}
        suffix={showPassword ? (
          <EyeIcon onClick={() => setShowPassword(false)} /> 
          ) : (
          <EyeOffIcon onClick={() => setShowPassword(true)}/>
          )
        }
        className={className} 
        {...props} 
        ref={ref}/>
    );
  }
)
PasswordInput.displayName = "PasswordInput"

export { PasswordInput }
