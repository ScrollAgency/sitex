// biome-ignore lint/style/useImportType: <explanation>
import * as React from "react";
import {
  type ButtonHTMLAttributes,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";

import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";

// Ensure environment variables are defined
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase environment variables");
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

type HTMLButtonProps = Pick<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "onClick" | "disabled"
>;

interface ButtonProps extends HTMLButtonProps {
    label?: string;
    icon?: "start" | "end" | "only" | "none";
    destructive?: boolean;
    hierarchy?: "primary" | "secondary";
    size?: "small" | "large";
    state?: "default" | "hover" | "focused" | "disabled";
    iconImage?: string;
    className?: string;
    type?: "button" | "submit" | "reset";
}

export interface ButtonActions {
    click(): void;
}

const ButtonApple = forwardRef<ButtonActions, ButtonProps>(
    (
        {
            label = "Sign in with Apple",
            icon = "none",
            destructive = false,
            hierarchy = "primary",
            size = "large",
            state = "default",
            disabled,
            onClick,
            iconImage = "/apple-icon.svg", // Path to the Apple icon
            className,
            type = "button",
        },
        ref
    ) => {
        const buttonRef = useRef<HTMLButtonElement>(null);

        useImperativeHandle(ref, () => ({
            click() {
                buttonRef.current?.click();
            },
        }));

        // Function to handle Apple sign-in with Supabase OAuth
        const handleAppleSignIn = async () => {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: "apple",
            });
            if (error) {
                console.error("Error signing in with Apple:", error.message);
            }
        };

        const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();
            if (onClick) {
                onClick(event);
            }
            await handleAppleSignIn();
        };

        const variants = cva(
            "flex items-center justify-center gap-3 rounded transition-all outline-none group",
            {
                variants: {
                    destructive: {
                        true: "bg-red-500 text-white",
                        false: "bg-black text-white",
                    },
                    hierarchy: {
                        primary: "bg-black text-white",
                        secondary: "bg-gray-300 text-black",
                    },
                    size: {
                        small: "py-2 px-4 text-sm",
                        large: "py-3 px-6 text-lg",
                    },
                    state: {
                        default: "",
                        hover: "hover:opacity-90",
                        focused: "focus:ring-2 focus:ring-black",
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
                ref={buttonRef}
                onClick={handleClick}
                disabled={disabled}
                className={cn(variants({ destructive, hierarchy, size, state }), className)}
                type={type}
            >
                {icon === "start" && iconImage && (
                    <Image src={iconImage} alt="Apple Icon" width={20} height={20} />
                )}
                {icon !== "only" && <span>{label}</span>}
                {icon === "end" && iconImage && (
                    <Image src={iconImage} alt="Apple Icon" width={20} height={20} />
                )}
                {icon === "only" && iconImage && (
                    <Image src={iconImage} alt="Apple Icon" width={20} height={20} />
                )}
            </button>
        );
    }
);

ButtonApple.displayName = "ButtonApple";
export default ButtonApple;