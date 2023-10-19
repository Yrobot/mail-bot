import { createTransport, SendMailOptions } from "nodemailer";
import prisma from "@/db";
import type { Channel } from "@prisma/client";
import { pipe } from "@/utils/pipe";

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

const channelToTransport = (channel: Channel): Transport => {
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
  const { email, pipeStr } =
    (await prisma.interface.findUnique({
      where: { id: interfaceId },
    })) || {};

  if (!email) throw new Error("Interface not found");
  return sendEmailFromChannel({
    email,
    message: pipeStr ? pipe(pipeStr)({})(message) : message,
  });
};

export const sendEmailFromChannel = async ({
  email,
  message,
}: {
  email: string;
  message: SendMailOptions;
}) => {
  const channel = await prisma.channel.findUnique({
    where: { account: email },
  });
  if (!channel) throw new Error("Channel not found");
  const transport = await channelToTransport(channel);
  const { pipeStr } = channel;
  return sendEmail({
    transport,
    message: pipeStr ? pipe(pipeStr)({})(message) : message,
  });
};
