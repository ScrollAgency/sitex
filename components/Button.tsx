import React, { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import Image from "next/image";

export type HTMLButtonProps = Pick<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onClick" | "disabled">;

export interface ButtonProps extends HTMLButtonProps {
  label?: string;
  icon?: "start" | "end" | "only" | "none";
  destructive?: boolean;
  hierarchy?: "primary" | "secondary";
  size?: "small" | "large";
  state?: "default" | "hover" | "focused" | "disabled";
  disabled?: boolean;
  iconImage?: string;
  className?: string;
}

const Button = ({
  label = "Button",
  icon = "none",
  destructive = false,
  hierarchy = "primary",
  size = "large",
  state = "default",
  disabled,
  onClick,
  iconImage,
  className,
}: ButtonProps) => {
  const variants = cva(
    "flex items-center justify-center gap-3 rounded transition-all outline-none group",
    {
      variants: {
        destructive: {
          true: "bg-red-500 text-white",
          false: "bg-blue-500 text-white",
        },
        hierarchy: {
          primary: "bg-blue-500 text-white",
          secondary: "bg-gray-300 text-black",
        },
        size: {
          small: "py-2 px-4 text-sm",
          large: "py-3 px-6 text-lg",
        },
        state: {
          default: "",
          hover: "hover:opacity-90",
          focused: "focus:ring-2 focus:ring-blue-500",
          disabled: "opacity-50 cursor-not-allowed",
        },
      },
      compoundVariants: [
        {
          destructive: true,
          hierarchy: "primary",
          className: "bg-red-500 text-white",
        },
        {
          destructive: false,
          hierarchy: "secondary",
          className: "bg-gray-300 text-black",
        },
      ],
    }
  );

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        variants({ destructive, hierarchy, size, state }),
        className || ""
      )}
    >
      {icon === "start" && iconImage && (
        <Image src={iconImage} alt="Icon" className="w-5" />
      )}
      {icon !== "only" && <span>{label}</span>}
      {icon === "end" && iconImage && (
        <Image src={iconImage} alt="Icon" className="w-5" />
      )}
      {icon === "only" && iconImage && (
        <Image src={iconImage} alt="Icon" className="w-5" />
      )}
    </button>
  );
};

export default Button;