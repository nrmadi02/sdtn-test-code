import type { ButtonHTMLAttributes, ReactNode } from "react";

type VariantButton = "primary" | "red" | "ghost";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  variant: VariantButton;
  isLoading?: boolean;
}

const variantButton = {
  primary:
    "bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500",
  red: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  ghost: "text-black hover:bg-gray-100 border focus:ring-emerald-500",
};

const BaseButton = ({
  children,
  className,
  isLoading,
  variant,
  ...BaseButton
}: Props) => {
  return (
    <button
      className={`${className || ""} ${
        variantButton[variant]
      } whitespace-no-wrap inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-base font-medium leading-6 shadow-sm  focus:outline-none  focus:ring-2 focus:ring-offset-2  disabled:cursor-not-allowed`}
      {...BaseButton}
    >
      {isLoading ? (
        <>
          <svg className="h-4 w-4 animate-spin" viewBox="3 3 18 18">
            <path
              className="fill-gray-600"
              d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
            ></path>
            <path
              className="fill-blue-100"
              d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z"
            ></path>
          </svg>
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default BaseButton;
