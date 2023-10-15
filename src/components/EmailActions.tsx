"use client";
import { deleteEmail, activeEmail, closeEmail } from "@/services";

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
          onClick={() => activeEmail(account)}
        >
          激活
        </button>
      )}
      {status === "ACTIVE" && (
        <button
          className="btn btn-link h-auto min-h-0 px-0 py-1"
          onClick={() => closeEmail(account)}
        >
          关闭
        </button>
      )}
      <button
        className="btn btn-link h-auto min-h-0 px-0 py-1"
        onClick={() => deleteEmail(account)}
      >
        删除
      </button>
    </>
  );
}
