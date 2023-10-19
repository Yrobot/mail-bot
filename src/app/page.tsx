import { getEmailList } from "@/services";
import ListEmpty from "@/components/ListEmpty";
import Table from "@/components/Table";
import PageHead from "@/components/PageHead";
import EmailActions from "@/components/EmailActions";
import CerateEmailButton from "@/components/CerateEmailButton";
import UrlTooltip from "@/components/UrlTooltip";
import Tooltip from "@/components/Tooltip";
import { route } from "@/routes";

type Status = "ACTIVE" | "CLOSED" | "DELETED";

const statusMap = {
  ACTIVE: <div className="badge badge-accent">激活</div>,
  CLOSED: <div className="badge badge-ghost">关闭</div>,
  DELETED: <div className="badge badge-secondary">删除</div>,
};

const exportMap = {
  ACTIVE: <div className="badge badge-accent">激活</div>,
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
                title: "状态",
                key: "status",
                render: (status) => statusMap[status as Status] ?? "-",
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
                    <div className="badge badge-ghost">关闭</div>
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
