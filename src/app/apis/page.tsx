import ListEmpty from "@/components/ListEmpty";
import PageHead from "@/components/PageHead";
import { route } from "@/routes";
import CerateEmailButton from "@/components/CerateEmailButton";

const ToHomeButton = () => (
  <a className="btn btn-neutral" href="/">
    去首页新建邮箱
  </a>
);

function APIsPage() {
  const hasEmail = false;
  const hasApi = false;
  return (
    <main className="h-full p-4">
      <PageHead title={route.api.name} extend={<CerateEmailButton />} />
      <ListEmpty title="没有API也没有邮箱" tips="先新建一个邮箱来开始旅程吧">
        <ToHomeButton />
      </ListEmpty>
    </main>
  );
}

export default APIsPage;
