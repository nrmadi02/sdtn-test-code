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

const ArticleCardAction = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: "top",
    middleware: [
      offset(5),
      flip({ fallbackAxisSideDirection: "none" }),
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
        className="rounded-full p-3 transition-all hover:bg-slate-200 hover:bg-opacity-40 active:bg-slate-400"
        ref={refs.setReference}
        {...getReferenceProps()}
      >
        <MdMoreVert className="text-[20px] rotate-90 text-gray-500" />
      </button>
      {isOpen && (
        <FloatingFocusManager context={context} modal={false}>
          <div
            className="w-[150px] rounded-md px-1 py-1 bg-emerald-500 shadow-sm border-[1px]"
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

export default ArticleCardAction;
