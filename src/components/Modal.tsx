"use client";
import { useEffect, useRef, useCallback } from "react";
import { createRoot } from "react-dom/client";
import cn from "classnames";

const MODAL_LAYER_ID = "common-modal-layer";

const DELAY_FOR_ANIMATION = 100;

const ModalWrapper = ({
  children,
  className,
  id,
  handleClose,
  onMounted,
  buttons = ({ close }) => (
    <button className="btn" onClick={close}>
      Close
    </button>
  ),
}: {
  children: React.ReactNode;
  className?: string;
  id: string;
  handleClose: () => void;
  onMounted: () => void;
  buttons?: (params: { close: () => void }) => React.ReactNode;
}) => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTimeout(() => {
      // wait dom ready for animation
      ref.current?.click();
      onMounted?.();
    }, DELAY_FOR_ANIMATION);
  }, []);

  const onClose = useCallback(() => {
    ref.current?.click();
    setTimeout(() => {
      // wait close animation done
      handleClose();
    }, DELAY_FOR_ANIMATION);
  }, [handleClose]);

  return (
    <>
      <input type="checkbox" ref={ref} className="modal-toggle" />
      <div className={cn("modal", className)}>
        <div className="modal-box">
          {children}
          <div className="modal-action">{buttons({ close: onClose })}</div>
        </div>
      </div>
    </>
  );
};

let index = 0;

export const open = ({
  content,
  onClose,
  ...props
}: {
  content: Parameters<typeof ModalWrapper>[0]["children"];
  onClose?: () => void;
} & Omit<
  Parameters<typeof ModalWrapper>[0],
  "children" | "id" | "handleClose" | "onMounted"
>) =>
  new Promise((resolve) => {
    const modalId = `common-modal-${index++}`;
    const layer = document.getElementById(MODAL_LAYER_ID);
    if (!layer)
      throw new Error(
        "common modal layer not found, please add ModalLayer into page first.",
      );

    const modal = document.createElement("div");
    modal.id = modalId;
    layer.appendChild(modal);

    const modalRoot = createRoot(modal);

    const handleClose = () => {
      modalRoot.unmount();
      layer.removeChild(modal);
      onClose?.();
    };

    return modalRoot.render(
      <ModalWrapper
        {...props}
        id={modalId}
        handleClose={handleClose}
        onMounted={resolve as () => void}
      >
        {content}
      </ModalWrapper>,
    );
  });

export function ModalLayer() {
  return <div className="fixed z-50" id={MODAL_LAYER_ID}></div>;
}
