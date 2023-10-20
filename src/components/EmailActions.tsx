"use client";
import type { Channel } from "@prisma/client";
import { deleteEmail, activeEmail, closeEmail } from "@/services";
import { confirm } from "@/components/Modal";
import openEmailModal from "@/components/EmailModal";
import openTestEmailModal from "@/components/SendTestEmailModel";
import toast from "@/toast";

export default function EmailActions({ email }: { email: Channel }) {
  const { account, status } = email;
  return (
    <>
      <button
        className="btn btn-link h-auto min-h-0 px-0 py-1"
        onClick={() => {
          openEmailModal({ data: email });
        }}
      >
        编辑
      </button>
      <button
        className="btn btn-link h-auto min-h-0 px-0 py-1"
        onClick={() => {
          openTestEmailModal({
            email: account,
          });
        }}
      >
        测试
      </button>
      {status === "CLOSED" && (
        <button
          className="btn btn-link h-auto min-h-0 px-0 py-1"
          onClick={() =>
            activeEmail(account)
              .then(() => {
                toast.success("打开成功");
              })
              .catch((error) => {
                toast.error(`打开失败: ${error}`);
              })
          }
        >
          打开
        </button>
      )}
      {status === "ACTIVE" && (
        <button
          className="btn btn-link h-auto min-h-0 px-0 py-1"
          onClick={() =>
            closeEmail(account)
              .then(() => {
                toast.success("关闭成功");
              })
              .catch((error) => {
                toast.error(`操作失败: ${error}`);
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
              deleteEmail(account)
                .then(() => {
                  toast.success("删除成功");
                })
                .catch((error) => {
                  toast.error(`操作失败: ${error}`);
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
