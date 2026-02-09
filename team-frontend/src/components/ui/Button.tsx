import { type ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

export const Button = ({
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  children,
  className,
  ...props
}: ButtonProps) => {
  const isDisabled = disabled || loading;

  return (
    <button
      {...props}
      disabled={isDisabled}
      className={clsx(
        "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 active:scale-95",
        "disabled:opacity-50 disabled:cursor-not-allowed",

        // Variants
        {
          "bg-blue-600 hover:bg-blue-700 text-white":
            variant === "primary",

          "bg-gray-100 hover:bg-gray-200 text-gray-800":
            variant === "secondary",

          "bg-transparent hover:bg-gray-100 text-gray-700":
            variant === "ghost",

          "bg-red-600 hover:bg-red-700 text-white":
            variant === "danger",
        },

        // Sizes
        {
          "px-4 py-2 text-sm": size === "sm",
          "px-6 py-2.5 text-base": size === "md",
          "px-8 py-3 text-lg": size === "lg",
        },

        className
      )}
    >
      {loading && (
        <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
      )}
      {children}
    </button>
  );
};
