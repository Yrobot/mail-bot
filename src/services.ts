"use server";
import type { Channel, Message } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { Status } from "@/constant";
import { sendEmailFromChannel, sendEmailFromInterface } from "@/utils/email";
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

type EmailParam = Omit<Channel, "id" | "createdAt" | "updatedAt">;

const parseEmailParam = ({
  account,
  token,
  port,
  host,
  export: export_,
  status,
  pipeStr,
}: EmailParam) => ({
  account,
  token,
  port,
  host,
  export: export_,
  status,
  pipeStr,
});

export const createEmail = async (email: EmailParam) =>
  prisma.channel
    .create({
      data: { ...parseEmailParam(email), status: "ACTIVE" },
    })
    .then((res) => {
      revalidatePath("/");
      return res;
    });

export const updateEmail = async (email: Partial<EmailParam>) =>
  prisma.channel
    .update({
      where: { account: email.account },
      data: parseEmailParam(email as any),
    })
    .then((res) => {
      revalidatePath("/");
      return res;
    });

type MessageInput = Partial<
  Pick<Message, "from" | "to" | "bcc" | "cc" | "subject" | "text" | "html">
>;

type MessageWithChannel = MessageInput & {
  email: Message["email"];
};

type MessageWithInterface = MessageInput & {
  interfaceId: Message["interfaceId"];
};

export const sendMessage = async (
  message: MessageWithChannel | MessageWithInterface,
) => {
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
};
