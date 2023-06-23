import { BaseButton } from "@/components/Button";
import {
  RHFInputText,
} from "@/components/hook-form";
import { PATH_DASHBOARD } from "@/routes";
import { type CategoryNewSchema, categoryNewSchema } from "@/schema/category.schema";
import { addNewCategoryFn } from "@/service/category";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";

const FormNewCategory = () => {
  const { push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const method = useForm<CategoryNewSchema>({
    resolver: zodResolver(categoryNewSchema),
    mode: "onChange",
  });

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = method;


  const { mutateAsync: addNewCategory } = useMutation({
    mutationFn: async (data: CategoryNewSchema) => await addNewCategoryFn(data),
    onSuccess: async () => {
      reset();
      enqueueSnackbar("Create success!", {
        variant: "success",
      });
      await push(PATH_DASHBOARD.category.list);
    },
    onError: () => {
      enqueueSnackbar("Create failed!", {
        variant: "error",
      });
    },
  });

  const onSubmit = async (data: CategoryNewSchema) => {
    try {
      await addNewCategory(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form id="editnewuser" onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-5 grid w-full grid-cols-1 gap-3 rounded-xl border-[1px] border-gray-300 border-opacity-50 p-5 shadow-md md:grid-cols-2">
        <div className="col-span-2">
          <RHFInputText
            title="Name"
            placeholder="Name"
            {...register("name")}
            error={errors.name?.message}
          />
        </div>
        <div className="col-span-2 flex flex-row justify-end">
          <BaseButton
            disabled={isSubmitting}
            isLoading={isSubmitting}
            variant="primary"
            type="submit"
          >
            Save
          </BaseButton>
        </div>
      </div>
    </form>
  );
};

export default FormNewCategory;
