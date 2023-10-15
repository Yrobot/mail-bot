import { getEmailList } from "@/services";
import ListEmpty from "@/components/ListEmpty";
import Table from "@/components/Table";
import PageHead from "@/components/PageHead";
import EmailActions from "@/components/EmailActions";
import CerateEmailButton from "@/components/CerateEmailButton";
import { route } from "@/routes";

type Status = "ACTIVE" | "CLOSED" | "DELETED";

const statusMap = {
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
                title: "支持直接请求",
                key: "export",
                render: (support) => (support ? "是" : "否"),
              },
              {
                title: "创建时间",
                key: "createdAt",
              },
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
