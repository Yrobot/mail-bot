"use server";
import type { Channel } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { PrismaClient, Message } from "@prisma/client";
import { Status } from "@/constant";
import { sendEmail, Transport } from "@/utils/email";

const prisma = new PrismaClient();

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

export const createEmail = async (
  email: Omit<
    Parameters<typeof prisma.channel.create>[0]["data"],
    "id" | "status" | "createdAt" | "updatedAt"
  >,
) =>
  prisma.channel
    .create({
      data: { ...email, status: "ACTIVE" },
    })
    .then((res) => {
      revalidatePath("/");
      return res;
    });

export const updateEmail = async ({
  account,
  token,
  port,
  host,
  export: export_,
  status,
}: Partial<Channel>) =>
  prisma.channel
    .update({
      where: { account },
      data: { token, port, host, export: export_, status },
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

export const sendMessage = async (
  message: MessageWithChannel | MessageWithInterface,
) => {
  let transport: Transport | null = null;
  if ("email" in message) {
    transport = await emailToTransport(message.email);
  }
  if ("interfaceId" in message) {
    const { email } =
      (await prisma.interface.findUnique({
        where: { id: message.interfaceId },
      })) ?? {};
    if (!email) throw new Error("Email not found in interface");
    transport = await emailToTransport(email);
  }
  if (transport === null) throw new Error("Transport not found");
  return sendEmail({
    transport,
    message,
  });
};
