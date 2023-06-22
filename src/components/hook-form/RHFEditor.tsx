import {
  forwardRef,
  LegacyRef,
  type InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
} from "react";

import { useAutoAnimate } from "@formkit/auto-animate/react";
import Select from "react-select";
import { Control, Controller, FieldValues, useForm } from "react-hook-form";
import Editor from "../Editor";

interface Props {
  title?: string;
  error?: string;
  className?: string;
  name: string;
  control: Control<any, any>;
}

const RHFEditor = ({
  title,
  error,
  className,
  name,
  control,
}: Props) => {
  const [parent] = useAutoAnimate();

  return (
    <div ref={parent} className="flex w-full flex-col gap-1">
      {title ? <label className="text-[16px] font-bold">{title}</label> : null}
      <Controller
        control={control}
        defaultValue={""}
        name={name}
        render={({ field: { onChange, value, ref } }) => (
          <Editor onChange={onChange} value={String(value)} />
        )}
      />
      {error ? <p className="-mt-[2px] text-[14px]">{error}</p> : null}
    </div>
  );
};

RHFEditor.displayName = "RHFEditor";

export default RHFEditor;
