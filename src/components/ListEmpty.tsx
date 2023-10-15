"use client";
import Icon from "@/components/Icon";
import { createEmail } from "@/services";
import { wrapper } from "@/utils/request";
import { open } from "@/components/Modal";

function ListEmpty() {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <Icon className="h-12 w-12" icon="email-down" />
      <h3 className="mt-2">没有邮箱</h3>
      <p className="tips mt-1">新建一个邮箱来开始旅程吧</p>
      <button
        className="btn btn-neutral mt-6"
        onClick={() => {
          open({
            content: "123",
          });
          open({
            content: "1234",
          });
          // wrapper(createEmail)({
          //   account: "yrbot@yrobot.top4",
          //   host: "123456",
          //   port: 123,
          //   token: "123456",
          // }).catch(console.error);
        }}
      >
        新建邮箱
      </button>
    </div>
  );
}

export default ListEmpty;
