"use client";
import type { Channel } from "@prisma/client";
import cn from "classnames";
import { Formik } from "formik";
import * as Yup from "yup";
import { upsertEmail, EmailParam } from "@/services";
import { wrapper } from "@/utils/request";
import { open } from "@/components/Modal";
import Input from "@/components/Input";
import PipeCodeEditor from "@/components/PipeCodeEditor";
import Tooltip from "@/components/Tooltip";
import Toggle from "@/components/Toggle";
import toast from "@/toast";

type EmailFormValues = EmailParam;

const EmailFormValidateSchema = Yup.object().shape({
  account: Yup.string().email("Email不符合规范").required("此为必填项"),
  host: Yup.string()
    // .matches(/^http/g, "地址去除协议")
    .required("此为必填项"),
  token: Yup.string().required("此为必填项"),
  port: Yup.number()
    .integer("端口必须为正整数")
    .positive("端口必须为正整数")
    .required("此为必填项"),
});

type FiledProps<T = string> = {
  title: string;
  name: keyof EmailFormValues;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  value: T;
  onValueChange: <T>(value: T) => void;
  error?: string;
  className?: string;
};

const PipeFiled = ({
  title,
  value,
  onValueChange,
  onBlur,
  className,
  error,
  ...res
}: FiledProps) => (
  <div className={cn("form-control w-full", className)}>
    {title && (
      <label className="label">
        <span className="label-text">{title}</span>
      </label>
    )}
    {!value && <div className="text-sm opacity-60">无转换逻辑</div>}
    {value && (
      <Tooltip tip={value} className="whitespace-pre">
        <code
          className="overflow-ellipsis whitespace-pre text-xs opacity-60"
          style={{
            ["--line-clamp" as any]: 4,
          }}
        >
          {value}
        </code>
      </Tooltip>
    )}
    <a
      className="link-neutral link text-sm"
      onClick={() => {
        open({
          content: ({ close }) => (
            <div className="">
              <h3 className="mb-2 text-lg font-bold">
                {value ? "编辑Pipe" : "新建Pipe"}
              </h3>
              <PipeCodeEditor
                onCancel={close}
                value={value}
                onConfirm={(v) => {
                  onValueChange(v);
                  close();
                }}
              />
            </div>
          ),
          className: "pipe-code-edit-modal",
          buttons: null,
        });
      }}
    >
      {value ? "编辑pipe" : "添加pipe"}
    </a>
    {error && (
      <label className="label">
        <span
          className={cn("label-text-alt", {
            "text-error": error,
          })}
        >
          {error}
        </span>
      </label>
    )}
  </div>
);

const config: {
  title: string;
  name: keyof EmailFormValues;
  type?: string;
  placeholder?: string;
  as?: any;
}[] = [
  {
    title: "邮箱地址",
    name: "account",
    type: "email",
    placeholder: "xxx@xxx.com",
  },
  {
    title: "主机地址",
    name: "host",
    type: "text",
    placeholder: "smtp.xxx.com",
  },
  {
    title: "端口",
    name: "port",
    type: "number",
    placeholder: "465",
  },
  {
    title: "密钥",
    name: "token",
    type: "password",
    placeholder: "密码/Token",
  },
  {
    title: "支持直接请求",
    name: "export",
    as: Toggle,
  },
  {
    title: "pipe转换逻辑",
    name: "pipeStr",
    as: PipeFiled,
  },
];

function EmailModal({ close, data }: { close: () => void; data?: Channel }) {
  const isEdit = !!data;
  const initData = isEdit
    ? data
    : {
        account: "",
        host: "",
        port: 465,
        token: "",
        export: true,
        pipeStr: "",
      };

  return (
    <div>
      <h3 className="mb-2 text-lg font-bold">
        {isEdit ? "编辑邮箱" : "新建邮箱"}
      </h3>
      <Formik
        initialValues={initData as EmailFormValues}
        validationSchema={EmailFormValidateSchema}
        onSubmit={(values, { setSubmitting }) => {
          wrapper(upsertEmail)(values)
            .then(() => {
              toast.success("提交成功");
              close();
            })
            .catch(() => {})
            .finally(() => {
              setSubmitting(false);
            });
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => {
          const getErrorTip = (key: keyof typeof errors) =>
            (errors[key] && touched[key] && errors[key]) || "";
          return (
            <form onSubmit={handleSubmit}>
              <div className="space-y-2">
                {config.map(({ as: As = Input, name, ...rest }) => (
                  <As
                    key={name}
                    name={name}
                    {...rest}
                    onChange={handleChange}
                    onValueChange={<T,>(value: T) => {
                      handleChange({
                        target: {
                          name,
                          value,
                        },
                      });
                    }}
                    onBlur={handleBlur}
                    value={values[name as keyof typeof values] as any}
                    error={getErrorTip(name as keyof typeof values)}
                  />
                ))}
              </div>

              <div className="modal-action mt-8">
                <button className="btn" type="button" onClick={close}>
                  关闭
                </button>
                <button
                  className="btn btn-neutral"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "提交中..." : "提交"}
                </button>
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
}

export default function openEmailModal({ data }: { data?: Channel } = {}) {
  open({
    content: ({ close }) => <EmailModal close={close} data={data} />,
    buttons: null,
  });
}
