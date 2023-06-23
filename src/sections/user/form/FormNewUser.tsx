import { BaseButton } from "@/components/Button";
import Spinner from "@/components/Spinner";
import {
  RHFInputPassword,
  RHFInputText,
  RHFSelect,
  RHFTextarea,
} from "@/components/hook-form";
import useUploadImage from "@/hooks/useUploadImage";
import { PATH_DASHBOARD } from "@/routes";
import { userNewSchema, type UserNewSchema } from "@/schema/user.shcema";
import { getRoleListFn } from "@/service/role";
import { addNewUserFn } from "@/service/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { type ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdAdd } from "react-icons/io";

const FormNewUser = () => {
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

  const method = useForm<UserNewSchema>({
    resolver: zodResolver(userNewSchema),
    mode: "onChange",
  });

  const {
    reset,
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = method;

  const { data: dataRoles } = useQuery(["allRoles"], {
    queryFn: async () => await getRoleListFn(),
  });

  const { mutateAsync: addNewUser } = useMutation({
    mutationFn: async (data: UserNewSchema) => await addNewUserFn(data),
    onSuccess: async () => {
      reset();
      enqueueSnackbar("Create success!", {
        variant: "success",
      });
      await push(PATH_DASHBOARD.user.list);
    },
    onError: () => {
      enqueueSnackbar("Create failed!", {
        variant: "error",
      });
    },
  });

  const onSubmit = async (data: UserNewSchema) => {
    try {
      await addNewUser(data);
    } catch (error) {
      console.error(error);
    }
  };

   useEffect(() => {
     if (data) {
       data && setFile(data.url);
       setValue("avatar", data.url);
     }
     // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [data]);

  return (
    <form
      className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3"
      id="editnewuser"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="col-span-1 flex w-full flex-col items-center rounded-xl border-[1px] border-gray-300 border-opacity-50 p-5 px-[10] shadow-md">
        <RHFInputText
          type="file"
          accept="image/*"
          id="input-file-upload"
          className="hidden w-full"
          title="Avatar"
          error={errors.avatar?.message}
          {...register("avatar")}
          disabled={isLoading}
          onChange={handleChangeFile}
        />
        {!file && (
          <label
            id="label-file-upload"
            className="w-full max-w-[230px]"
            htmlFor="input-file-upload"
          >
            <div className="mt-1 flex h-[230px] w-full cursor-pointer flex-col items-center justify-center rounded-lg border-[2px]  transition-all ">
              {isLoading ? <Spinner /> : <IoMdAdd size={"50"} />}
            </div>
          </label>
        )}
        {file && (
          <label
            id="label-file-upload"
            className="w-full max-w-[230px]"
            htmlFor="input-file-upload"
          >
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
      <div className="col-span-2 grid w-full grid-cols-1 gap-3 rounded-xl border-[1px] border-gray-300 border-opacity-50 p-5 shadow-md md:grid-cols-2">
        <div className="col-span-2 md:col-span-1">
          <RHFInputText
            title="Name"
            placeholder="Name"
            {...register("name")}
            error={errors.name?.message}
          />
        </div>

        <div className="col-span-2 md:col-span-1">
          <RHFInputPassword
            className="w-full"
            title="Password"
            placeholder="Passsword"
            error={errors.password?.message}
            {...register("password")}
          />
        </div>
        <div className="col-span-2 md:col-span-1">
          <RHFInputText
            title="Email"
            placeholder="Email"
            error={errors.email?.message}
            {...register("email")}
          />
        </div>
        <div className="col-span-2 md:col-span-1">
          <RHFSelect
            className="w-full"
            title="Role"
            placeholder="Select role"
            error={errors.roleId?.message}
            {...register("roleId")}
          >
            <option value={""}>Select -- </option>
            {dataRoles?.data.map((item, idx) => {
              return (
                <option key={idx} value={item._id}>
                  {item.name}
                </option>
              );
            })}
          </RHFSelect>
        </div>
        <div className="col-span-2">
          <RHFTextarea
            className="min-h-[100px]"
            title="Bio"
            error={errors.bio?.message}
            placeholder="Biodata"
            {...register("bio")}
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

export default FormNewUser;
