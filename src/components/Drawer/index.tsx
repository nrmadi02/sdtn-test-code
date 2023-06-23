import { type Dispatch, Fragment, type ReactNode, type SetStateAction } from "react";
import { Dialog, Transition } from "@headlessui/react";

type DrawerProps = {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const Drawer = ({
children,
  isOpen,
  setIsOpen,
}: DrawerProps) => {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        unmount={false}
        onClose={() => setIsOpen(false)}
        className="fixed inset-0 z-30 overflow-y-auto"
      >
        <div className="flex h-screen w-3/4">
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-in duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-30"
            entered="opacity-30"
            leave="transition-opacity ease-out duration-300"
            leaveFrom="opacity-30"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 z-40 bg-black" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div
              className={`z-50 flex w-full max-w-sm flex-col overflow-hidden rounded-r-2xl bg-gray-100 py-6
                          text-left align-middle shadow-xl`}
            >
              {children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

export default Drawer