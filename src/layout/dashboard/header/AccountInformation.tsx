import { BaseButton } from "@/components/Button";
import useAuth from "@/hooks/useAuth";
import { PATH_AUTH } from "@/routes";
import { Popover, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { Fragment } from "react";
import { AiOutlineUser } from "react-icons/ai";

const AccountInformation = () => {
  const router = useRouter()
  const { user, logout } = useAuth();
  const {enqueueSnackbar} = useSnackbar()

   const handleLogout = () => {
     try {
       logout();
       router.replace(PATH_AUTH.login).catch(_ => console.log("err router.."));
     } catch (error) {
       console.error(error);
       enqueueSnackbar("Unable to logout!", { variant: "error" });
     }
   };
  return (
    <div className="px-4">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? "" : "text-opacity-90"}
                group inline-flex items-center gap-1 rounded-md px-3 py-2 text-base font-medium hover:bg-gray-200  hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <AiOutlineUser size={35} />
              <div className="w-full text-right leading-[15px] ">
                <p>{user?.name}</p>
                <p className="text-[12px] text-emerald-600">
                  {user?.role.name}
                </p>
              </div>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute left-1/2 z-10 mt-3 -translate-x-1/2 transform sm:px-0 lg:max-w-3xl">
                <div className="rounded-lg border-[1px] border-gray-300 bg-white p-3">
                  <BaseButton
                    onClick={handleLogout}
                    className="min-w-max !border-none"
                    variant="ghost"
                  >
                    Log out
                  </BaseButton>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
};

export default AccountInformation;
