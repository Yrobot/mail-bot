"use client";
import cn from "classnames";
import openCreateEmailModal from "@/components/CreateEmailModal";

export default function CerateEmailButton({
  className,
}: {
  className?: string;
}) {
  return (
    <button
      className={cn("btn btn-neutral", className)}
      onClick={openCreateEmailModal}
    >
      新建邮箱
    </button>
  );
}
