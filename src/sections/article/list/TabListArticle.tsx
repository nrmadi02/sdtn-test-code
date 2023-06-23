import { Tab } from "@headlessui/react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface Props {
  onHandleChangeTab: (status: string | undefined) => void
}

const TabListArticle = ({onHandleChangeTab}: Props) => {
  const tabList = ["SEMUA", "DRAFT", "PUBLISHED", "PINNED"];
  return (
    <div className="mb-5 mt-3 w-full md:w-[400px]">
      <Tab.Group onChange={(e) => {
        const status = tabList[e]
        onHandleChangeTab(status === "SEMUA" ? "" : status )
      }}>
        <Tab.List className="flex flex-row flex-wrap md:flex-nowrap space-x-1 p-1">
          {tabList.map((item, idx) => {
            return (
              <Tab
                key={idx}
                className={({ selected }) =>
                  classNames(
                    "w-full rounded-lg py-2.5 text-[14px] leading-5 text-gray-500 transition-all ",
                    "ring-white ring-opacity-60 ring-offset-2  focus:outline-none focus:ring-2",
                    selected
                      ? "bg-emerald-600 font-bold text-white shadow"
                      : " hover:bg-emerald-300 hover:text-white"
                  )
                }
              >
                {item}
              </Tab>
            );
          })}
        </Tab.List>
      </Tab.Group>
    </div>
  );
};

export default TabListArticle;
