import { forwardRef, type LegacyRef, type ReactNode, type SelectHTMLAttributes } from "react";

import { useAutoAnimate } from "@formkit/auto-animate/react";

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  title?: string;
  error?: string;
  className?: string;
  children: ReactNode;
}

const RHFSelect = forwardRef(
  (
    { title, error, className, children, ...rest }: Props,
    ref: LegacyRef<HTMLSelectElement> | undefined
  ) => {
    const [parent] = useAutoAnimate();
    return (
      <div ref={parent} className="flex min-h-max w-full flex-col gap-1">
        {title ? (
          <label className="text-[16px] font-bold">{title}</label>
        ) : null}
        <select
          className={` !h-[40px] rounded-[8px] border-[2px] px-3 outline-none transition duration-150 ease-in-out ${
            error
              ? "border-red-500 focus-within:border-red-500"
              : "focus-within:border-emerald-500"
          } ${className || ""}`}
          ref={ref}
          {...rest}
        >
          {children}
        </select>
        {error ? <p className="-mt-[2px] text-[14px]">{error}</p> : null}
      </div>
    );
  }
);

RHFSelect.displayName = "RHFSelect";

export default RHFSelect;
