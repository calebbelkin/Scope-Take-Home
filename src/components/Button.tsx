import { VariantProps, cva } from "class-variance-authority";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

const buttonStyles = cva(["transition-colors"], {
  variants: {
    variant: {
      default: ["bg-secondary", "hover:bg-secondary-hover"],
      ghost: ["hover:bg-gray-100"],
      dark: ["bg-secondary-dark", "hover:bg-secondary-dark-hover", "text-secondary"],
    },
    size: {
      default: ["rounded", "p-2", "w-20", "h-10", "text-base"],
      icon: ["rounded-full", "text-lg", "w-10", "h-10", "flex", "items-center", "justify-center"],
      iconLarge: ["rounded-full", "text-lg", "w-20", "h-20", "flex", "items-center", "justify-center"],
    }
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  }
});

type ButtonProps = VariantProps<typeof buttonStyles> & ComponentProps<"button">;

export function UniformButton({ variant, size, className, ...props }: ButtonProps) {
  return <button {...props} className={twMerge(buttonStyles({ variant, size }), className)} />;
}
