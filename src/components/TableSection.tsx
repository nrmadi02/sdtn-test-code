import { type ReactNode } from "react";

interface Props {
  children: ReactNode
}

const TableSection = ({children}: Props) => {
  return (
    <div className="mt-5 flex flex-col p-3">
      <div className="rounded-xl border-[1px] border-gray-300 border-opacity-50 shadow-md">
        {children}
      </div>
    </div>
  );
};

export default TableSection;
