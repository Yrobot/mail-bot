import { getEmailList } from "@/services";
import ListEmpty from "@/components/ListEmpty";
import PageHead from "@/components/PageHead";
import { route } from "@/routes";
import CerateEmailButton from "@/components/CerateEmailButton";
import CerateMessageButton from "@/components/CerateMessageButton";

const ToHomeButton = () => (
  <a className="btn btn-neutral" href="/">
    去首页新建邮箱
  </a>
);

async function MessagesPage() {
  const hasEmail = (await getEmailList())?.length > 0;
  return (
    <main className="h-full p-4">
      <PageHead
        title={route.message.name}
        extend={hasEmail ? <CerateMessageButton /> : <CerateEmailButton />}
      />
      <ListEmpty
        title={hasEmail ? "没有消息" : "没有消息也没有邮箱"}
        tips={hasEmail ? "新建一条消息吧" : "先新建一个邮箱来开始旅程吧"}
      >
        {hasEmail ? <CerateMessageButton /> : <ToHomeButton />}
      </ListEmpty>
    </main>
  );
}

export default MessagesPage;
