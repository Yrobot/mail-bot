"use client";
import cn from "classnames";
import openEmailModal from "@/components/EmailModal";

export default function CerateEmailButton({
  className,
}: {
  className?: string;
}) {
  return (
    <button
      className={cn("btn btn-neutral", className)}
      onClick={() => openEmailModal()}
    >
      新建邮箱
    </button>
  );
}
