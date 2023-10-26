"use server";
import type { Channel, Message } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { Status, MessageStatus } from "@/constant";
import {
  sendEmailFromChannel,
  sendEmailFromInterface,
  verify,
  channelToTransport,
} from "@/utils/email";
import prisma from "@/db";

export const getEmailList = async () =>
  // where: Parameters<typeof prisma.channel.findMany>[0] ,
  prisma.channel.findMany({
    where: {
      status: {
        in: [Status.ACTIVE, Status.CLOSED],
      },
    },
  });

export const deleteEmail = async (email: string) =>
  prisma.channel
    .delete({
      where: { account: email },
    })
    .then((res) => {
      revalidatePath("/");
      return res;
    });

export const activeEmail = async (email: string) =>
  prisma.channel
    .update({
      where: { account: email },
      data: { status: Status.ACTIVE },
    })
    .then((res) => {
      revalidatePath("/");
      return res;
    });

export const closeEmail = async (email: string) =>
  prisma.channel
    .update({
      where: { account: email },
      data: { status: Status.CLOSED },
    })
    .then((res) => {
      revalidatePath("/");
      return res;
    });

export type EmailParam = Omit<
  Channel,
  "id" | "createdAt" | "updatedAt" | "status" | "verify"
>;

const parseEmailParam = ({
  account,
  token,
  port,
  host,
  export: export_,
  pipeStr,
}: EmailParam) => ({
  account,
  token,
  port,
  host,
  export: export_,
  pipeStr,
});

export const upsertEmail = async (email: EmailParam) => {
  const data: Parameters<typeof prisma.channel.upsert>[0]["create"] =
    parseEmailParam(email);
  data.verify = await verify(channelToTransport(email));
  return prisma.channel
    .upsert({
      where: { account: email.account },
      create: data,
      update: data,
    })
    .then((res) => {
      revalidatePath("/");
      return res;
    });
};

type NonNullableRecord<T> = {
  [P in keyof T]-?: NonNullable<T[P]>;
};

type GetNullKeys<T> = {
  [K in keyof T]: null extends T[K] ? K : never;
}[keyof T];

type MessageNullKeys = GetNullKeys<Message>;

type Null2Option<T> = Partial<T> & Required<Omit<T, MessageNullKeys>>;

type MessageInput = Null2Option<
  Pick<
    NonNullableRecord<Message>,
    "from" | "to" | "bcc" | "cc" | "subject" | "text" | "html"
  >
>;

type MessageWithChannel = MessageInput & {
  email: Exclude<Message["email"], null>;
};

type MessageWithInterface = MessageInput & {
  interfaceId: Exclude<Message["interfaceId"], null>;
};

export const sendMessage = async (
  message: MessageWithChannel | MessageWithInterface,
) => {
  return (async () => {
    if ("email" in message) {
      const { email, ...res } = message;
      return sendEmailFromChannel({
        email,
        message: res,
      });
    }
    if ("interfaceId" in message) {
      const { interfaceId, ...res } = message;
      return sendEmailFromInterface({
        interfaceId,
        message: res,
      });
    }
    throw new Error("Invalid message: required email or interfaceId");
  })()
    .then(async (res) => {
      await prisma.message.create({
        data: {
          ...message,
          status: MessageStatus.SUCCESS,
        },
      });
      return res;
    })
    .catch(async (err) => {
      await prisma.message.create({
        data: {
          ...message,
          status: MessageStatus.FAILED,
          failed: err.message,
        },
      });
      throw err;
    })
    .finally(() => {
      revalidatePath("/messages");
    });
};

export const getMessageList = async () =>
  prisma.message.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

export const deleteMessage = async (id: number) =>
  prisma.message
    .delete({
      where: { id },
    })
    .then((res) => {
      revalidatePath("/messages");
      return res;
    });
