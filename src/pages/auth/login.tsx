import Page from "@/components/Page";
import GuestGuard from "@/guards/GuestGuard";
import { LoginForm } from "@/sections/auth";

const Login = () => {
  return (
    <GuestGuard>
      <Page title="Login Page">
        <div className="md:bg-w-green-100 flex h-screen min-h-screen flex-col items-center justify-center py-14 md:h-auto">
          <div className="w-full p-5 md:max-w-md">
            <h1 className="mb-3 text-[28px] font-bold text-emerald-600">
              Login Webadmin
            </h1>
            <LoginForm />
          </div>
        </div>
      </Page>
    </GuestGuard>
  );
};

export default Login;
