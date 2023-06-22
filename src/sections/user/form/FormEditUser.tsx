import { BaseButton } from "@/components/Button";
import Spinner from "@/components/Spinner";
import { RHFInputText, RHFSelect, RHFTextarea } from "@/components/hook-form";
import useUploadImage from "@/hooks/useUploadImage";
import { PATH_DASHBOARD } from "@/routes";
import { userEditSchema, UserEditSchema } from "@/schema/user.shcema";
import { getRoleListFn } from "@/service/role";
import { editUserFn } from "@/service/user";
import { IUser } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdAdd } from "react-icons/io";

interface Props {
  currentUser?: IUser;
}

const FormEditUser = ({ currentUser }: Props) => {
  const { push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  

  const [file, setFile] = useState("");
  const {
    onHandleChange: onHandleUploadImage,
    data,
    isLoading,
    isSuccess,
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

  const defaultValues = useMemo<UserEditSchema>(() => {
    if(!data) {
      setFile(String(currentUser?.avatar));
    } else {
      setFile(data.url);
    }
    return {
      roleId: currentUser?.role._id || "",
      avatar: currentUser?.avatar || "",
      bio: currentUser?.bio || "",
      email: currentUser?.email || "",
      id: currentUser?._id || "",
      name: currentUser?.name || "",
    };
  }, [currentUser, data]);

  const method = useForm<UserEditSchema>({
    resolver: zodResolver(userEditSchema),
    defaultValues: defaultValues,
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
    queryFn: async (ctx) => await getRoleListFn(),
  });

  const { mutateAsync: editUser } = useMutation({
    mutationFn: async (data: UserEditSchema) => await editUserFn(data),
    onSuccess: async () => {
      reset();
      enqueueSnackbar("Update success!", {
        variant: "success",
      });
      await push(PATH_DASHBOARD.user.list);
    },
    onError: () => {
      enqueueSnackbar("Update failed!", {
        variant: "error",
      });
    },
  });

  const onSubmit = async (data: UserEditSchema) => {
    try {
      await editUser(data);
    } catch (error) {
      console.error(error);
    }
  };

   useEffect(() => {
     if (data) {
       data && setFile(data.url);
       setValue("avatar", data.url);
     }
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
            <div className="mt-1 flex h-[230px] w-full cursor-pointer flex-col items-center justify-center  rounded-lg border-[2px]  transition-all ">
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
          <RHFInputText
            title="Email"
            placeholder="Email"
            error={errors.email?.message}
            {...register("email")}
          />
        </div>
        <div className="col-span-2">
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

export default FormEditUser;
