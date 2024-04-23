import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Input } from "./input"
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip"

// Define button variants using class-variance-authority
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

// Define ButtonProps interface extending from VariantProps
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

// Define Button component using forwardRef
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }),
          "outline-none cursor-default select-none"
        )}
        ref={ref}
        tabIndex={-1}
        {...props}
      />
    )
  }
)
// Set display name for Button component
Button.displayName = "Button"

// Define IconButtonProps interface extending from ButtonProps
export interface IconButtonProps extends ButtonProps {
  tooltip: string
}

// Define IconButton component using forwardRef
const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ tooltip, children, ...rest }, ref) => {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            {...rest}
            ref={ref}
            tabIndex={-1}
            className="cursor-default bg-background"
          >
            <div className="icon-button-icon-wrapper">{children}</div>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    )
  }
)
// Define UploadButtonProps interface extending from IconButtonProps
export interface UploadButtonProps extends IconButtonProps {
  onFileUpload: (file: File) => void
}
// Define ImageUploadButton component
const ImageUploadButton = (props: UploadButtonProps) => {
  const { onFileUpload, children, ...rest } = props

  const [uploadElemId] = React.useState(
    `file-upload-${Math.random().toString()}`
  )

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const newFile = ev.currentTarget.files?.[0]
    if (newFile) {
      onFileUpload(newFile)
    }
  }

  return (
    <>
      <label htmlFor={uploadElemId}>
        <IconButton {...rest} asChild>
          {children}
        </IconButton>
      </label>
      <Input
        style={{ display: "none" }}
        id={uploadElemId}
        name={uploadElemId}
        type="file"
        onChange={handleChange}
        accept="image/png, image/jpeg"
      />
    </>
  )
}

// ERASER TOOL INTERACTION AND ACCESS
const EraserButton = (props: IconButtonProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          {...props}
          tabIndex={-1}
          className="cursor-default bg-background"
        >
          <div className="eraser-button-icon-wrapper">{Eraser}</div>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{props.tooltip}</p>
      </TooltipContent>
    </Tooltip>
  )
}

// Add EraserButton
export { Button, IconButton, ImageUploadButton, EraserButton, buttonVariants }

// Add ImageResolutionButton
export interface ImageResolutionButtonProps extends ButtonProps {
  onResolutionChange: (resolution: string) => void
}

const ImageResolutionButton = (props: ImageResolutionButtonProps) => {
  const { onResolutionChange, children, ...rest } = props;

  const handleChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedResolution = ev.currentTarget.value;
    onResolutionChange(selectedResolution);
  };

  return (
    <select onChange={handleChange} {...rest}>
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
    </select>
  );
};

export { ImageResolutionButton };
