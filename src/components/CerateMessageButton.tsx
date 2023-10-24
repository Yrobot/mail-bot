"use client";
import cn from "classnames";
import openEmailModal from "@/components/EmailModal";

export default function CerateMessageButton({
  className,
}: {
  className?: string;
}) {
  return (
    <button
      className={cn("btn btn-neutral", className)}
      onClick={() => openEmailModal()}
    >
      新建消息
    </button>
  );
}
