import { getEmailList } from "@/services";
import ListEmpty from "@/components/ListEmpty";
import Table from "@/components/Table";
import PageHead from "@/components/PageHead";
import EmailActions from "@/components/EmailActions";
import CerateEmailButton from "@/components/CerateEmailButton";
import UrlTooltip from "@/components/UrlTooltip";
import Tooltip from "@/components/Tooltip";
import StatusBadge from "@/components/StatusBadge";
import { route } from "@/routes";

type Status = "ACTIVE" | "CLOSED" | "DELETED";

const statusMap = {
  ACTIVE: <div className="badge badge-accent">打开</div>,
  CLOSED: <div className="badge badge-ghost">关闭</div>,
  DELETED: <div className="badge badge-secondary">删除</div>,
};

export default async function Home() {
  const emails = await getEmailList();
  const isEmpty = emails.length === 0;
  return (
    <main className="h-full p-4">
      <PageHead title={route.email.name} extend={<CerateEmailButton />} />
      {isEmpty && <ListEmpty />}
      {!isEmpty && (
        <>
          <Table
            data={emails.map((email) => ({ key: email.account, ...email }))}
            columns={[
              {
                title: "邮箱",
                key: "account",
              },
              {
                title: "开关",
                key: "status",
                render: (status) => statusMap[status as Status] ?? "-",
              },
              {
                title: "状态",
                key: "verify",
                render: (verify, { status }) => (
                  <Tooltip
                    tip={(() => {
                      if (status === "CLOSED")
                        return "邮箱关闭，不接收到任何邮件";
                      return verify
                        ? "邮箱开启，可以接收邮件"
                        : "邮箱开启，但无法验证SMTP服务";
                    })()}
                  >
                    <StatusBadge
                      color={(() => {
                        if (status === "CLOSED") return "gray";
                        return verify ? "green" : "red";
                      })()}
                    />
                  </Tooltip>
                ),
              },
              {
                title: "http直接请求",
                key: "export",
                render: (support, { account }) =>
                  support ? (
                    <UrlTooltip path={`/email/${account}`}>
                      <div className="badge badge-accent">支持</div>
                    </UrlTooltip>
                  ) : (
                    <div className="badge badge-ghost">不支持</div>
                  ),
              },
              {
                title: "pipe转换逻辑",
                key: "pipeStr",
                render: (pipeStr) =>
                  pipeStr ? (
                    <Tooltip tip={pipeStr} className="whitespace-pre">
                      自定义逻辑
                    </Tooltip>
                  ) : (
                    <div className="">无转换</div>
                  ),
              },
              // {
              //   title: "创建时间",
              //   key: "createdAt",
              // },
              {
                title: "更新时间",
                key: "updatedAt",
              },
              {
                title: "操作",
                key: "action",
                render: (_, email) => (
                  <div className="space-x-4">
                    <EmailActions email={email} />
                  </div>
                ),
              },
            ]}
          />
        </>
      )}
    </main>
  );
}
