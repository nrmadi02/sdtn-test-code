import { env } from "@/env.mjs";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useSnackbar } from "notistack";

interface uploadImage {
  url: string;
  secure_url: string;
}

const uploadImageFn = async (formData: FormData) => {
  const res = await axios.post<uploadImage>(
    "https://api.cloudinary.com/v1_1/pribadi-nrmadi02/image/upload",
    formData,
    {
      headers: {
        "content-type": "multipart/form-data",
      },
    }
  );

  return res.data;
};

const useUploadImage = () => {
  const { enqueueSnackbar } = useSnackbar();

  const {
    mutateAsync: uploadNewImage,
    isLoading,
    isSuccess,
    data,
  } = useMutation({
    mutationFn: async (data: FormData) => await uploadImageFn(data),
    onSuccess: () => {
      enqueueSnackbar("Upload success!", {
        variant: "success",
      });
    },
    onError: () => {
      enqueueSnackbar("Create failed!", {
        variant: "error",
      });
    },
  });

  const onHandleChange = async (file: File) => {
    try {
      const formData = new FormData();

      formData.append("file", file);
      formData.append("public_id", file.name);
      formData.append("upload_preset", env.NEXT_PUBLIC_UPLOAD_PRESET);
      formData.append("api_key", env.NEXT_PUBLIC_API_KEY);

      await uploadNewImage(formData);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    onHandleChange,
    data,
    isLoading,
    isSuccess,
  };
};

export default useUploadImage;
