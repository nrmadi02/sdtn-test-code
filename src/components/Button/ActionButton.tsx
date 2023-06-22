import type { ButtonHTMLAttributes, ReactElement, ReactNode } from "react";

type VariantButton = "red" | "ghost";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  variant: VariantButton;
  icon?: ReactElement;
}

const variantButton = {
  red: "text-red-500",
  ghost: "",
};

const ActionButton = ({
  children,
  className,
  variant,
  icon,
  ...BaseButton
}: Props) => {
  return (
    <button
      className={`${className || ""} ${
        variantButton[variant]
      } flex w-full flex-row items-center gap-2 rounded-md px-2 py-1 transition-all hover:bg-slate-200 hover:bg-opacity-40 active:bg-slate-300`}
      {...BaseButton}
    >
      {icon}
      {children}
    </button>
  );
};

export default ActionButton;
