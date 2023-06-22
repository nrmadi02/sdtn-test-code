import {
  useState,
  type InputHTMLAttributes,
  forwardRef,
  type LegacyRef,
} from "react";

import { useAutoAnimate} from "@formkit/auto-animate/react"

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  title?: string;
  error?: string;
  className?: string;
}

const RHFInputPassword = forwardRef(
  (
    { title, error, className, ...rest }: Props,
    ref: LegacyRef<HTMLInputElement> | undefined
  ) => {

    const [isShow, setIsShow] = useState(false);
    const [parent] = useAutoAnimate();

    return (
      <div ref={parent} className="flex min-h-max w-full flex-col gap-1">
        {title ? (
          <label className="text-[16px] font-bold">{title}</label>
        ) : null}
        <div className="relative">
          <input
            className={` !h-[40px] rounded-[8px] border-[2px] px-3 outline-none transition duration-150 ease-in-out ${
              error
                ? "border-red-500 focus-within:border-red-500"
                : "focus-within:border-emerald-500"
            } ${className || ""}`}
            type={isShow ? "text" : "password"}
            ref={ref}
            {...rest}
          />
          <button
            type="button"
            onClick={() => setIsShow(!isShow)}
            className="hover-action absolute bottom-[9px] right-2"
          >
            {isShow ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                />
              </svg>
            )}
          </button>
        </div>
        {error ? <p className="-mt-[2px] text-[14px]">{error}</p> : null}
      </div>
    );
  }
);

RHFInputPassword.displayName = "RHFInputPassword";

export default RHFInputPassword;
