import { BaseButton } from "@/components/Button";
import { RHFInputText } from "@/components/hook-form";
import { PATH_DASHBOARD } from "@/routes";
import { type CategoryEditSchema, categoryEditSchema } from "@/schema/category.schema";
import { editCategoryFn } from "@/service/category";
import { type ICategory } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useMemo } from "react";
import { useForm } from "react-hook-form";

interface Props {
  currentCategory?: ICategory;
}

const FormEditCategory = ({ currentCategory }: Props) => {
  const { push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const defaultValues = useMemo<CategoryEditSchema>(
    () => ({
      id: currentCategory?._id || "",
      name: currentCategory?.name || "",
      slug: currentCategory?.slug || "",
    }),
    [currentCategory]
  );

  const method = useForm<CategoryEditSchema>({
    resolver: zodResolver(categoryEditSchema),
    defaultValues: defaultValues,
    mode: "onChange",
  });

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = method;

  const { mutateAsync: editCategory } = useMutation({
    mutationFn: async (data: CategoryEditSchema) => await editCategoryFn(data),
    onSuccess: async () => {
      reset();
      enqueueSnackbar("Update success!", {
        variant: "success",
      });
      await push(PATH_DASHBOARD.category.list);
    },
    onError: () => {
      enqueueSnackbar("Update failed!", {
        variant: "error",
      });
    },
  });

  const onSubmit = async (data: CategoryEditSchema) => {
    try {
      await editCategory(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form id="editnewuser" onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-5 grid w-full grid-cols-1 gap-3 rounded-xl border-[1px] border-gray-300 border-opacity-50 p-5 shadow-md md:grid-cols-2">
        <div className="col-span-1">
          <RHFInputText
            title="Name"
            placeholder="Name"
            {...register("name")}
            error={errors.name?.message}
          />
        </div>
        <div className="col-span-1">
          <RHFInputText
            title="Slug"
            placeholder="Slug"
            error={errors.slug?.message}
            {...register("slug")}
          />
        </div>
        <div className="col-span-2 flex flex-row justify-end">
          <BaseButton
            disabled={isSubmitting}
            isLoading={isSubmitting}
            variant="primary"
            type="submit"
          >
            Update
          </BaseButton>
        </div>
      </div>
    </form>
  );
};

export default FormEditCategory;
