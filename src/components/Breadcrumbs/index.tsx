import { Fragment, ReactNode } from "react";
import BreadcrumbsItem from "./BreadcrumbsItem";

interface Link {
  name: string;
  path?: string;
}

interface Props {
  heading: string;
  links?: Link[];
  action?: ReactNode;
}

const checkIsLast = (index: number, length: number) => {
  if (index == length - 1) return true;

  return false;
};

const Breadcrumbs = ({ heading, action, links }: Props) => {
  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="font-bold text-[24px]">{heading}</h1>
        <div className="flex flex-row flex-wrap items-center gap-3">
          {(links || []).map((item, idx) => {
            return (
              <Fragment key={idx}>
                <BreadcrumbsItem
                  isLast={checkIsLast(idx, links?.length || 0)}
                  name={item.name}
                  path={item.path}
                />
                {checkIsLast(idx, links?.length || 0) ? null : (
                  <div className="h-1 w-1 rounded-full bg-gray-800"></div>
                )}
              </Fragment>
            );
          })}
        </div>
      </div>
      {action}
    </div>
  );
};

export default Breadcrumbs;
