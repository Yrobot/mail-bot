export const route = {
  email: {
    name: "邮箱",
    href: "/",
  },
  api: {
    name: "接口",
    href: "/apis",
    disabled: true,
  },
  message: {
    name: "消息",
    href: "/messages",
  },
  about: {
    name: "关于",
    href: "/about",
  },
};

export default [
  route.email,
  route.message,
  route.about,
  route.api,
] as (typeof route.email & {
  disabled?: boolean;
})[];
