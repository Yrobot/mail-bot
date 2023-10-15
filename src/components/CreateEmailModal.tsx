"use client";
import { Formik } from "formik";
import * as Yup from "yup";
import { createEmail } from "@/services";
import { wrapper } from "@/utils/request";
import { open } from "@/components/Modal";
import Input from "@/components/Input";
import toast from "@/toast";

interface EmailFormValues {
  account: string;
  host: string;
  port: number;
  token: string;
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

const createFetch = wrapper(createEmail);

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

function CreateEmailModal({ close }: { close: () => void }) {
  return (
    <div>
      <h3 className="mb-2 text-lg font-bold">新建邮箱</h3>
      <Formik
        initialValues={
          { account: "", host: "", port: 465, token: "" } as EmailFormValues
        }
        validationSchema={EmailFormValidateSchema}
        onSubmit={(values, { setSubmitting }) => {
          createFetch(values)
            .then(() => {
              toast.success("提交成功");
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
                {config.map((item) => (
                  <Input
                    key={item.name}
                    {...item}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values[item.name as keyof typeof values]}
                    error={getErrorTip(item.name as keyof typeof values)}
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

export default function openCreateEmailModal() {
  open({
    content: ({ close }) => <CreateEmailModal close={close} />,
    buttons: null,
  });
}
