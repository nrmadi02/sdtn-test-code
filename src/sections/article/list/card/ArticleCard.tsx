import { PATH_DASHBOARD } from "@/routes";
import type { IArticle, ICategory, StatusArticle } from "@/types";
import moment from "moment";
import Link from "next/link";
import { type Dispatch, type ReactNode, type SetStateAction, useMemo } from "react";
import ArticleCardAction from "./ArticleCardAction";
import { ActionButton } from "@/components/Button";
import { MdDelete, MdEdit } from "react-icons/md";
import { IoMdEye } from "react-icons/io";

interface Props {
  article: IArticle;
  onHandleUpdate: (id: string) => void;
  onHandleView: (id: string, slug:string) => void;
  setTrue: () => void;
  setDeleteID: Dispatch<SetStateAction<string>>;
  categories: ICategory[] | undefined | [];
}

const getBadgeStatus = (status: StatusArticle) => {
  type typeOption = {
    [x: string]: ReactNode;
  };
  const ItemStatus: typeOption = {
    DRAFT: (
      <span className="rounded-md bg-gray-200  px-1 py-[2px] text-[12px] font-bold text-gray-600">
        {status}
      </span>
    ),
    PUBLISHED: (
      <span className="rounded-md bg-green-200 px-1 py-[2px] text-[12px] font-bold text-green-600">
        {status}
      </span>
    ),
    PINNED: (
      <span className="rounded-md bg-blue-200 px-1 py-[2px] text-[12px] font-bold text-blue-600">
        {status}
      </span>
    ),
  };

  return ItemStatus[status];
};

const ArticleCard = ({
  article,
  onHandleUpdate,
  setTrue,
  setDeleteID,
  categories,
  onHandleView
}: Props) => {

  const useCategoriesArticle = (data: string[]) =>
    useMemo(() => {
      const dataArr = data.map((item) => {
        return categories?.find((itm) => {
          return itm._id == item;
        })?.name;
      });

      return dataArr.length !== 0 ? dataArr.join(", ") : "";
      
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categories]);

  return (
    <div className="relativ overflow-hiddene flex flex-row rounded-lg border-[1px] border-gray-300 shadow-sm">
      <div className="relative flex h-full w-full flex-col justify-between px-[20px] pb-[16px] pt-[20px]">
        <div className="w-full">
          <div className="flex flex-row items-center justify-between pr-14">
            <div className="flex flex-row items-center gap-2">
              {getBadgeStatus(article.status)}
              <p className="text-[12px] font-semibold text-gray-500">
                by: {article.author.name}
              </p>
            </div>
            <span className="text-[12px] font-semibold text-gray-400">
              {moment(article.updatedAt).format("DD MMM YYYY")}
            </span>
          </div>
          <div className="mt-4">
            <Link href={PATH_DASHBOARD.article.view(article._id)}>
              <p className="text-overflow-article overflow-hidden text-ellipsis text-[14px] font-semibold hover:underline ">
                {article.title}
              </p>
            </Link>
          </div>
          <div className="mt-2">
            <p className="text-overflow-article overflow-hidden text-ellipsis text-[14px] font-semibold text-gray-400 ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
              similique a cum nam, ad earum magni alias explicabo esse ea
              possimus provident in, aut incidunt corporis veniam pariatur saepe
              dolor!
            </p>
          </div>
        </div>
        <div className="flex flex-row items-center gap-5">
          <ArticleCardAction>
            <div className="flex w-full flex-col items-center gap-2 text-[14px]">
              <ActionButton
                onClick={() => onHandleView(article._id, article.slug)}
                icon={<IoMdEye />}
                variant="ghost"
                className="text-white"
              >
                <p>View</p>
              </ActionButton>
              <ActionButton
                onClick={() => onHandleUpdate(article._id)}
                icon={<MdEdit />}
                variant="ghost"
                className="text-white"
              >
                <p>Edit</p>
              </ActionButton>
              <ActionButton
                onClick={() => {
                  setDeleteID(article._id);
                  setTrue();
                }}
                variant="red"
                icon={<MdDelete />}
              >
                <p>Delete</p>
              </ActionButton>
            </div>
          </ArticleCardAction>
          <p className="text-overflow-article overflow-hidden text-ellipsis text-[12px] font-medium text-gray-400">
            Category: {useCategoriesArticle(article.categories)}
          </p>
        </div>
        <img
          className="absolute right-5 top-5 rounded-full"
          width={35}
          height={35}
          src={
            article.author.avatar
              ? article.author.avatar !== "string"
                ? article.author.avatar
                : `https://ui-avatars.com/api/?name=${article.author.name
                    .split(" ")
                    .join("+")}`
              : `https://ui-avatars.com/api/?name=${article.author.name
                  .split(" ")
                  .join("+")}`
          }
          alt="_image"
        />
      </div>
    </div>
  );
};

export default ArticleCard;
