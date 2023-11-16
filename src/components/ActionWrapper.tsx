"use client";
import cn from "classnames";
import { switchEmailStatus, switchEmailExport } from "@/services";
import toast from "@/toast";

export function EmailOpenSwitchWrapper({
  children,
  className,
  email,
}: {
  className?: string;
  children?: React.ReactNode;
  email: string;
}) {
  return (
    <div
      className={cn("cursor-pointer select-none", className)}
      onClick={() => {
        switchEmailStatus(email).then(() => {
          toast.success("操作成功");
        });
      }}
    >
      {children}
    </div>
  );
}

export function EmailExportSwitchWrapper({
  children,
  className,
  email,
}: {
  className?: string;
  children?: React.ReactNode;
  email: string;
}) {
  return (
    <div
      className={cn("cursor-pointer select-none", className)}
      onClick={() => {
        switchEmailExport(email).then(() => {
          toast.success("操作成功");
        });
      }}
    >
      {children}
    </div>
  );
}
