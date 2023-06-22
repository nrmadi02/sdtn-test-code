import { forwardRef, LegacyRef, type InputHTMLAttributes, TextareaHTMLAttributes } from "react";

import { useAutoAnimate } from "@formkit/auto-animate/react";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  title?: string;
  error?: string;
  className?: string;
}

const RHFTextarea = forwardRef(
  (
    { title, error, className, ...rest }: Props,
    ref: LegacyRef<HTMLTextAreaElement> | undefined
  ) => {
    const [parent] = useAutoAnimate();
    return (
      <div ref={parent} className="flex min-h-max w-full flex-col gap-1">
        {title ? (
          <label className="text-[16px] font-bold">{title}</label>
        ) : null}
        <textarea
          className={` !h-[40px] rounded-[8px] border-[2px] pt-[5px] px-3 outline-none transition duration-150 ease-in-out ${
            error
              ? "border-red-500 focus-within:border-red-500"
              : "focus-within:border-emerald-500"
          } ${className || ""}`}
          ref={ref}
          {...rest}
        />
        {error ? <p className="-mt-[2px] text-[14px]">{error}</p> : null}
      </div>
    );
  }
);

RHFTextarea.displayName = "RHFTextarea";

export default RHFTextarea;
