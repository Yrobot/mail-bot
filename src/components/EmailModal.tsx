"use client";
import type { Channel } from "@prisma/client";
import { Formik } from "formik";
import * as Yup from "yup";
import { createEmail, updateEmail } from "@/services";
import { wrapper } from "@/utils/request";
import { open } from "@/components/Modal";
import Input from "@/components/Input";
import Toggle from "@/components/Toggle";
import toast from "@/toast";

interface EmailFormValues {
  account: string;
  host: string;
  port: number;
  token: string;
  export: boolean;
}

const EmailFormValidateSchema = Yup.object().shape({
  account: Yup.string().email("Email不符合规范").required("此为必填项"),
  host: Yup.string().url("地址不符合规范").required("此为必填项"),
  token: Yup.string().required("此为必填项"),
  port: Yup.number()
    .integer("端口必须为正整数")
    .positive("端口必须为正整数")
    .required("此为必填项"),
});

const config = [
  {
    title: "邮箱地址",
    name: "account",
    type: "email",
    placeholder: "xxx@xxx.xxx",
  },
  {
    title: "主机地址",
    name: "host",
    type: "text",
    placeholder: "http(s)://xxx.xxx",
  },
  {
    title: "支持直接请求",
    name: "export",
    as: Toggle,
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
];

function EmailModal({ close, data }: { close: () => void; data?: Channel }) {
  const isEdit = !!data;
  const initData = isEdit
    ? data
    : { account: "", host: "", port: 465, token: "", export: true };

  return (
    <div>
      <h3 className="mb-2 text-lg font-bold">
        {isEdit ? "编辑邮箱" : "新建邮箱"}
      </h3>
      <Formik
        initialValues={initData as EmailFormValues}
        validationSchema={EmailFormValidateSchema}
        onSubmit={(values, { setSubmitting }) => {
          wrapper(isEdit ? updateEmail : createEmail)(values)
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
                {config.map(({ as: As = Input, ...rest }) => (
                  <As
                    key={rest.name}
                    {...rest}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values[rest.name as keyof typeof values] as any}
                    error={getErrorTip(rest.name as keyof typeof values)}
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
