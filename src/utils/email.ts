import { createTransport, SendMailOptions } from "nodemailer";
import prisma from "@/db";

export type Transport = {
  host: string;
  port: number;
  secure?: boolean;
  auth: {
    user: string;
    pass?: string;
  };
};

/**
 * Send email with nodemailer
 * @param transport
 * @param message
 * @returns
 * @see https://nodemailer.com/smtp/
 * @see https://nodemailer.com/message/
 * 
 * TODO: 
 * 1. message parser
 *   - 变量替换
 *   - 字段覆盖/默认
 *   - 模版
 *   - 变量提取
 **/
export const sendEmail = async ({
  transport,
  message,
}: {
  transport: Transport;
  message: SendMailOptions;
}) => {
  return createTransport(transport).sendMail(message);
};

const emailToTransport = async (email: string): Promise<Transport | null> => {
  const channel = await prisma.channel.findUnique({
    where: { account: email },
  });
  if (!channel) return null;
  const { host, port, account, token } = channel;
  return {
    host: host,
    port: port,
    auth: {
      user: account,
      pass: token,
    },
  };
};

export const sendEmailFromInterface = async ({
  interfaceId,
  message,
}: {
  interfaceId: number;
  message: SendMailOptions;
}) => {
  const transport = await prisma.interface
    .findUnique({
      where: { id: interfaceId },
    })
    .then((res) => {
      if (!res) throw new Error("Interface not found");
      return emailToTransport(res.email);
    });
  if (!transport) throw new Error("Transport not found");
  return sendEmail({ transport, message });
};

export const sendEmailFromChannel = async ({
  email,
  message,
}: {
  email: string;
  message: SendMailOptions;
}) => {
  const transport = await emailToTransport(email);
  if (!transport) throw new Error("Transport not found");
  return sendEmail({ transport, message });
};
