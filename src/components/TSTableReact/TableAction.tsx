import { ReactNode, useState } from "react";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useDismiss,
  useRole,
  useClick,
  useInteractions,
  FloatingFocusManager,
  useId,
} from "@floating-ui/react";

import { MdMoreVert } from "react-icons/md";

interface Props {
  children: ReactNode;
}

const TableActionPopover = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      offset(10),
      flip({ fallbackAxisSideDirection: "end" }),
      shift(),
    ],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  const headingId = useId();

  return (
    <>
      <button
        className="p-3 transition-all hover:bg-slate-200 rounded-full active:bg-slate-400 hover:bg-opacity-40"
        ref={refs.setReference}
        {...getReferenceProps()}
      >
        <MdMoreVert className="text-[20px] text-gray-500" />
      </button>
      {isOpen && (
        <FloatingFocusManager context={context} modal={false}>
          <div
            className="w-[150px] rounded-md bg-emerald-700 bg-opacity-80 px-1 py-1 text-white"
            ref={refs.setFloating}
            style={floatingStyles}
            aria-labelledby={headingId}
            {...getFloatingProps()}
          >
            {children}
          </div>
        </FloatingFocusManager>
      )}
    </>
  );
};

export default TableActionPopover;
