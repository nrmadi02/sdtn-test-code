import { useAutoAnimate } from "@formkit/auto-animate/react";
import Select from "react-select";
import { Control, Controller } from "react-hook-form";

interface Props {
  title?: string;
  error?: string;
  className?: string;
  options:
    | {
        value: string;
        label: string;
      }[]
    | undefined;
  name: string;
  control: Control<any, any>;
}

const RHFMultiSelect = ({
  title,
  error,
  className,
  options,
  name,
  control,
}: Props) => {
  const [parent] = useAutoAnimate();
  
  return (
    <div ref={parent} className="flex min-h-max w-full flex-col gap-1">
      {title ? <label className="text-[16px] font-bold">{title}</label> : null}
      <Controller
        control={control}
        defaultValue={[]}
        name={name}
        render={({ field: { onChange, value, ref } }) => (
          <Select
            ref={ref}
            isMulti
            options={options}
            classNamePrefix="select"
            value={options?.filter(
              (c) => Array.isArray(value) && value.includes(c.value)
            )}
            onChange={(val) => onChange(val.map((c) => c.value))}
            className={`!h-[40px] rounded-[8px] outline-none transition duration-150 ease-in-out ${
              error
                ? "multi-select-error"
                : "focus-within:!border-emerald-500"
            } ${className || ""}`}
          />
        )}
      />
      {error ? <p className="-mt-[2px] text-[14px]">{error}</p> : null}
    </div>
  );
};

RHFMultiSelect.displayName = "RHFRHFMultiSelectSelect";

export default RHFMultiSelect;
