"use client"

import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/my-app/spinner"
import { cn } from "@/lib/utils"

export default function SubmitButton({
  isLoading,
  children,
  className,
  icon,
  ...props
}) {
  const textColor = props.variant === "ghost" ? "" : "text-white"

  return (
    <Button disabled={isLoading} className={cn(className)} {...props}>
      {isLoading ? (
        <Spinner size="small" className={cn("mr-2", textColor)} />
      ) : (
        icon && <span className="mr-2">{icon}</span>
      )}
      {children}
    </Button>
  )
}
