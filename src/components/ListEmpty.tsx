import Icon from "@/components/Icon";
import CerateEmailButton from "@/components/CerateEmailButton";

function ListEmpty() {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <Icon className="h-12 w-12" icon="email-down" />
      <h3 className="mt-2">没有邮箱</h3>
      <p className="tips mt-1">新建一个邮箱来开始旅程吧</p>
      <CerateEmailButton className="mt-6" />
    </div>
  );
}

export default ListEmpty;
