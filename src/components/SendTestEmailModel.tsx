"use client";
import * as Yup from "yup";
import { useLocalStorageState } from "ahooks";
import { sendMessage } from "@/services";
import { open } from "@/components/Modal";
import Input from "@/components/Input";
import toast from "@/toast";

const Filed = ({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) => (
  <div className="form-control w-full">
    {title && (
      <label className="label">
        <span className="label-text">{title}</span>
      </label>
    )}
    <div className="w-full">{children}</div>
  </div>
);

const defaultContent = {
  subject: "Mail-Bot测试邮件",
  text: "这是一封Mail-Bot测试邮件",
};

function SendTestEmailModel({
  close,
  email,
}: {
  close: () => void;
  email: string;
}) {
  const [to = "", setTo] = useLocalStorageState<string>("USER_TEST_TO_EMAIL");
  const content = {
    to,
    from: email,
    ...defaultContent,
  };
  const submittable = Yup.string().required().email().isValidSync(to);
  return (
    <div>
      <h3 className="mb-2 text-lg font-bold">发送测试邮件到</h3>
      <div className="space-y-2">
        <Input
          value={to}
          onChange={(e) => {
            setTo(e.target.value);
          }}
          title="发送邮箱地址"
          error={!submittable ? "请输入邮箱地址" : undefined}
        />
        <Filed title="发送内容">
          <div className="space-y-2 text-sm text-primary opacity-60">
            {Object.entries(content).map(([title, value]) => (
              <p className="" key={title}>
                <span className="mr-2 inline-block w-16 uppercase">
                  {title}:
                </span>
                <span>{value}</span>
              </p>
            ))}
          </div>
        </Filed>
      </div>
      <div className="modal-action mt-8">
        <button className="btn" type="button" onClick={close}>
          关闭
        </button>
        <button
          className="btn btn-neutral"
          type="submit"
          disabled={!submittable}
          onClick={() => {
            sendMessage({
              email,
              ...content,
            })
              .then(() => {
                toast.success("发送成功");
                close();
              })
              .catch((error) => {
                toast.error(`发送失败: ${error}`);
              });
          }}
        >
          发送
        </button>
      </div>
    </div>
  );
}

export default function openTestEmailModal({ email }: { email: string }) {
  open({
    content: ({ close }) => <SendTestEmailModel close={close} email={email} />,
    buttons: null,
  });
}
