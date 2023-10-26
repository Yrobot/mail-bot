"use client";
import { useState } from "react";
import type { Message } from "@prisma/client";
import { sendMessage, deleteMessage } from "@/services";
import { confirm } from "@/components/Modal";
import toast from "@/toast";

const parseMessage = ({
  from,
  to,
  subject,
  text,
  html,
  cc,
  bcc,
  email,
}: Message) => ({
  from,
  to,
  subject,
  text,
  html,
  cc,
  bcc,
  email,
});

export default function MessageActions({ message }: { message: Message }) {
  const [loading, setLoading] = useState<boolean>(false);
  const sendData = parseMessage(message);
  return (
    <>
      <button
        className="btn btn-link h-auto min-h-0 px-0 py-1"
        disabled={loading}
        onClick={() => {
          if (loading) return;
          setLoading(true);
          sendMessage(sendData as any)
            .then(() => {
              toast.success("发送成功");
              close();
            })
            .catch((error) => {
              toast.error(`发送失败: ${error}`);
            })
            .finally(() => {
              setLoading(false);
            });
        }}
      >
        {loading ? "发送中..." : "再次发送"}
      </button>
      <button
        className="btn btn-link h-auto min-h-0 px-0 py-1"
        onClick={() => {
          confirm({
            content: "删除后无法恢复，确认删除吗？",
            onConfirm: () => {
              deleteMessage(message.id)
                .then(() => {
                  toast.success("删除成功");
                })
                .catch((error) => {
                  toast.error(`删除失败: ${error}`);
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
