import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
}

export const Button = ({ children, variant = "default", ...props }: ButtonProps) => {
  return (
    <button className={`${variant === "outline" ? "border border-gray-300" : ""} ${props.className}`} {...props}>
        {children}
    </button>
  )
}