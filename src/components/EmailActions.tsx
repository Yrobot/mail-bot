"use client";
import type { Channel } from "@prisma/client";
import { deleteEmail, activeEmail, closeEmail, sendMessage } from "@/services";
import { confirm } from "@/components/Modal";
import openEmailModal from "@/components/EmailModal";
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
          sendMessage({
            email: account,
            subject: "Mail-Bot 测试邮件",
            text: "这是测试邮件",
            from: account,
            to: "yrobot@qq.com",
          })
            .then(() => {
              toast.success("发送成功");
            })
            .catch((error) => {
              toast.error("发送失败: ", error.message);
            });
        }}
      >
        测试
      </button>
      {status === "CLOSED" && (
        <button
          className="btn btn-link h-auto min-h-0 px-0 py-1"
          onClick={() =>
            activeEmail(account).then(() => {
              toast.success("打开成功");
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
