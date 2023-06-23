import { ActionButton } from "@/components/Button";
import { RHFInputTextSearch } from "@/components/hook-form";
import { getAllCategoryFn } from "@/service/category";
import { Popover, Transition } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import { type ChangeEventHandler, Fragment, useMemo } from "react";
import { MdSort } from "react-icons/md";
import Select from "react-select";

interface Props {
  onHandleSearchTitle: ChangeEventHandler<HTMLInputElement> | undefined;
  onHandleSearchSort: (sort: string) => void;
  onHandleSearchCategory: (categories: string[]) => void
  valueTitle: string;
  valueSort: string;
}

const HeaderListArticle = ({
  onHandleSearchSort,
  onHandleSearchTitle,
  valueSort,
  valueTitle,
  onHandleSearchCategory,
}: Props) => {
  const { data: dataCategory } = useQuery(["AllCategory"], {
    queryFn: async () => await getAllCategoryFn(),
    // keepPreviousData: true,
  });

  const dataOption = useMemo(() => {
    return dataCategory?.data.docs.map((item) => {
      return {
        value: item._id,
        label: item.name,
      };
    });
  }, [dataCategory]);

  return (
    <div className="mt-5 grid w-full grid-cols-1 gap-y-3 justify-between sm:grid-cols-3">
      <div className="col-span-2 grid grid-cols-1 gap-3 md:grid-cols-2">
        <div className="col-span-1 w-full">
          <RHFInputTextSearch
            onChange={onHandleSearchTitle}
            className="w-full"
            placeholder="Search title"
            value={valueTitle}
          />
        </div>
        <div className="col-span-1 w-full">
          <Select
            isMulti
            onChange={(e) => {
              const dataArr = e.map((item) => {
                return item.value
              })
              onHandleSearchCategory(dataArr)
            }}
            name="colors"
            options={dataOption}
            className="basic-multi-select border-red-500"
            classNamePrefix="select"
            placeholder="Select category"
          />
        </div>
      </div>
      <div className="col-span-1 flex items-end justify-end">
        <Popover className="relative w-max">
          {({ open }) => (
            <>
              <Popover.Button
                className={`
                ${open ? "" : "text-opacity-90"}
                group inline-flex items-center gap-1 rounded-md px-3 py-2 text-base font-medium hover:bg-gray-200  hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
              >
                <div className="flex w-full flex-row items-center gap-2 text-right text-[14px] leading-[15px] ">
                  <p>
                    Sort by:{" "}
                    <strong className="ml-1">
                      {valueSort == "desc" ? "Latest" : "Oldest"}
                    </strong>
                  </p>
                  <MdSort />
                </div>
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute left-1/2 z-10 mt-3 -translate-x-1/2 transform rounded-lg border-[1px] bg-white border-gray-400 p-3 shadow-sm">
                  <ActionButton
                    onClick={() => onHandleSearchSort("desc")}
                    variant="ghost"
                    className={`${valueSort == "desc" ? "bg-gray-200" : ""}`}
                  >
                    Latest
                  </ActionButton>
                  <ActionButton
                    onClick={() => onHandleSearchSort("asc")}
                    variant="ghost"
                    className={`${valueSort == "asc" ? "bg-gray-200" : ""}`}
                  >
                    Oldest
                  </ActionButton>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </div>
  );
};

export default HeaderListArticle;
