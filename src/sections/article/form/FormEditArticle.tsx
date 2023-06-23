import { BaseButton } from "@/components/Button";
import Spinner from "@/components/Spinner";
import { RHFEditor, RHFInputText, RHFMultiSelect, RHFSelect, RHFTextarea } from "@/components/hook-form";
import useUploadImage from "@/hooks/useUploadImage";
import { PATH_DASHBOARD } from "@/routes";
import { type ArticleEditSchema, articleEditSchema } from "@/schema/article.schema";
import { editArticleFn } from "@/service/article";
import {  getAllCategoryFn } from "@/service/category";
import { type IArticle } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { type ChangeEvent, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdAdd } from "react-icons/io";

interface Props {
  currentArticle?: IArticle;
}

const FormEditArticle = ({ currentArticle }: Props) => {
  const { push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const [file, setFile] = useState("");
  const {
    onHandleChange: onHandleUploadImage,
    data,
    isLoading,
  } = useUploadImage();

  const handleChangeFile = async (
    e: ChangeEvent<HTMLInputElement> | undefined
  ) => {
    setFile("");
    if (e?.target.files) {
      // e.target?.files[0] && setFile(URL.createObjectURL(e.target?.files[0]));
      if (e.target.files[0]) {
        await onHandleUploadImage(e.target.files[0]);
      }
    }
  };

  const defaultValues = useMemo<ArticleEditSchema>(() => {
    if (!data) {
      setFile(String(currentArticle?.thumbnail));
    } else {
      setFile(data.url);
    }
    return {
      categories: currentArticle?.categories || [],
      content: currentArticle?.content || "",
      description: currentArticle?.description || "",
      status: currentArticle?.status || "",
      thumbnail: currentArticle?.thumbnail || "",
      title: currentArticle?.title || "",
      id: currentArticle?._id || "",
    };
  }, [currentArticle, data]);

  const method = useForm<ArticleEditSchema>({
    resolver: zodResolver(articleEditSchema),
    defaultValues: defaultValues,
    mode: "onChange",
  });

  const {
    reset,
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = method;

  const { mutateAsync: editArticle } = useMutation({
    mutationFn: async (data: ArticleEditSchema) => await editArticleFn(data),
    onSuccess: async () => {
      reset();
      enqueueSnackbar("Update success!", {
        variant: "success",
      });
      await push(PATH_DASHBOARD.article.list);
    },
    onError: () => {
      enqueueSnackbar("Update failed!", {
        variant: "error",
      });
    },
  });

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

  const onSubmit = async (data: ArticleEditSchema) => {
    try {
      await editArticle(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log(errors)
  }, [errors])

  useEffect(() => {
    if (data) {
      data && setFile(data.url);
      setValue("thumbnail", data.url);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <form
      className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3"
      id="editnewarticle"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="col-span-1 hidden md:block">
        <h1 className=" text-[20px] font-bold ">Details</h1>
        <p className="text-gray-400">Title, description, sampul, content...</p>
      </div>
      <div className="col-span-1 flex w-full flex-col gap-3 rounded-xl border-[1px] border-gray-300 border-opacity-50 p-5 shadow-md md:col-span-2 md:grid-cols-2">
        <RHFInputText
          title="Title"
          placeholder="Title"
          error={errors.title?.message}
          {...register("title")}
        />

        <RHFTextarea
          className="min-h-[100px]"
          title="Description"
          placeholder="Description"
          error={errors.description?.message}
          {...register("description")}
        />

        <RHFEditor
          title="Content"
          error={errors.content?.message}
          control={control}
          name="content"
        />

        <div>
          <RHFInputText
            type="file"
            accept="image/*"
            id="input-file-upload"
            className="hidden"
            title="Thumbnail"
            error={errors.thumbnail?.message}
            {...register("thumbnail")}
            disabled={isLoading}
            onChange={handleChangeFile}
          />
          {!file && (
            <label id="label-file-upload" htmlFor="input-file-upload">
              <div className="mt-1 flex h-[230px] w-full cursor-pointer flex-col items-center justify-center  rounded-lg border-[2px]  transition-all ">
                {isLoading ? <Spinner /> : <IoMdAdd size={"50"} />}
              </div>
            </label>
          )}
          {file && (
            <label id="label-file-upload" htmlFor="input-file-upload">
              <img
                className="mt-1 h-[230px] w-full cursor-pointer overflow-hidden  rounded-lg border-[2px] object-cover transition-all "
                width={200}
                height={230}
                alt="_img"
                src={file}
              />
            </label>
          )}
        </div>
      </div>
      <div className="col-span-1 hidden md:block">
        <h1 className=" text-[20px] font-bold ">Properties</h1>
        <p className="text-gray-400">Category, status...</p>
      </div>
      <div className="col-span-1 md:col-span-2 flex w-full flex-col gap-3 rounded-xl border-[1px] border-gray-300 border-opacity-50 p-5 shadow-md md:grid-cols-2">
        <RHFMultiSelect
          name="categories"
          options={dataOption}
          title="Categories"
          control={control}
          error={errors.categories?.message}
        />
        <RHFSelect
          className="w-full"
          title="Status"
          placeholder="Select status"
          error={errors.status?.message}
          {...register("status")}
        >
          <option value={""}>Select -- </option>
          <option value={"PUBLISHED"}>PUBLISHED</option>
          <option value={"DRAFT"}>DRAFT</option>
          <option value={"PINNED"}>PINNED</option>
        </RHFSelect>
      </div>
      <div className="col-span-1 md:col-span-3 flex flex-row justify-end">
        <BaseButton
          disabled={isSubmitting}
          isLoading={isSubmitting}
          variant="primary"
          type="submit"
        >
          Update
        </BaseButton>
      </div>
    </form>
  );
};

export default FormEditArticle;
