"use client";
import { deleteEmail, activeEmail, closeEmail } from "@/services";
import { confirm } from "@/components/Modal";
import toast from "@/toast";

export default function EmailActions({
  status,
  account,
}: {
  status: string;
  account: string;
}) {
  return (
    <>
      <button className="btn btn-link h-auto min-h-0 px-0 py-1">测试</button>
      {status === "CLOSED" && (
        <button
          className="btn btn-link h-auto min-h-0 px-0 py-1"
          onClick={() =>
            activeEmail(account).then(() => {
              toast.success("激活成功");
            })
          }
        >
          激活
        </button>
      )}
      {status === "ACTIVE" && (
        <button
          className="btn btn-link h-auto min-h-0 px-0 py-1"
          onClick={() =>
            closeEmail(account).then(() => {
              toast.success("关闭成功");
            })
          }
        >
          关闭
        </button>
      )}
      <button
        className="btn btn-link h-auto min-h-0 px-0 py-1"
        onClick={() => {
          confirm({
            content: "确认删除邮箱吗？",
            onConfirm: () => {
              deleteEmail(account).then(() => {
                toast.success("删除成功");
              });
            },
          });
        }}
      >
        删除
      </button>
    </>
  );
}
