import { RHFInputPassword, RHFInputText } from "@/components/hook-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSnackbar } from "notistack";
import * as z from "zod";
import { LoginInput, loginSchema } from "@/schema/login.schema";
import { BaseButton } from "@/components/Button";
import { useRouter } from "next/router";
import { PATH_AUTH } from "@/routes";
import useAuth from "@/hooks/useAuth";
import axios, { AxiosError } from "axios";

const LoginForm = () => {
  const { push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const { login } = useAuth();

  const {
    reset,
    setError,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: LoginInput) => {
    try {
      await login(data.email, data.password);
      enqueueSnackbar("Success login!", {
        variant: "success",
      });
    } catch (error) {
      interface ErrorAxiosLoginRes {
        error: string;
        message: string[];
        statusCode: number;
      }
      if (axios.isAxiosError<ErrorAxiosLoginRes>(error)) {
        enqueueSnackbar(error.response?.data.message[0], {
          variant: "error",
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex w-full flex-col items-start gap-3">
        <RHFInputText
          type="text"
          title="Email"
          placeholder="Email"
          error={errors.email?.message}
          {...register("email")}
        />
        <RHFInputPassword
          title="Password"
          placeholder="Password"
          error={errors.password?.message}
          className="w-full"
          {...register("password")}
        />
        <div className="flex w-full flex-row justify-end">
          <p
            onClick={() =>
              push(PATH_AUTH.resetPassword).catch((_) =>
                console.log("route failed....")
              )
            }
            className="cursor-pointer rounded-md p-1 text-[12px] transition-all hover:bg-gray-200 "
          >
            Lupa password?
          </p>
        </div>
        <BaseButton
          disabled={isSubmitting}
          isLoading={isSubmitting}
          className="mt-1 w-full"
          variant="primary"
          type="submit"
        >
          Login
        </BaseButton>
      </div>
    </form>
  );
};

export default LoginForm;
