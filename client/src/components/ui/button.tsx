import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-wegic-purple to-wegic-pink text-white shadow-lg hover:shadow-xl hover:scale-105 border-0",
        destructive:
          "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg hover:shadow-xl hover:scale-105 border-0",
        outline:
          "border-2 border-wegic-purple bg-transparent text-wegic-purple hover:bg-gradient-to-r hover:from-wegic-purple hover:to-wegic-pink hover:text-white hover:border-transparent shadow-md hover:shadow-lg hover:scale-105",
        secondary:
          "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-900 shadow-md hover:shadow-lg hover:scale-105 border-0",
        ghost: "hover:bg-wegic-purple/10 hover:text-wegic-purple",
        link: "text-wegic-purple underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 py-3 text-sm rounded-xl",
        sm: "h-9 px-4 py-2 text-sm rounded-lg",
        lg: "h-14 px-10 py-4 text-lg rounded-2xl font-bold",
        xl: "h-16 px-12 py-5 text-xl rounded-2xl font-bold",
        icon: "h-11 w-11 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
