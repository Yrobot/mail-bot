import { getEmailList, getMessageList } from "@/services";
import ListEmpty from "@/components/ListEmpty";
import Table from "@/components/Table";
import { MessageStatus } from "@/constant";
import Tooltip from "@/components/Tooltip";
import PageHead from "@/components/PageHead";
import ObjectView from "@/components/ObjectView";
import { route } from "@/routes";
import CerateEmailButton from "@/components/CerateEmailButton";
import CerateMessageButton from "@/components/CerateMessageButton";
import MessageActions from "@/components/MessageActions";

const ToHomeButton = () => (
  <a className="btn btn-neutral" href="/">
    去首页新建邮箱
  </a>
);

const statusMap = {
  [MessageStatus.SUCCESS]: <div className="badge badge-success">成功</div>,
  [MessageStatus.FAILED]: <div className="badge badge-error">失败</div>,
};

async function MessagesPage() {
  const hasEmail = (await getEmailList())?.length > 0;
  const list = await getMessageList();
  const isEmpty = list.length === 0;
  return (
    <main className="h-full p-4">
      <PageHead
        title={route.message.name}
        extend={hasEmail ? <CerateMessageButton /> : <CerateEmailButton />}
      />
      {isEmpty && (
        <ListEmpty
          title={hasEmail ? "没有消息" : "没有消息也没有邮箱"}
          tips={hasEmail ? "新建一条消息吧" : "先新建一个邮箱来开始旅程吧"}
        >
          {hasEmail ? <CerateMessageButton /> : <ToHomeButton />}
        </ListEmpty>
      )}
      {!isEmpty && (
        <Table
          data={list.map((msg: Awaited<ReturnType<typeof getMessageList>>[0]) => ({ key: msg.id, ...msg }))}
          columns={[
            {
              title: "发送时间",
              key: "createdAt",
            },
            {
              title: "发送标题",
              key: "subject",
              render: (_, { subject, from, to, text, html, cc, bcc }) => (
                <Tooltip
                  tip={
                    <ObjectView
                      data={{
                        from,
                        to,
                        cc,
                        bcc,
                        subject,
                        text,
                        html,
                      }}
                    />
                  }
                >
                  <div className="">{subject}</div>
                </Tooltip>
              ),
            },
            {
              title: "状态",
              key: "status",
              render: (status: MessageStatus, { failed }) => (
                <Tooltip
                  tip={(() => {
                    if (status === MessageStatus.SUCCESS) return "发送成功";
                    if (status === MessageStatus.FAILED)
                      return failed || "发送失败";
                  })()}
                >
                  {statusMap[status] ?? "-"}
                </Tooltip>
              ),
            },
            {
              title: "发送邮箱",
              key: "email",
            },
            {
              title: "接收邮箱",
              key: "to",
            },
            {
              title: "操作",
              key: "action",
              render: (_, message) => (
                <div className="space-x-4">
                  <MessageActions message={message} />
                </div>
              ),
            },
          ]}
        />
      )}
    </main>
  );
}

export default MessagesPage;
