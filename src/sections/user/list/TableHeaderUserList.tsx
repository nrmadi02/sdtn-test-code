import { RHFInputTextSearch, RHFSelect } from "@/components/hook-form";
import { getRoleListFn } from "@/service/role";
import { useQuery } from "@tanstack/react-query";
import { ChangeEventHandler } from "react";

interface Props {
  onChangeSelectRole: ChangeEventHandler<HTMLSelectElement> | undefined;
  onHandleSearchName: ChangeEventHandler<HTMLInputElement> | undefined;
  onHandleSearchEmail: ChangeEventHandler<HTMLInputElement> | undefined;
  valueRole: string;
  valueName: string;
  valueEmail: string;
}

const TableHeaderUserList = ({
  onChangeSelectRole,
  onHandleSearchEmail,
  onHandleSearchName,
  valueEmail,
  valueName,
  valueRole,
}: Props) => {
  const { data: dataRoles } = useQuery(["allRoles"], {
    queryFn: async (ctx) => await getRoleListFn(),
    // keepPreviousData: true,
  });
  return (
    <div className="grid w-full grid-cols-1 gap-3 p-3 md:grid-cols-5">
      <div className="col-span-1 w-full">
        <RHFSelect
          onChange={onChangeSelectRole}
          className="w-full"
          placeholder="Select role"
          value={valueRole}
        >
          <option value={""}>semua</option>
          {dataRoles?.data.map((item, idx) => {
            return (
              <option key={idx} value={item._id}>
                {item.name}
              </option>
            );
          })}
        </RHFSelect>
      </div>
      <div className="col-span-1 w-full md:col-span-2">
        <RHFInputTextSearch
          onChange={onHandleSearchName}
          className="w-full"
          placeholder="Search name"
          value={valueName}
        />
      </div>
      <div className="col-span-1 w-full md:col-span-2">
        <RHFInputTextSearch
          onChange={onHandleSearchEmail}
          className="w-full"
          placeholder="Search email"
          value={valueEmail}
        />
      </div>
    </div>
  );
};

export default TableHeaderUserList;
