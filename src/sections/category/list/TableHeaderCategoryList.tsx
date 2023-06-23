import { RHFInputTextSearch } from "@/components/hook-form";
import { type ChangeEventHandler } from "react";

interface Props {
  onHandleSearchName: ChangeEventHandler<HTMLInputElement> | undefined;
  onHandleSearchSlug: ChangeEventHandler<HTMLInputElement> | undefined;
  valueName: string;
  valueSlug: string;
}

const TableHeaderCategoryList = ({
  onHandleSearchName,
  onHandleSearchSlug,
  valueName,
  valueSlug,
}: Props) => {
  return (
    <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-3 p-3">
      <div className="col-span-1 w-full">
        <RHFInputTextSearch
          onChange={onHandleSearchName}
          className="w-full"
          placeholder="Search name"
          value={valueName}
        />
      </div>
      <div className="col-span-1 w-full">
        <RHFInputTextSearch
          onChange={onHandleSearchSlug}
          className="w-full"
          placeholder="Search slug"
          value={valueSlug}
        />
      </div>
    </div>
  );
};

export default TableHeaderCategoryList;
